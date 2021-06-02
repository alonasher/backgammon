
import { flatten } from '@angular/compiler';
import { Component, Directive, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { Dice } from 'src/app/Model/Dice';
import { PlayMove } from 'src/app/Model/PlayMove';
import {  Chips } from '../../Model/Chips';
import { House} from '../../Model/House';
import { RoolDiceComponent } from '../rool-dice/rool-dice.component';

const AmountOfHouse=28;
const WhitKillHouse=26
const BlackKillHouse=27
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input() to:any;
  TurnsColor:string=""
  yourColor:string="";
  public isTrue:boolean=false
  AllHouses:House[]=[];
  public halfeTopHouse:House[]=[]
  public halfeBottomHouse:House[]=[]
  dice:Dice[]=[];
  @ViewChild(RoolDiceComponent) child: any
  public startHouse:House={
    Id:0,
    ChipsInHouse:[],
    CouldLandOn:false
  }
  
  constructor(private service: WebSocketService,private router: Router) {
    this.CreateHouses()
   }
   ngOnInit(): void {
    this.service.listen('gameplay').subscribe((data)=>{this.GetInformationOnMoveFromOtherPlayer(data)});
    this.service.listen('changeturn').subscribe((data)=>{this.getTurn(data)});
    this.service.listen('dicethrow').subscribe((data)=>{this.otherPlayerTuchedDice(data)});
    this.service.listen('Getturn').subscribe((data)=>{this.yourTurnIs(data)});
    this.service.listen('youlose').subscribe((data)=>{this.youLost()});
  }

  //create
  CreateHouses(){
    for (let index = 0; index < AmountOfHouse; index++) {
      this.AllHouses[index]={
        Id:index,
        ChipsInHouse:[],
        CouldLandOn:false
      }
    }
    this.GetBottomAllHouse()
    this.GetTopAllHouse()
    this.CreateChips()
  }
  CreateChips(){
    for (let index = 0; index < 2; index++) {
      this.AllHouses[1].ChipsInHouse.push(
        this.CreateSingleChip(index,"White")
        
      )
    }
    for (let index = 0; index < 5; index++) {
      this.AllHouses[6].ChipsInHouse.push(
        this.CreateSingleChip(index,"Black")
      )
    }
    for (let index = 0; index < 3; index++) {
      this.AllHouses[8].ChipsInHouse.push(
        this.CreateSingleChip(index,"Black")
      )
    }
    for (let index = 0; index < 5; index++) {
      this.AllHouses[12].ChipsInHouse.push(
        this.CreateSingleChip(index,"White")
      )
    }
    for (let index = 0; index < 5; index++) {
      this.AllHouses[13].ChipsInHouse.push(
        this.CreateSingleChip(index,"Black")
      )
    }
    for (let index = 0; index < 3; index++) {
      this.AllHouses[17].ChipsInHouse.push(
        this.CreateSingleChip(index,"White")
      )
    }
    for (let index = 0; index < 5; index++) {
      this.AllHouses[19].ChipsInHouse.push(
        this.CreateSingleChip(index,"White")
      )
    }
    for (let index = 0; index < 2; index++) {
      this.AllHouses[24].ChipsInHouse.push(
        this.CreateSingleChip(index,"Black")
      )
    }
    
  }
  GetTopAllHouse(){
    for (let index = 0; index < (this.AllHouses.length)/2-1; index++) {
      this.halfeTopHouse.push(this.AllHouses[index])
    }
  }
  GetBottomAllHouse(){
    // for (let index = (this.AllHouses.length)/2-1; index < this.AllHouses.length-2; index++) {
      for (let index = this.AllHouses.length-3; index > (this.AllHouses.length)/2-2; index--) {
      this.halfeBottomHouse.push(this.AllHouses[index])
    }
  }
  CreateSingleChip(index:number,color:string):Chips{
    let chip:Chips={
      Id:index,
      Color:color
    }
    return chip
  }
  ///////////////
  
  //ui logic
  checkIfElementIsOdd(num:number):boolean{
    return num%2!==0
  }
  getLastChip(StartHouse:House):Chips{
    const lastChipInArrey=StartHouse.ChipsInHouse.length-1
    return StartHouse.ChipsInHouse[lastChipInArrey]
  }
  ///////////////

  CheckIfCouldLand(house:House){
        this.startHouse=house
        if(house.ChipsInHouse.length===0)return
        if(house.ChipsInHouse[0].Color===this.yourColor){
        const chip=house.ChipsInHouse[house.ChipsInHouse.length-1]
        
        if(this.CheckIfNoDeadUser(chip)){
          this.checkIfHouseIsLandable(chip,house,0)
          this.checkIfHouseIsLandable(chip,house,1)
        }
        else{
          
          if(house.Id===WhitKillHouse||house.Id===BlackKillHouse){
            this.MoveFromDeadHouse(house)
          }
        }
      }
  }
  checkIfPlayersColorIsDead(chip:Chips):boolean{
    if(chip.Color==="White"){
      return this.AllHouses[WhitKillHouse].ChipsInHouse.length===0
    }
    else{
      return this.AllHouses[BlackKillHouse].ChipsInHouse.length===0
    }
  }
  //logic moves
  MoveSolder(house:House){
      if(!house.CouldLandOn){
        this.turnAllHomesToBeCantLand();
        if(house.ChipsInHouse[0].Color===this.TurnsColor){
          this.CheckIfCouldLand(house)
        }
      }
      else{
        if(this.startHouse.ChipsInHouse[0].Color===this.TurnsColor){
          this.MoveUser(this.startHouse,house,this.getLastChip(this.startHouse))
          let diceToNotUse=Math.abs(this.startHouse.Id-house.Id)
          if(this.startHouse.Id===WhitKillHouse||this.startHouse.Id===BlackKillHouse)diceToNotUse=this.getDiceMoves(house)
          for (let index = 0; index < this.dice.length; index++) {
            if(this.dice[index].DiceDots==diceToNotUse){
            this.dice[index].HaveBeanUsed=true
            this.dice.splice(index,1)
            break
          }
          if(index===this.dice.length-1){
            for (let index = 0; index < this.dice.length; index++) {
              if(this.dice[index].DiceDots>diceToNotUse){
                this.dice.splice(index,1)
              }
            }
          }
        }this.playerTuchedTheDice()
      }
      this.turnAllHomesToBeCantLand();
    }
  }
  getDiceMoves(endHouse:House):number{
    if(endHouse.ChipsInHouse[0].Color==="White")return endHouse.Id 
    else return 25-endHouse.Id
  }
  MoveFromDeadHouse(DeadHouse:House){
    const chip=DeadHouse.ChipsInHouse[0]
    if(chip.Color==="White"){
      this.checkIfHouseIsLandable(chip,this.AllHouses[0],0)
      this.checkIfHouseIsLandable(chip,this.AllHouses[0],1)
    }
    else{
      this.checkIfHouseIsLandable(chip,this.AllHouses[25],0)
      this.checkIfHouseIsLandable(chip,this.AllHouses[25],1)
    }
  }
  turnAllHomesToBeCantLand(){
    this.AllHouses.forEach(h=>{
      h.CouldLandOn=false
    })
  }
  landWhenUserIsInHouse(numOfHouse:number,chip:Chips,begningHouse:House):number{
    if(begningHouse.Id===0)return NaN
    let count:number=0
    if(chip.Color==="White"){
      for (let index = 25; index > 18; index--) {
        if(this.AllHouses[index].ChipsInHouse[0]===undefined)continue
        if(this.AllHouses[index].ChipsInHouse[0].Color===chip.Color){
          count=count+this.AllHouses[index].ChipsInHouse.length
        }
        if(count===15){
          if(numOfHouse===25)
          {
            return 25
          }
          else{
            for (let index = 18; index < begningHouse.Id; index++) {
              if(this.AllHouses[index].ChipsInHouse.length!==0&&this.AllHouses[index].ChipsInHouse[0].Color===chip.Color)return NaN
            }
            return 25
          }
        }
      }
    }
    else{
      for (let index = 0; index < 7; index++) {
        if(this.AllHouses[index].ChipsInHouse[0]===undefined)continue
        if(this.AllHouses[index].ChipsInHouse[0].Color===chip.Color){
          count=count+this.AllHouses[index].ChipsInHouse.length
        }
        if(count===15){
          if(numOfHouse===0)return 0
          else{
            for (let index = 6; index > begningHouse.Id; index--) {
              if(this.AllHouses[index].ChipsInHouse.length!==0&&this.AllHouses[index].ChipsInHouse[0].Color===chip.Color)return NaN
            }
            return 0
          }
        }
      }
    }
    return NaN
  }
  checkIfHouseIsLandable(chip:Chips,house:House,Dice:number){
    if(this.dice[Dice]===undefined)return
    if(this.dice[Dice].HaveBeanUsed)return
    let houseToLand=this.CalculateAmountOfMoves(chip,house,this.dice[Dice])
    if(houseToLand<1||houseToLand>24)houseToLand=this.landWhenUserIsInHouse(houseToLand,chip,house)
    
    if(houseToLand!==NaN){
      let couldLand=this.CheckIfChipCouldLandOnHouse(chip,houseToLand)
      if(couldLand){
      this.AllHouses[houseToLand].CouldLandOn=true
    }
    } 
  }
  CalculateAmountOfMoves(chip:Chips,house:House,dice:Dice){
    if(chip.Color==="White"){
      return house.Id+Number(dice.DiceDots)
    }
    return house.Id-Number(dice.DiceDots)
  }
  ChipKillsOtherChip(KillerChip:Chips,MurderdChip:Chips,TheHouse:House){
    TheHouse.ChipsInHouse.pop()
    if(MurderdChip.Color==="White"){
      this.AllHouses[WhitKillHouse].ChipsInHouse.push(MurderdChip)
      this.MoveToOtherPersonInformation(TheHouse,this.AllHouses[WhitKillHouse])
    }
    else{
      this.AllHouses[BlackKillHouse].ChipsInHouse.push(MurderdChip)
      this.MoveToOtherPersonInformation(TheHouse,this.AllHouses[BlackKillHouse])
    } 
    TheHouse.ChipsInHouse.push(KillerChip)
  }
  MoveUser(StartHouse:House,EndHouse:House,chip:Chips){
    StartHouse.ChipsInHouse.pop()
    if(EndHouse.ChipsInHouse.length!==1){
      EndHouse.ChipsInHouse.push(chip)
    }
    else{
      if(this.checkIfKill(EndHouse,chip)){
        this.ChipKillsOtherChip(chip,EndHouse.ChipsInHouse[0],EndHouse)
      }
      else EndHouse.ChipsInHouse.push(chip)
    }
    this.MoveToOtherPersonInformation(StartHouse,EndHouse)
    if(this.CheckIfYouWin(chip.Color)){
      this.MoveOtherPlayerToLosePage()
      this.navigateToWinPage()
    }
  }
  checkIfKill(EndHouse:House,chip:Chips){
    if(chip.Color===EndHouse.ChipsInHouse[0].Color)
    return false
    else return true
  }
  /////////////
  AllowButton():boolean{
    let chip:Chips={Color:"White"}
    if(this.dice.length===0&&this.yourColor!==this.TurnsColor)return true
    if(this.dice.length===0&&this.yourColor===""&&this.TurnsColor==="")return true
    if(this.dice.length===1||this.dice.length>2){
       if(this.TurnsColor==="White"){
      if(this.AllHouses[WhitKillHouse].ChipsInHouse.length!==0){
        if(!this.CheckIfChipCouldLandOnHouse(chip,this.dice[0].DiceDots)){
          this.dice=[]
          this.playerTuchedTheDice()
          return this.AllowButton()
        }
      }
    }
    else{
      chip.Color="Black"
      if(this.AllHouses[BlackKillHouse].ChipsInHouse.length!==0){
        if(!this.CheckIfChipCouldLandOnHouse(chip,25-this.dice[0].DiceDots)){
          this.dice=[]
          this.playerTuchedTheDice()
          return this.AllowButton()
        }
      }
    }
    for (let index = 1; index < this.AllHouses.length-2; index++) {
      if(this.AllHouses[index].ChipsInHouse.length===0)continue
      if(this.AllHouses[index].ChipsInHouse[0].Color!==this.TurnsColor)continue
      const foundMoves=this.CheckIfCouldMove(this.AllHouses[index],this.dice[0].DiceDots)
      if(foundMoves)return false
    }
    this.dice=[]
    this.playerTuchedTheDice()
    return this.AllowButton()
  }
  if(this.dice.length===2){
    if(this.TurnsColor==="White"){
      if(this.AllHouses[WhitKillHouse].ChipsInHouse.length!==0){
        if(!this.CheckIfChipCouldLandOnHouse(chip,this.dice[0].DiceDots)&&!this.CheckIfChipCouldLandOnHouse(chip,this.dice[1].DiceDots)){
          this.dice=[]
          this.playerTuchedTheDice()
          return this.AllowButton()
        }
      }
    }
    else{
      chip.Color="Black"
      if(this.AllHouses[BlackKillHouse].ChipsInHouse.length!==0){
        if(!this.CheckIfChipCouldLandOnHouse(chip,25-this.dice[0].DiceDots)&&!this.CheckIfChipCouldLandOnHouse(chip,25-this.dice[1].DiceDots)){
          this.dice=[]
          this.playerTuchedTheDice()
          return this.AllowButton()
        }
      }
    }
    for (let index = 1; index < this.AllHouses.length-2; index++) {
      if(this.AllHouses[index].ChipsInHouse.length===0)continue
      if(this.AllHouses[index].ChipsInHouse[0].Color!==this.TurnsColor)continue
      const foundMoves=this.CheckIfCouldMove(this.AllHouses[index],this.dice[0].DiceDots)||this.CheckIfCouldMove(this.AllHouses[index],this.dice[1].DiceDots)
      if(foundMoves)return false
    }
    this.dice=[]
    this.playerTuchedTheDice()
    return this.AllowButton()
  }
    return false
  }
  CheckIfCouldMove(StartHouse:House,Dice:number):boolean{
    const c:Chips=this.getLastChip(StartHouse)
    if(c.Color==="White"){
      return this.CheckIfChipCouldLandOnHouseForCheckingMoves(c,Number(StartHouse.Id)+Number(Dice),StartHouse)
    }
    else{
      return this.CheckIfChipCouldLandOnHouseForCheckingMoves(c,StartHouse.Id-Dice,StartHouse)
    }
  }
  CheckIfChipCouldLandOnHouseForCheckingMoves(chip:Chips,numberOfHouse:number,begningHouse:House):boolean{

    if(numberOfHouse<25&&numberOfHouse>0){
      if(this.AllHouses[numberOfHouse].ChipsInHouse.length===0)return true
      if(this.AllHouses[numberOfHouse].ChipsInHouse.length===1)return true
      else
      return this.AllHouses[numberOfHouse].ChipsInHouse[0].Color===chip.Color
    }
    else{
      return this.CheckIfUserIsInHouseAndCouldStillMove(numberOfHouse,chip,begningHouse)
    }
    
  }
  CheckIfUserIsInHouseAndCouldStillMove(numOfHouse:number,chip:Chips,begningHouse:House):boolean{
    let count:number=0
    if(chip.Color==="White"){
      for (let index = 25; index > 18; index--) {
        count=count+this.AllHouses[index].ChipsInHouse.length
        if(count===15){
          if(numOfHouse===25)
          {
            return true
          }
          else{
            for (let index = 18; index < begningHouse.Id; index++) {
              if(this.AllHouses[index].ChipsInHouse.length!==0){
                return false
              }
            }
            return true
          }
        }
      }
    }
    else{
      for (let index = 0; index < 7; index++) {
        count=count+this.AllHouses[index].ChipsInHouse.length
        if(count===15){
          if(numOfHouse===0)return true
          else{
            for (let index = 6; index > begningHouse.Id; index--) {
              if(this.AllHouses[index].ChipsInHouse.length!==0)return false
            }
            return true
          }
        }
      }
    }
    return false
  }
  CheckIfChipCouldLandOnHouse(chip:Chips,numberOfHouse:number):boolean{
    if(this.AllHouses[numberOfHouse].ChipsInHouse.length===0)return true
    if(this.AllHouses[numberOfHouse].ChipsInHouse.length===1)return true
    else
      return this.AllHouses[numberOfHouse].ChipsInHouse[0].Color===chip.Color
  }
  GetNumbersFromDice($event:number[]){
    if(this.dice.length!==2)this.ChangeTurns()
    
    
    for (let index = 0; index < $event.length; index++) {
      this.dice.push(
        {
          DiceDots:$event[index],
          HaveBeanUsed:false
      })
      if($event[0]===$event[1]&&this.dice.length===2)this.GetNumbersFromDice($event)
    }
    this.playerTuchedTheDice()
  }
  CheckIfYouWin(Color:string):boolean{
    if(Color==="Black"){
      return this.AllHouses[0].ChipsInHouse.length===15
    }
    else{
      return this.AllHouses[25].ChipsInHouse.length===15
    }
  }
  CheckIfNoDeadUser(chip:Chips){
    if(chip.Color==="White"){
      return this.AllHouses[WhitKillHouse].ChipsInHouse.length===0
    }
    else{
      return this.AllHouses[BlackKillHouse].ChipsInHouse.length===0
    }
  }
  checkIfAllChipsAreInHouse(){
    let numOfChipsInHouse:number=0
    if(this.yourColor==="White"){
      for (let index = 19; index < 26; index++) {
        numOfChipsInHouse=numOfChipsInHouse+this.AllHouses[index].ChipsInHouse.length
        if(numOfChipsInHouse===15)return true
      }
    }
    else{
      for (let index = 0; index < 7; index++) {
        numOfChipsInHouse=numOfChipsInHouse+this.AllHouses[index].ChipsInHouse.length
        if(numOfChipsInHouse===15)return true
      }
    }
    return false
  }
  ChangeTurns(){
    let randomNum=Math.floor(Math.random() * 10); 
    if(this.TurnsColor===""){
      this.getColor()
      if(randomNum<5)this.TurnsColor="White"
      else this.TurnsColor="Black"
      this.MoveTurnToTheNext()
      return
    }
    if(this.TurnsColor==="White")this.TurnsColor="Black"
    else this.TurnsColor="White"
    this.MoveTurnToTheNext()
  }
  //////for socket/////
  // SendAfterMove
  MoveToOtherPersonInformation(StartHous:House,EndHouse:House){
    var move:PlayMove={
      StartHouse:StartHous,
      EndHouse:EndHouse
    }
    this.service.emit('game play',{
      to:this.to,
      Move:move
    }
    )
  }
  GetInformationOnMoveFromOtherPlayer(data:any){
    const startHous:House=data.Move.StartHouse
    const endHouse:House=data.Move.EndHouse
    this.AllHouses[startHous.Id].ChipsInHouse=startHous.ChipsInHouse
    this.AllHouses[endHouse.Id].ChipsInHouse=endHouse.ChipsInHouse
  }
  MoveTurnToTheNext(){
    this.service.emit('change turn',{
      to:this.to,
      Turn:this.TurnsColor
    })
  }
  getTurn(data:any){
    this.TurnsColor=data.Turn
  }

  playerTuchedTheDice(){
    this.service.emit('dice throw',{
      to:this.to,
      Dice:this.dice
    })
  }
  otherPlayerTuchedDice(data:any){
    let checkIfNeedToRollDice:boolean
    if(this.dice.length===0)checkIfNeedToRollDice=true
    else checkIfNeedToRollDice=false
    this.dice=data.Dice
    if(checkIfNeedToRollDice){
      let moves=[]
      for (let index = 0; index < this.dice.length; index++) {
        moves.push(this.dice[index].DiceDots)
      }
      this.child.sendNumbersAndRollThem(moves)
    }
  }
  
  getColor(){
    if(this.yourColor===""){
      let randomNum=Math.floor(Math.random() * 10); 
      if(randomNum<5){
        this.yourColor="White"
        this.service.emit('Get turn',{
          to:this.to,
          Color:"Black"
        })
        
      }
      else{
        this.yourColor="Black"
        this.service.emit('Get turn',{
          to:this.to,
          Color:"White"
        })
        
      }
    }
  }
  yourTurnIs(data:any){
    if(this.yourColor===""){
      this.yourColor=data.Color
    }
  }
  MoveOtherPlayerToLosePage(){
    this.service.emit('you lose',{to:this.to})
  }
  
  youLost(){
    this.navigateToLosePage()
  }

  navigateToWinPage(){
    this.router.navigateByUrl('/win');
  }

  navigateToLosePage(){
  this.router.navigateByUrl('/lose');
  }
  youlose(){
    this.navigateToLosePage()
  }
  
}
