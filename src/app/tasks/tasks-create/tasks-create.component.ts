import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tasks-create',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './tasks-create.component.html',
  styleUrl: './tasks-create.component.css'
})
export class TasksCreateComponent {

  taskForm!: FormGroup;
  tasksService: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.initializeForm();
  }

  initializeForm() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['PENDING', Validators.required],
      deadline: ['', Validators.required],
    });
  }

  saveTask() {
    if (this.taskForm.valid) {
      const newTask = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        status: this.taskForm.value.status,
        deadline: new Date(this.taskForm.value.deadline).toISOString(), // Converte a data para ISO 8601
      };

      // Chama o serviço para adicionar a tarefa na API
      this.tasksService.addTask(newTask).subscribe({
        next: (response: any) => {
          console.log('Nova tarefa criada:', response);
          this.router.navigate(['/tasks']); // Redireciona para a lista de tarefas
        },
        error: (error: any) => {
          console.error('Erro ao salvar a tarefa:', error);
        }
      });
    }
  }

}
