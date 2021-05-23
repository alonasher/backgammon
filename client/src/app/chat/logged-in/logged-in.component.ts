import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from 'src/app/chatv2/web-socket.service';


@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {

  connectedUsers:any[]=[];
  @Output() getPrivateRoom:EventEmitter<any> = new EventEmitter();
  
  constructor( private route: ActivatedRoute, private service:WebSocketService) {}

  ngOnInit(): void {
    let userId=undefined;
    this.route.queryParams.subscribe(params=>userId=params.ID)
    
    //this.service.emit('connect',userId);
    this.service.listen('connected').subscribe((data)=>{this.connectedUsers = data});
  }

  onUserClick(user:any){
    console.log(user);
    //this.service.emit('private message',user);
    this.getPrivateRoom.emit(user);
  }
  
    
}
