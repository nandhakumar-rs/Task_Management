import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(email,password){
    return this.http.post<any>('http://localhost:5000/log-in',{email:email,password:password})
  }
}
