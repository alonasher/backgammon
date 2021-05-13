import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chat2',
  templateUrl: './chatv2.component.html',
  styleUrls: ['./chatv2.component.css']
})
export class Chatv2Component implements OnInit {
  data = 'no data';
  someNumber = 0;
  constructor(private socket: Socket) {

  }
  ngOnInit(): void {
    this.socket.on('recievedNumber', (data: string) => {
      console.log(data);
      this.data = data;
    });

    this.socket.on('randomNumber', (data: string) => {
      console.log(data);
      this.data = data;
    });
  }

  emitNumber(){
    this.socket.emit("emitNumber", this.someNumber)
  }

  emitRandom(){
    this.socket.emit("emitRandom")
  }
}