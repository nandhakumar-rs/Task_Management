import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
import { MatSnackBar } from '@angular/material';
import {Chart} from 'chart.js';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
tasks = [];
taskChart = []
labels = [];
dataset = []
  constructor(private service:TasksService,private snackbar:MatSnackBar) { }

  ngOnInit() {
   
this.service.getAllTask(localStorage.getItem("id")).subscribe(data=>{
this.tasks =  data.data;
this.labels = data.data.map(task => task.taskName)
this.dataset = data.data.map(hr=> {
  if(hr.status == 0){
  let diffInMs: number = Date.now() - Date.parse(hr.startDate);
let diffInHours: number = diffInMs / 1000 / 60 / 60;
return diffInHours
  }else{
    let diffInMs: number = Date.parse(hr.endDate) - Date.parse(hr.startDate);
    let diffInHours: number = diffInMs / 1000 / 60 / 60;
    return diffInHours
  }

})

this.taskChart =  new Chart('chart',{
  type: 'bar',
    data: {
        labels: this.labels,
        datasets: [{
            label: 'Time in Hours',
            data: this.dataset,
            borderColor:"#673ab7",
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
console.log(this.tasks,this.labels,this.dataset,this.taskChart.config.data)
})

  }
delete(event){
  this.service.deleteTask(event).subscribe(data=>{
this.snackbar.open(data.message,"OK",{duration:3000})
this.service.getAllTask(localStorage.getItem("id")).subscribe(data=>{
  this.tasks =  data.data;
this.labels = data.data.map(task => task.taskName)
this.dataset = data.data.map(hr=> {
  if(hr.status == 0){
  let diffInMs: number = Date.now() - Date.parse(hr.startDate);
let diffInHours: number = diffInMs / 1000 / 60 / 60;
return diffInHours
  }else{
    let diffInMs: number = Date.parse(hr.endDate) - Date.parse(hr.startDate);
    let diffInHours: number = diffInMs / 1000 / 60 / 60;
    return diffInHours
  }

})

this.taskChart =  new Chart('chart',{
  type: 'bar',
    data: {
        labels: this.labels,
        datasets: [{
            label: 'Time in Hours',
            data: this.dataset,
            borderColor:"#673ab7",
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

})

  })
}
}
