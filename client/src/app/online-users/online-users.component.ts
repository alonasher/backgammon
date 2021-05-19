import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { WebSocketService } from '../chatv2/web-socket.service';

@Component({
  selector: 'app-online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.css']
})
export class OnlineUsersComponent implements OnInit {

  connectedUsers:any[]=[];

  constructor(private socket: Socket, private service:WebSocketService) {}

  ngOnInit(): void {
    this.service.listen('connected').subscribe((data)=>{this.connectedUsers = data});
  }

}
