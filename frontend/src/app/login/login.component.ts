import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:LoginService,private snackbar:MatSnackBar,private router:Router) { }

  ngOnInit() {
  }

  login(form:NgForm){
    this.service.login(form.value.email,form.value.password).subscribe(data=>{
      if(data.login){
        localStorage.setItem("id",data.id)
        this.router.navigate(['/'])
        this.snackbar.open(data.message,"OK",{duration:3000})
      }else{
        this.snackbar.open(data.message,"OK",{duration:3000})
      }
    })

  }
}
