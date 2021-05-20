import { Component, OnInit } from '@angular/core';
import { Dice } from 'src/app/Model/Dice';
import {  Chips } from '../../Model/Chips';
import { House} from '../../Model/House';
// import rollADie from 'roll-a-die';

const AmountOfHouse=28;//24 houses+ 0,25 win house+2 out houses one for black one for white

@Component({
  selector: 'app-game2-fix-problems',
  templateUrl: './game2-fix-problems.component.html',
  styleUrls: ['./game2-fix-problems.component.css']
})
export class Game2FixProblemsComponent implements OnInit {
  yourColor:string="White";
  public isTrue:boolean=false
  AllHouses:House[]=[];
  public halfeTopHouse:House[]=[]
  public halfeBottomHouse:House[]=[]
  // dice:number[]=[];
  dice:Dice[]=[]
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
    for (let index = (this.AllHouses.length)/2-1; index < this.AllHouses.length-2; index++) {
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
    if(this.couldYouDoYourTurn(house)){
      console.log("chip color is the same as your color");
      
      if(!this.checkIfAllChipsAreInHouse()){
        console.log("regulor move");
        
        this.regularMoveInGame(house)
      }
      else{
        console.log("move in the house");
        
        this.movesInHouse(house)
        for (let index = 0; index < this.dice.length; index++) {
          if(Math.abs(this.startHouse.Id-house.Id)===this.dice[index].DiceDots){
            this.dice[index].HaveBeanUsed=true
            return
          }
        }
      }
    }
    else{
      console.log("chip color are not the same as your color");
      this.turnAllHomesToBeCantLand();
    }
  }
  regularMoveInGame(house:House){
    console.log("regular move");
    
    if(!house.CouldLandOn){
      console.log("house is not green");
      this.turnAllHomesToBeCantLand();
      this.startHouse=house
      console.log("added start house");
      if(house.ChipsInHouse.length===0)return
      console.log("there is chips in house");
      
      const chip=house.ChipsInHouse[house.ChipsInHouse.length-1]
      if(this.CheckIfNoDeadUser(chip)){
        this.checkIfHouseIsLandable(chip,house,0)
        this.checkIfHouseIsLandable(chip,house,1)
        console.log("no dead player");
        
      }
      else{
        if(house===this.AllHouses[26]||house===this.AllHouses[27]){
          this.MoveFromDeadHouse(house)
        }
      }
    }
    else{
      console.log("could start moving");
      
      this.MoveUser(this.startHouse,house,this.getLastChip(this.startHouse))
      this.startHouse.Id=0
    }
  }
  movesInHouse(house:House){
    if(!house.CouldLandOn){
      this.turnAllHomesToBeCantLand();
      this.startHouse=house
      console.log("MoveSolder");
      if(house.ChipsInHouse.length===0)return
      const chip=house.ChipsInHouse[house.ChipsInHouse.length-1]
      // if(this.CheckIfNoDeadUser(chip)){
        this.checkIfHouseIsLandableForWin(chip,house,0)
        this.checkIfHouseIsLandableForWin(chip,house,1)
    }
    else{
      this.MoveUser(this.startHouse,house,this.getLastChip(this.startHouse))
      this.CheckIfYouWin(this.yourColor)
    }
  }
  checkIfHouseIsLandableForWin(chip:Chips,house:House,Dice:number){
    if(!this.dice[Dice].HaveBeanUsed)return
    let houseToLand=this.CalculateAmountOfMoves(chip,house,Dice)
    if(houseToLand<0||houseToLand>25){
      if(houseToLand<0){
        for (let index = 6; index >this.dice[Dice].DiceDots; index++) {
          if(this.AllHouses[index].ChipsInHouse.length!==0)return
        }
        houseToLand=0
      }
      else{
        for (let index = 19; index <houseToLand-this.dice[Dice].DiceDots; index++) {
          if(this.AllHouses[index].ChipsInHouse.length!==0)return
        }
        houseToLand=25
      }
    }
    console.log(houseToLand);
    
    let couldLand=this.CheckIfChipCouldLandOnHouse(chip,houseToLand)
    if(couldLand){
      this.AllHouses[houseToLand].CouldLandOn=true
    }
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
    this.startHouse.Id=0
  }
  checkIfHouseIsLandable(chip:Chips,house:House,Dice:number){
    let houseToLand=this.CalculateAmountOfMoves(chip,house,Dice)
    if(houseToLand===0||houseToLand>24)return
    console.log(houseToLand);
    
    let couldLand=this.CheckIfChipCouldLandOnHouse(chip,houseToLand)
    if(couldLand){
      this.AllHouses[houseToLand].CouldLandOn=true
    }
  }
  CalculateAmountOfMoves(chip:Chips,house:House,Dice:number){
    console.log(house.Id);
    
    let id=Number(house.Id)
    if(chip.Color==="White"){
      // console.log("in white");
      // console.log(this.dice[Dice]);
      // console.log(house.Id);
      // console.log(this.dice[Dice]);
      // console.log(id+this.dice[Dice]);
      return house.Id+Number(this.dice[Dice].DiceDots)
       }
      //  console.log("in black");
       return house.Id-this.dice[Dice].DiceDots
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
  }
  checkIfKill(EndHouse:House,chip:Chips){
    if(chip.Color===EndHouse.ChipsInHouse[0].Color)
    return false
    else return true
  }
  /////////////


  
  //get infromation
  GetNumbersFromDice($event:number[]){
    for (let index = 0; index < $event.length; index++) {
      this.dice.push(
        {
          DiceDots:$event[index],
          HaveBeanUsed:false
      })
      
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
  couldYouDoYourTurn(house:House):boolean{
    console.log("question asked");
    console.log(this.startHouse);
    
    if(this.startHouse.Id===0){
      return house.ChipsInHouse[0].Color===this.yourColor
    }
    if(this.startHouse.ChipsInHouse[0].Color===this.yourColor&&house.CouldLandOn){
      return true
    }
    return false
  }
  
}
