import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGameService } from '../igame.service';

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.css']
})
export class WinComponent implements OnInit {

  constructor(private router: Router,private service:IGameService) { }
  NavigateBackHome(){
    // 'disconnect'
    this.service.emit('disconnect',"")
    this.router.navigateByUrl('StartPage');
  }
  ngOnInit(): void {
    // this.service.listen('gameinvite2').subscribe((data)=>{this.service.emit("Deny",data.To.token)})
  }

}
