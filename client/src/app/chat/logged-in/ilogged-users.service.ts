import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserModel } from '../../Model/UserModel';

@Injectable({
  providedIn: 'root'
})
export class ILoggedUsersService {

  private port="3000"
  private baseUrl=`http://localhost:${this.port}`;
  private headers=new HttpHeaders({'Content-Type':'application/json'})
  // constructor(private http: HttpClient) { }
  // // GetAllUsers():Observable<UserModel[]>{
  //   return this.http.get(`${this.baseUrl}/UsesList`)
  //   .pipe(map((res)=><UserModel[]>(res)))
  // }
  }
