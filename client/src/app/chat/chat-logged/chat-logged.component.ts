import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  AcsseptName:string=""
  Confirm:boolean=false
  fromId:any;
  constructor(private service:WebSocketService,private router: Router) { }

  ngOnInit(): void {
    this.service.listen('connected').subscribe((data)=>{this.connectedUsersList=data;})
    // this.service.listen('gameInvite').subscribe((data)=>{this.AcsseptInvite(data)})
    this.service.listen('gameinvite2').subscribe((data)=>{this.AcsseptInvite(data)})
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
  NavigatToGamePage(){
    this.router.navigate(['game'],{queryParams: { accept: true,rivalToken:this.fromId }});
  }

  AcsseptInvite(data:any){
    console.log('to 1 ', data.To);
    
    this.fromId=data.from
    this.selectedUser=this.connectedUsersList.find(u=>u.id===this.fromId)
    this.AcsseptName=data.username
    console.log('got socket AcsseptInvite');
    this.Confirm=true
  }
  Acssept(){
    console.log("acssepted game");
        this.service.emit('game acssept',this.fromId);
        this.accept=!this.accept
        this.NavigatToGamePage()
  }
  Denay(){
    this.Confirm=false
  }

}
