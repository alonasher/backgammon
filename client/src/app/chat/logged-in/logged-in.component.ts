import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebSocketService } from 'src/app/services/web-socket.service';


@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {
  user:any
  @Input() connectedUsers:any[]=[];
  @Output() getPrivateRoom:EventEmitter<any> = new EventEmitter();
  @Output() inviteToGame: EventEmitter<any>= new EventEmitter();
  @Output() startGame:EventEmitter<any>= new EventEmitter();
  userId:any = ""
  @Input() userAccepted:boolean = false;

  constructor( private route: ActivatedRoute, private service:WebSocketService,private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>this.userId=params.ID)
  }

  onPrivateMessageClick(user:any){
    this.user=user
    this.getPrivateRoom.emit(user);
  }
  onInviteClick(user:any){
    this.user=user
    this.service.emit('game invite2',{To:user,from:this.userId});
    this.inviteToGame.emit(user);
    this.NavigateToGamePage()
  }

  NavigateToGamePage(){
    this.router.navigate(['game'],{queryParams: { accept: false,rivalToken:this.user.token }});
  }
}
