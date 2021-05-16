import { Component, OnInit } from '@angular/core';

declare function rollDice():any;
@Component({
  selector: 'app-rool-dice',
  templateUrl: './rool-dice.component.html',
  styleUrls: ['./rool-dice.component.css']
})
export class RoolDiceComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
  myFunction() {
    location.replace("https://www.w3schools.com")
  }
}
