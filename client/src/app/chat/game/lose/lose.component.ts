import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGameService } from '../igame.service';

@Component({
  selector: 'app-lose',
  templateUrl: './lose.component.html',
  styleUrls: ['./lose.component.css']
})
export class LoseComponent implements OnInit {

  constructor(private router: Router,private service:IGameService) { }
  NavigateBackHome(){
    this.service.emit('disconnect',"")
    this.router.navigateByUrl('StartPage');
  }

  ngOnInit(): void {
    // this.service.listen('gameinvite2').subscribe((data)=>{this.service.emit("Deny",data.To.token)})
  }

}
