import { CommonModule} from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import * as bootstrap from 'bootstrap';

@Component({
  standalone: true,
  selector: 'app-tasks',
  imports: [
    FormsModule,
    CommonModule,
    NgxPaginationModule
],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  filterStatus = '';
  tasks: any[] = []; // Array para armazenar as tarefas
  itemsPerPage: number = 10; // Número de itens por página
  currentPage: number = 1; // Página atual
  paginatedTasks: any[] = []; // Tarefas exibidas na página atual
  selectedTask: any = this.paginatedTasks;
  deleteTaskId: any = null;

  ngOnInit() {
    this.loadTasks();
  }

  constructor() {
    this.populateTasks(); // Inicializar as tarefas
    this.updatePagination(); // Atualizar a paginação inicial
  }

  // Método para preencher o array de tarefas
  populateTasks() {
    for (let i = 1; i <= 100; i++) {
      this.tasks.push({
        id: i,
        title: `Tarefa ${i}`,
        description: `Descrição da tarefa ${i}`,
        status: i % 3 === 0 ? 'COMPLETED' : i % 2 === 0 ? 'IN_PROGRESS' : 'PENDING',
        creationDate: new Date(),
        deadline: new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000), // Deadline futuro
      });
    }
  }

  loadTasks() {
    // Mock data for tasks
    this.tasks = [
      { id: 1, title: 'Tarefa 1', description: 'Descrição 1', status: 'PENDING', creationDate: new Date(), deadline: new Date() },
      { id: 2, title: 'Tarefa 2', description: 'Descrição 2', status: 'IN_PROGRESS', creationDate: new Date(), deadline: new Date() },
      { id: 3, title: 'Tarefa 3', description: 'Descrição 3', status: 'PENDING', creationDate: new Date(), deadline: new Date() },
      { id: 4, title: 'Tarefa 4', description: 'Descrição 4', status: 'IN_PROGRESS', creationDate: new Date(), deadline: new Date() },
      { id: 5, title: 'Tarefa 5', description: 'Descrição 5', status: 'PENDING', creationDate: new Date(), deadline: new Date() },
      { id: 6, title: 'Tarefa 6', description: 'Descrição 6', status: 'IN_PROGRESS', creationDate: new Date(), deadline: new Date() },
      { id: 7, title: 'Tarefa 7', description: 'Descrição 7', status: 'PENDING', creationDate: new Date(), deadline: new Date() },
      { id: 8, title: 'Tarefa 8', description: 'Descrição 8', status: 'IN_PROGRESS', creationDate: new Date(), deadline: new Date() },
      { id: 9, title: 'Tarefa 9', description: 'Descrição 9', status: 'PENDING', creationDate: new Date(), deadline: new Date() },
      { id: 10, title: 'Tarefa 10', description: 'Descrição 10', status: 'IN_PROGRESS', creationDate: new Date(), deadline: new Date() },
      { id: 11, title: 'Tarefa 11', description: 'Descrição 11', status: 'PENDING', creationDate: new Date(), deadline: new Date() },
      { id: 12, title: 'Tarefa 12', description: 'Descrição 12', status: 'IN_PROGRESS', creationDate: new Date(), deadline: new Date() },
      { id: 13, title: 'Tarefa 13', description: 'Descrição 13', status: 'PENDING', creationDate: new Date(), deadline: new Date() },
      { id: 14, title: 'Tarefa 14', description: 'Descrição 14', status: 'IN_PROGRESS', creationDate: new Date(), deadline: new Date() },
      { id: 15, title: 'Tarefa 15', description: 'Descrição 15', status: 'PENDING', creationDate: new Date(), deadline: new Date() },
      { id: 16, title: 'Tarefa 16', description: 'Descrição 16', status: 'IN_PROGRESS', creationDate: new Date(), deadline: new Date() },
      { id: 17, title: 'Tarefa 17', description: 'Descrição 17', status: 'COMPLETED', creationDate: new Date(), deadline: new Date() },
      { id: 18, title: 'Tarefa 18', description: 'Descrição 18', status: 'COMPLETED', creationDate: new Date(), deadline: new Date() },
      { id: 19, title: 'Tarefa 19', description: 'Descrição 19', status: 'COMPLETED', creationDate: new Date(), deadline: new Date() },
      { id: 20, title: 'Tarefa 20', description: 'Descrição 20', status: 'COMPLETED', creationDate: new Date(), deadline: new Date() },
      { id: 21, title: 'Tarefa 21', description: 'Descrição 21', status: 'COMPLETED', creationDate: new Date(), deadline: new Date() },
      { id: 22, title: 'Tarefa 22', description: 'Descrição 22', status: 'COMPLETED', creationDate: new Date(), deadline: new Date() },

      // Adicione mais tarefas...
    ];
    this.updatePagination();
  }

  applyFilter() {
    this.updatePagination();
  }

  // updatePagination() {
  // }

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

  // Método para atualizar a paginação
  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTasks = this.tasks.slice(startIndex, endIndex);
  }

  // Métodos para navegação na paginação
  goToNextPage() {
    if (this.currentPage * this.itemsPerPage < this.tasks.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }


  // ---------------------Modal de cadastro------------------------------

  newTask: any = {
    title: '',
    description: '',
    status: 'PENDING',
    deadline: ''
  };

  addTask() {
    const newTask = { ...this.newTask, id: this.tasks.length + 1, creationDate: new Date() };
    this.tasks.push(newTask);

    // Limpar o formulário
    this.newTask = {
      title: '',
      description: '',
      status: 'PENDING',
      deadline: ''
    };

    // Fechar o modal
    const modal = document.getElementById('taskModal');
    if (modal) {
      const bootstrapModal = bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal);
      bootstrapModal.hide();
    }
  }


  // ---------------------Modal de Editar------------------------------

    // Abrir modal de edição
  openEditModal(task: any) {
    this.selectedTask = { ...task }; // Cria uma cópia da tarefa selecionada
    const modalElement = document.getElementById('editTaskModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show(); // Exibe o modal de edição
    }
  }

  // Atualizar tarefa
  updateTask() {
    if (this.selectedTask) {
      const index = this.tasks.findIndex((task) => task.id === this.selectedTask.id);
      if (index > -1) {
        this.tasks[index] = { ...this.selectedTask }; // Atualiza a tarefa no array
      }

      // Fecha o modal após salvar
      const modalElement = document.getElementById('editTaskModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal?.hide(); // Fecha o modal
      }
    }
  }


  // ---------------------Modal de Excluir------------------------------

  // Abrir modal de exclusão
  openDeleteModal(taskId: number): void {
    this.deleteTaskId = taskId; // Armazena o id da tarefa que será excluída
    const modalElement = document.getElementById('deleteTaskModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show(); // Exibe o modal
    }
  }

  // Excluir tarefa
  deleteTask(taskId: number): void {
    if (taskId !== null) {
      // Encontre o índice da tarefa a ser excluída
      const index = this.tasks.findIndex((task) => task.id === taskId);
      if (index > -1) {
        // Remove a tarefa do array
        this.tasks.splice(index, 1);
      }
    }
  }
}
