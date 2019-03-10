import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }


  getAllTask(userId){
    return this.http.get<any>(`http://localhost:5000/get-all-tasks/${userId}`);
  }

  deleteTask(id){
    return this.http.delete<any>(`http://localhost:5000/delete-task/${id}`)
  }
}
