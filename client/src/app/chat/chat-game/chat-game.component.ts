import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebSocketService } from 'src/app/chatv2/web-socket.service';

@Component({
  selector: 'app-chat-game',
  templateUrl: './chat-game.component.html',
  styleUrls: ['./chat-game.component.css']
})
export class ChatGameComponent implements OnInit {

  selectedUser:any
  acccept:boolean=false
  rivalToken :any;
  connectedUsersList: any[]=[];

  constructor(private router: Router,private service:WebSocketService,private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.service.listen('gameacssept').subscribe((data)=>{this.acccept=true})

    this.route.queryParams.subscribe((params)=>{
      console.log('query params', params.accept);
      this.acccept = params.accept
      console.log('query params' ,params.user);
      this.rivalToken = params.rivalToken
      //this.getSelectedUser(params.user)
    })

  }

  GetPlayer($event:any){
    this.selectedUser=$event
  }

  getSelectedUser(userId:any){
    // this.selectedUser=this.connectedUsersList.find(u=>u.id === userId)
    // console.log(this.connectedUsersList.find(u=>u.id === userId));
    
    // console.log('selcted user after socket', this.selectedUser);
    
  }

}
