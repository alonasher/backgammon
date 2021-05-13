import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { UserModel } from '../../Model/UserModel';

@Injectable({
  providedIn: 'root'
})
export class ILogInService {

  private port="3000"
  private baseUrl=`http://localhost:${this.port}`;
  private headers=new HttpHeaders({'Content-Type':'application/json'})
  // constructor(private http: HttpClient) { }
  // RegisterUser(User:UserModel):Observable<boolean>{
  //   console.log(User)
  //   return this.http.post(`${this.baseUrl}/Register`,
  //   JSON.stringify(User),{headers:this.headers})
  //   .pipe(map((res:any)=><boolean>(res)));
  //   }
  }
