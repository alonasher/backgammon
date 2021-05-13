import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../Model/UserModel';
import { Guid } from 'guid-typescript';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegisterService } from './iregister.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  constructor(private fb:FormBuilder,private IService:IRegisterService,private router: Router) {
    this.userForm = this.fb.group({
      email:["", [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      Password:["", [Validators.required,Validators.minLength(4),Validators.maxLength(10)]],
      ReeEnterPassword:["", [Validators.required,Validators.minLength(4),Validators.maxLength(10)]] 
    });
   }

  ngOnInit(): void {
    
  }
  get email() { return this.userForm.get('email') }
  checkIfNotValidEmail(){return !this.email?.valid}
  emailTouched(){return this.email?.touched}

  get Password() { return this.userForm.get('Password') }
  checkIfPasswordValid(){return this.Password?.valid}
  PasswordTouched(){return this.Password?.touched}
  
  get ReeEnterPassword() { return this.userForm.get('ReeEnterPassword') }
  ReeEnterPasswordTouched(){
    return this.ReeEnterPassword?.touched
    
  }
  checkIfPasswordConfromation(){
    return this.Password?.value===this.ReeEnterPassword?.value
  }
  AllowBtn(){
    return this.checkIfPasswordConfromation()&&this.checkIfPasswordValid()&&!this.checkIfNotValidEmail()
  }
  Register(){
    var newUser:UserModel={
      Email:this.userForm.value.email,
      Password:this.userForm.value.Password
    }
    console.log(newUser);
    //
    //When i will have the server
    //
    // this.IService.LogInUser(newUser).subscribe(b=>{
    //   console.log(b);
    //   if(b){
    //     this.MoveToHomePage()
    //   }
    // })
  }
  MoveToHomePage(){
    this.router.navigateByUrl('/Start');
  }
}
