import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('${this.apiUrl}/task');
  }


  getStatusTasks(task: Task): Observable<Task[]> {
    return this.http.get<Task[]>('${this.apiUrl}/task/filter/${task.status}');
  }

  getOneTasks(task: Task): Observable<Task[]> {
    return this.http.get<Task[]>('${this.apiUrl}/task/filter/${task.id}');
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>('${this.apiUrl}/tasks?userId={userId})', task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/tasks/${task.id}?userId={userId}`, task);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${taskId}?userId={userId}`);
  }
}
