import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from 'src/app/chatv2/web-socket.service';


@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {

  @Input() connectedUsers:any[]=[];
  @Output() getPrivateRoom:EventEmitter<any> = new EventEmitter();
  @Output() inviteToGame: EventEmitter<any>= new EventEmitter();
  @Output() startGame:EventEmitter<any>= new EventEmitter();
  userId:any = ""
  @Input() userAccepted:boolean = false;

  constructor( private route: ActivatedRoute, private service:WebSocketService) {}

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params=>this.userId=params.ID)
    //this.service.emit('connect',userId);
    //this.service.listen('connected').subscribe((data)=>{this.connectedUsers = data});
  }

  onPrivateMessageClick(user:any){
    console.log(user);
    //this.service.emit('private message',user);
    this.getPrivateRoom.emit(user);
  }

  onInviteClick(user:any){
    console.log('on clinck',user);
    //this.service.emit('private message',user);
    this.inviteToGame.emit(user);
  }  
}
