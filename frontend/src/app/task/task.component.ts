import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
@Input() task;
@Output() delete:EventEmitter<any> = new EventEmitter();
status;
  constructor() { }

  ngOnInit() {
    if(this.task.status == 0){
this.status = "On Going"
    }else{
      this.status = "Completed"
    }
  }
deleteTask(id){
  this.delete.emit(id);

}
}
