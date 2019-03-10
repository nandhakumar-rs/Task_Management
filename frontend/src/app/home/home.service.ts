import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
title =  new BehaviorSubject<string>("Dashboard")
  constructor() { }

  setTitle(title){
    this.title.next(title)
  }
}
