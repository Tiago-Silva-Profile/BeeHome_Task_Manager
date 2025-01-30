import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks: Task[] = [];

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('/task');
  }

  getStatusTasks(task: Task): Observable<Task[]> {
    return this.http.get<Task[]>('/task/filter/${task.status}');
  }

  getOneTasks(task: Task): Observable<Task[]> {
    return this.http.get<Task[]>('/task/filter/${task.id}');
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>('/tasks?userId={userId})', task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`/tasks/${task.id}?userId={userId}`, task);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`/tasks/${taskId}?userId={userId}`);
  }
}
