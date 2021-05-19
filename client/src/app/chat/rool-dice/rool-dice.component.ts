import { Component, OnInit } from '@angular/core';


declare function rollDice():any;
declare function returnNumbers():any;
@Component({
  selector: 'app-rool-dice',
  templateUrl: './rool-dice.component.html',
  styleUrls: ['./rool-dice.component.css']
})
export class RoolDiceComponent implements OnInit {
  cube:any
  constructor() { 

    //document.getElementById("roll-button").addEventListener("click", rollDice());
  // document.getElementById("roll-button").addEventListener("click",returnNumbers);
  
    // GetCube(this.cube)
    // this.cube
  }
  clickbtn(){
    rollDice()
    returnNumbers()
  }
  ngOnInit(): void {
  }
}
