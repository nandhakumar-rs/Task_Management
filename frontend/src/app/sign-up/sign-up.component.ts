import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignUpService } from './sign-up.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private service:SignUpService,private router:Router,private snackbar:MatSnackBar) { }

  ngOnInit() {

  }


  signUp(form:NgForm){
    this.service.signUp(form.value).subscribe(data=>{
      if(data.login){
        this.snackbar.open(data.message + ", Please Login","OK",{duration:3000});
        this.router.navigate(['/login'])
      }else{
        this.snackbar.open(data.error + ", Please Login","OK",{duration:3000});

      }
    })
  }

}
