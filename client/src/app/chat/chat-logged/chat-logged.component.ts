import { Component, OnInit, Output } from '@angular/core';
import { WebSocketService } from 'src/app/chatv2/web-socket.service';

@Component({
  selector: 'app-chat-logged',
  templateUrl: './chat-logged.component.html',
  styleUrls: ['./chat-logged.component.css']
})
export class ChatLoggedComponent implements OnInit {

  selectedUser:any;
  constructor(private service:WebSocketService) { }

  ngOnInit(): void {
  }

  getPrivateRoom(event:any){
    console.log(event);
    this.selectedUser = event;
  }
}
