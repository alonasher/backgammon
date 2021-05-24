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
  id:any;
  // connectedUsersList:any[]=[]
  constructor(private router: Router,private service:WebSocketService,private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.service.listen('gameacssept').subscribe((data)=>{this.acccept=true})//,this.id=data,this.getSelectedUser()
    // this.service.listen('connected').subscribe((data)=>{this.connectedUsersList=data;})
    this.route.queryParamMap.subscribe((params:any) => 
      {
        console.log(params)
        // if(JSON.parse(params.params.User)!==undefined)this.selectedUser = JSON.parse(params.params.User)
      console.log(this.selectedUser);
      this.acccept=JSON.parse(params.params.accept)
      console.log(JSON.parse(params.params.accept));
      });
  }
  GetPlayer($event:any){
    this.selectedUser=$event
  }
  getSelectedUser(){
    // this.selectedUser=this.connectedUsersList.find(u=>u.id===this.id)
  }

}
