import { Component, OnInit, Output } from '@angular/core';
import { WebSocketService } from 'src/app/chatv2/web-socket.service';

@Component({
  selector: 'app-chat-logged',
  templateUrl: './chat-logged.component.html',
  styleUrls: ['./chat-logged.component.css']
})
export class ChatLoggedComponent implements OnInit {

  selectedUser:any;
  connectedUsersList :any[]=[];
  constructor(private service:WebSocketService) { }

  ngOnInit(): void {
    this.service.listen('connected').subscribe((data)=>{this.connectedUsersList=data;console.log('list',data);
    })
  }

  getPrivateRoom(event:any){
    console.log(event);
    this.selectedUser = event;
  }
}
