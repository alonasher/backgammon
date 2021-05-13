import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../Model/UserModel';
import { ILoggedUsersService } from './ilogged-users.service';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {

  usersList:UserModel[]=[];
  constructor(private service:ILoggedUsersService) { }

  ngOnInit(): void {
    
  }
  
    
}
