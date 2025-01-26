import { CommonModule} from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-tasks',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  paginatedTasks: any[] = [];
  filterStatus = '';
  itemsPerPage = 5;
  currentPage = 1;

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    // Mock data for tasks
    this.tasks = [
      { id: 1, title: 'Tarefa 1', description: 'Descrição 1', status: 'PENDING', creationDate: new Date(), deadline: new Date() },
      { id: 2, title: 'Tarefa 2', description: 'Descrição 2', status: 'IN_PROGRESS', creationDate: new Date(), deadline: new Date() },
      // Adicione mais tarefas...
    ];
    this.updatePagination();
  }

  applyFilter() {
    this.updatePagination();
  }

  updatePagination() {
    const filteredTasks = this.filterStatus
      ? this.tasks.filter(task => task.status === this.filterStatus)
      : this.tasks;

    this.paginatedTasks = filteredTasks.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
    this.updatePagination();
  }

  openModal() {
    // Abrir modal para adicionar ou editar
  }

  editTask(task: any) {
    this.openModal();
    // Lógica de edição
  }

  deleteTask(id: number) {
    // Lógica de exclusão
  }

}
