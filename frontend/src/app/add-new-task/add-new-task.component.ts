import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { NgForm } from '@angular/forms';
import { AddNewTaskService } from './add-new-task.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.css']
})
export class AddNewTaskComponent implements OnInit {
taskName;
taskDescription;
status = 0;
startDate;
endDate;
options = [{id:0,name:'On Going'},{id:1,name:'Completed'}]
update = false;
task;
  constructor(private homeService:HomeService,private route:ActivatedRoute,private service:AddNewTaskService,private router:Router,private snackbar:MatSnackBar) { }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get("id")){
      this.update = true;
      this.homeService.setTitle("Update task")
      this.service.getTask(this.route.snapshot.paramMap.get("id")).subscribe(data=>{
        this.taskName = data.taskName;
        this.taskDescription =  data.taskDescription;
        this.status = data.status;
        console.log(this.status)
        this.startDate =  data.startDate;
        this.endDate = data.endDate;
      })
    }else{
      this.homeService.setTitle("Add New Task")
    }
  }
addTask(form:NgForm){
  console.log(form.value)
  this.task = {
    "userId":localStorage.getItem("id"),
  "taskName":form.value.taskName,
          "taskDescription":form.value.taskDescription,
          "startDate":Date.now(),
          "endDate":form.value.endDate,
          "status":form.value.status
  }

  if(this.update){
    if(this.task.status == 1){
      this.task = {
        "userId":localStorage.getItem("id"),
      "taskName":form.value.taskName,
              "taskDescription":form.value.taskDescription,
              "startDate":this.startDate,
              "endDate":Date.now(),
              "status":form.value.status
      }    }
    this.service.updateTask(this.task,this.route.snapshot.paramMap.get("id")).subscribe(data=>{
      this.snackbar.open(data.message,"OK",{duration:3000})
      this.router.navigate(['/home/dashboard'])
    });
  }else{
  this.service.addNewTask(this.task).subscribe(data=>{
    this.snackbar.open(data.message,"OK",{duration:3000})
    this.router.navigate(['/home/dashboard'])
  })
}
}
}
