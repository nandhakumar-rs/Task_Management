import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddNewTaskService {

  constructor(private http:HttpClient) { }

  addNewTask(task){
   return this.http.post<any>("http://localhost:5000/add-task",task);
  }

  getTask(id){

    return this.http.get<any>(`http://localhost:5000/get-task/${id}`);

  }
  updateTask(task,id){
    return this.http.put<any>(`http://localhost:5000/update-task/${id}`,task)
  }
}
