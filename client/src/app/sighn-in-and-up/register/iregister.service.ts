import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Guid } from 'guid-typescript';
import { UserModel } from '../../Model/UserModel';


@Injectable({
  providedIn: 'root'
})
export class IRegisterService {

  private port="3000"
  private baseUrl=`http://localhost:${this.port}`;
  private headers=new HttpHeaders({'Content-Type':'application/json'})
  // constructor(private http: HttpClient) { }
  // LogInUser(User:UserModel):Observable<Guid>{
  //   console.log(User)
  //   return this.http.post(`${this.baseUrl}/LogIn`,
  //   JSON.stringify(User),{headers:this.headers})
  //   .pipe(map((res:any)=><Guid>(res)));
  //   }
}
