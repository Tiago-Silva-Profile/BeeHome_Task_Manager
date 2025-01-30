import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tasks-form',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './tasks-form.component.html',
  styleUrl: './tasks-form.component.css'
})
export class TasksFormComponent {

  newTask: Task = {
    title: '',
    description: '',
    status: 'PENDING',
    deadline: new Date(),
    id: 0,
    creationDate: new Date()
  };

  @Output() taskCreated = new EventEmitter<Task>();

  constructor(private taskService: TasksService) {}

  addTask() {
    this.taskService.addTask(this.newTask).subscribe(task => {
      this.taskCreated.emit(task);
    });
  }

}
