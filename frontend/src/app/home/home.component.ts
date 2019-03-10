import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
headerTitle;
  constructor(private service:HomeService,private router:Router) { }

  ngOnInit() {
    this.service.title.subscribe(title=>this.headerTitle = title)
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])

  }

}
