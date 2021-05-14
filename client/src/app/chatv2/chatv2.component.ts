import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-chat2',
  templateUrl: './chatv2.component.html',
  styleUrls: ['./chatv2.component.css']
})
export class Chatv2Component implements OnInit {
  data = 'no data';
  someNumber = 0;
  title = 'Websocket Angular client ';
  userName!: string;
  message!: string;
  output: any[] = [];
  feedback!: string;
  constructor(private socket: Socket, private service:WebSocketService) {

  }
  ngOnInit(): void {
    
    this.service.listen('recievedNumber').subscribe((data)=>{this.data=data});

    this.socket.on('randomNumber', (data: string) => {
      console.log(data);
      this.data = data;
    });

    this.service.listen('typing').subscribe((data)=>{this.updateFeedback(data)});
    this.service.listen('chat').subscribe((data)=>{this.updateMessage(data)});
  }
  updateMessage(data: any) {
    this.feedback = '';
    if(!!!data) return;
    //console.log(`${data.handle} : ${data.message}`);
    this.output.push(data);
  }
  sendMessage() {
    this.service.emit('chat', {
      message: this.message,
      handle: this.userName
    });
    this.message = "";  
  }

  messageTyping(): void {
    this.service.emit('typing', this.userName);    
  }

  updateFeedback(data: any){
    this.feedback = `${data} is typing a message`;
  }
  emitNumber(){
    this.socket.emit("emitNumber", this.someNumber)
  }

  emitRandom(){
    this.socket.emit("emitRandom")
  }
}