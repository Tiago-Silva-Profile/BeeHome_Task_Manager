import { Component } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task } from '../task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  imports: [
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    RouterModule
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent {

  itemsPerPage: number = 10; // Número de itens por página
  paginatedTasks: any[] = []; // Tarefas exibidas na página atual


  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filterStatus: string = '';
  currentPage: number = 1; // Página atual

  constructor(private taskService: TasksService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.applyFilter();
    });
  }

  applyFilter() {
    this.filteredTasks = this.filterStatus ?
      this.tasks.filter(task => task.status === this.filterStatus) : this.tasks;
  }

  openEditModal(task: Task) {
    // Lógica para abrir o modal de edição
  }

  openDeleteModal(taskId: number) {
    // Lógica para abrir o modal de exclusão
  }

  // Método para atualizar a paginação
  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTasks = this.tasks.slice(startIndex, endIndex);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

   // Métodos para navegação na paginação
   goToNextPage() {
    if (this.currentPage * this.itemsPerPage < this.tasks.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

}
