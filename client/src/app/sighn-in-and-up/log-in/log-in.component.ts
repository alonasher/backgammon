import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  userForm: FormGroup;
  constructor(private fb:FormBuilder) { 
    this.userForm = this.fb.group({
      email:["", [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      Password:["", [Validators.required,Validators.minLength(4),Validators.maxLength(10)]],
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

  AllowBtn(){
    return this.checkIfPasswordValid()&&!this.checkIfNotValidEmail()
  }
  getUrl()
{
  return "url('src\assets\background_log_in.jpg')";
}

}
