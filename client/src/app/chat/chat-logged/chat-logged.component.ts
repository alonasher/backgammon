import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-chat-logged',
  templateUrl: './chat-logged.component.html',
  styleUrls: ['./chat-logged.component.css']
})
export class ChatLoggedComponent implements OnInit{

  selectedUser:any;
  connectedUsersList :any[]=[];
  accept : boolean =false;
  AcsseptName:string=""
  Confirm:boolean=false
  fromId:any;
  userName!: string;
  constructor(private service:WebSocketService,private router: Router) { 
      this.service.emit('get again',"");    
  }


  ngOnInit(): void {
    this.service.listen('gameinvite2').subscribe((data)=>{this.AcsseptInvite(data)}) 
    this.service.listen('connected').subscribe((data)=>{this.connectedUsersList=data;})
    this.service.listen('get name').subscribe((data)=>{this.userName =data;})
  }

  getPrivateRoom(user:any){
    this.selectedUser = user;
  }

  inviteToGame(user:any){
    this.service.emit('game invite',user);
  }
  NavigatToGamePage(){
    this.router.navigate(['game'],{queryParams: { accept: true,rivalToken:this.fromId }});
  }

  AcsseptInvite(data:any){
    this.fromId=data.from
    this.selectedUser=this.connectedUsersList.find(u=>u.id===this.fromId)
    this.AcsseptName=data.username
    this.Confirm=true
  }
  Accept(){
        this.service.emit('game acssept',this.fromId);
        this.accept=!this.accept
        this.NavigatToGamePage()
  }
  Deny(){
    this.service.emit("Deny",this.fromId);
    this.Confirm=false
  }

}
