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
  accept : boolean =false;
  constructor(private service:WebSocketService) { }

  ngOnInit(): void {
    this.service.listen('connected').subscribe((data)=>{this.connectedUsersList=data;})
    this.service.listen('gameInvite').subscribe((data)=>{alert(` ${data.username} invited you to a game!`); this.accept=!this.accept})
  }

  getPrivateRoom(user:any){
    console.log('selcted user' , user);
    this.selectedUser = user;
  }

  inviteToGame(user:any){
    console.log('selcted user' , user);
    //this.selectedUser = user;

    this.service.emit('game invite',user);
  }
}
