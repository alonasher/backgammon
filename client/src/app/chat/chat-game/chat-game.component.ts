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
  accept:boolean=false
  rivalToken :any;
  connectedUsersList: any[]=[];

  constructor(private router: Router,private service:WebSocketService,private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.service.listen('gameacssept').subscribe((data)=>{this.accept=true})
    this.route.queryParams.subscribe((params)=>{
      this.accept = params.accept
    })
  }
  GetPlayer($event:any){
    this.selectedUser=$event
  }
  getAccept():boolean{
    console.log(`accept that returns is ${this.accept}`);
    
    return this.accept
  }

}
