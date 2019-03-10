import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  constructor(private http:HttpClient) { }

  signUp(userDetails){
    return this.http.post<any>("http://localhost:5000/sign-up",userDetails);
  }
}
