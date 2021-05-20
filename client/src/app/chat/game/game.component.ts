import { Component, OnInit } from '@angular/core';
import { Dice } from 'src/app/Model/Dice';
import {  Chips } from '../../Model/Chips';
import { House} from '../../Model/House';
// import rollADie from 'roll-a-die';

const AmountOfHouse=28;//24 houses+ 0,25 win house+2 out houses one for black one for white
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  yourColor:string="White";
  public isTrue:boolean=false
  AllHouses:House[]=[];
  public halfeTopHouse:House[]=[]
  public halfeBottomHouse:House[]=[]
  dice:Dice[]=[];
  public startHouse:House={
    Id:0,
    ChipsInHouse:[],
    CouldLandOn:false
  }
  
  constructor() {
    this.CreateHouses()
   }
   ngOnInit(): void {
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

  //logic moves
  MoveSolder(house:House){
    console.log("starts moving solder");
    
      if(!house.CouldLandOn){
        this.turnAllHomesToBeCantLand();
        this.startHouse=house
        console.log("MoveSolder");
        if(house.ChipsInHouse.length===0)return
        console.log("more then 0 solders");
        const chip=house.ChipsInHouse[house.ChipsInHouse.length-1]
        console.log("last chip");
        
        if(this.CheckIfNoDeadUser(chip)){
          console.log("no dead player");
          this.checkIfHouseIsLandable(chip,house,0)
          this.checkIfHouseIsLandable(chip,house,1)
        }
        else{
          
          if(house===this.AllHouses[26]||house===this.AllHouses[27]){
            this.MoveFromDeadHouse(house)
          }
        }
      }
      else{
        this.MoveUser(this.startHouse,house,this.getLastChip(this.startHouse))
        const diceToNotUse=Math.abs(this.startHouse.Id-house.Id)
        for (let index = 0; index < this.dice.length; index++) {
          if(this.dice[index].DiceDots==diceToNotUse){
            this.dice[index].HaveBeanUsed=true
          this.dice.splice(index,1)
          break
        }
        }
        this.turnAllHomesToBeCantLand();
      }
    // }
  }
  MoveFromDeadHouse(DeadHouse:House){
    // if(!house.CouldLandOn){
    // this.turnAllHomesToBeCantLand();
    const chip=DeadHouse.ChipsInHouse[0]
    if(chip.Color==="White"){
      this.checkIfHouseIsLandable(chip,this.AllHouses[0],0)
      this.checkIfHouseIsLandable(chip,this.AllHouses[0],1)
    }
    else{
      this.checkIfHouseIsLandable(chip,this.AllHouses[25],0)
      this.checkIfHouseIsLandable(chip,this.AllHouses[25],1)
    }
  // }
  }
  turnAllHomesToBeCantLand(){
    this.AllHouses.forEach(h=>{
      h.CouldLandOn=false
    })
  }
  checkIfHouseIsLandable(chip:Chips,house:House,Dice:number){
    console.log(Dice);
    console.log(this.dice[Dice]);
    if(this.dice[Dice]===undefined)return
    if(this.dice[Dice].HaveBeanUsed)return
    let houseToLand=this.CalculateAmountOfMoves(chip,house,this.dice[Dice])
    console.log(houseToLand);
    
    if(houseToLand===0||houseToLand>24)return
    console.log(houseToLand);
    
    let couldLand=this.CheckIfChipCouldLandOnHouse(chip,houseToLand)
    if(couldLand){
      this.AllHouses[houseToLand].CouldLandOn=true
    }
  }
  CalculateAmountOfMoves(chip:Chips,house:House,dice:Dice){
    console.log("calculateMoves");
    console.log(chip);
    
    if(chip.Color==="White"){
    //   console.log("in white");
      console.log(dice.DiceDots);
    //   console.log(house.Id);
    //   console.log(this.dice[Dice]);
    console.log("end moves: ");
    
      console.log(house.Id+dice.DiceDots);
      return house.Id+Number(dice.DiceDots)
    }
       console.log("in black");
       return house.Id-Number(dice.DiceDots)
  }
  
  ChipKillsOtherChip(KillerChip:Chips,MurderdChip:Chips,TheHouse:House){
    TheHouse.ChipsInHouse.pop()
    if(MurderdChip.Color==="White")this.AllHouses[26].ChipsInHouse.push(MurderdChip)
    else this.AllHouses[27].ChipsInHouse.push(MurderdChip)
    TheHouse.ChipsInHouse.push(KillerChip)
    // this.MoveKilledToKilledHouse(MurderdChip)
  }
  CheckIfCouldMove(StartHouse:House,Dice:number):boolean{
    const c:Chips=this.getLastChip(StartHouse)
    if(c.Color==="White"){
      return this.CheckIfChipCouldLandOnHouse(c,Dice+StartHouse.Id)
    }
    else{
      return this.CheckIfChipCouldLandOnHouse(c,StartHouse.Id-Dice)
    }
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
    this.CheckIfYouWin(chip.Color)
  }
  checkIfKill(EndHouse:House,chip:Chips){
    if(chip.Color===EndHouse.ChipsInHouse[0].Color)
    return false
    else return true
  }
  /////////////


  disableButton():boolean{
    return this.dice.length===0
  }
  //get infromation
  GetNumbersFromDice($event:number[]){
    for (let index = 0; index < $event.length; index++) {
      this.dice.push(
        {
          DiceDots:$event[index],
          HaveBeanUsed:false
      })
      if($event[0]===$event[1]&&this.dice.length<4)this.GetNumbersFromDice($event)
    }
  }
  CheckIfYouWin(Color:string):boolean{
    if(Color="Black"){
      return this.AllHouses[0].ChipsInHouse.length===15
    }
    else{
      return this.AllHouses[25].ChipsInHouse.length===15
    }
  }
  CheckIfChipCouldLandOnHouse(chip:Chips,numberOfHouse:number):boolean{
    if(this.AllHouses[numberOfHouse].ChipsInHouse.length===0)return true
    if(this.AllHouses[numberOfHouse].ChipsInHouse.length===1)return true
    else
      return this.AllHouses[numberOfHouse].ChipsInHouse[0].Color===chip.Color
  }
  /////////////
  CheckIfNoDeadUser(chip:Chips){
    if(chip.Color==="White"){
      return this.AllHouses[26].ChipsInHouse.length===0
    }
    else{
      return this.AllHouses[27].ChipsInHouse.length===0
    }
  }
  checkIfAllChipsAreInHouse(){
    let numOfChipsInHouse:number=0
    if(this.yourColor==="White"){
      for (let index = 19; index < 26; index++) {
        // const element = array[index];
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

  
  
}
