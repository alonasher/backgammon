import { Component, OnInit } from '@angular/core';
import {  Chips } from '../../Model/Chips';
import { House} from '../../Model/House';

const AmountOfHouse=28;//24 houses+ 0,25 win house+2 out houses one for black one for white
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  AllHouses:House[]=[];
  

  constructor() { }

  ngOnInit(): void {
  }
  CreateHouses(){
    for (let index = 0; index < AmountOfHouse; index++) {
      this.AllHouses[index]={
        Id:index,
        ChipsInHouse:[]
      }
    }
  }
  CreateChips(){
    let index=0;
    for (let index = 0; index < 2; index++) {
      this.AllHouses[1].ChipsInHouse.push(
        this.CreateSingleChip(index,"White")
      )
      index=index+1
    }
    for (let index = 0; index < 5; index++) {
      this.AllHouses[6].ChipsInHouse.push(
        this.CreateSingleChip(index,"Black")
      )
      index=index+1
    }
    for (let index = 0; index < 3; index++) {
      this.AllHouses[8].ChipsInHouse.push(
        this.CreateSingleChip(index,"Black")
      )
      index=index+1
    }
    for (let index = 0; index < 5; index++) {
      this.AllHouses[12].ChipsInHouse.push(
        this.CreateSingleChip(index,"White")
      )
      index=index+1
    }
    for (let index = 0; index < 5; index++) {
      this.AllHouses[13].ChipsInHouse.push(
        this.CreateSingleChip(index,"Black")
      )
      index=index+1
    }
    for (let index = 0; index < 3; index++) {
      this.AllHouses[17].ChipsInHouse.push(
        this.CreateSingleChip(index,"White")
      )
      index=index+1
    }
    for (let index = 0; index < 5; index++) {
      this.AllHouses[19].ChipsInHouse.push(
        this.CreateSingleChip(index,"White")
      )
      index=index+1
    }
    for (let index = 0; index < 2; index++) {
      this.AllHouses[24].ChipsInHouse.push(
        this.CreateSingleChip(index,"Black")
      )
      index=index+1
    }
    
  }
  CreateSingleChip(index:number,color:string):Chips{
    let chip:Chips={
      Id:index,
      Color:color
    }
    return chip
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
  ChipKillsOtherChip(KillerChip:Chips,MurderdChip:Chips,TheHouse:House){
    TheHouse.ChipsInHouse.pop()
    if(MurderdChip.Color==="White")this.AllHouses[26].ChipsInHouse.push(MurderdChip)
    else this.AllHouses[27].ChipsInHouse.push(MurderdChip)
    TheHouse.ChipsInHouse.push(KillerChip)
  }
  MoveLogic(StartHouse:House,firstDice:number,secondDice:number){
    const c:Chips=this.getLastChip(StartHouse)
    if(c.Color==="White"){
      const firstRoll=this.CheckIfChipCouldLandOnHouse(c,firstDice+StartHouse.Id)
      const secondRoll=this.CheckIfChipCouldLandOnHouse(c,secondDice+StartHouse.Id)
    }
    else{
      const firstRoll=this.CheckIfChipCouldLandOnHouse(c,StartHouse.Id-firstDice)
      const secondRoll=this.CheckIfChipCouldLandOnHouse(c,StartHouse.Id-secondDice)
    }
  }
  getLastChip(StartHouse:House):Chips{
    const lastChipInArrey=StartHouse.ChipsInHouse.length-1
    return StartHouse.ChipsInHouse[lastChipInArrey]
  }
}
