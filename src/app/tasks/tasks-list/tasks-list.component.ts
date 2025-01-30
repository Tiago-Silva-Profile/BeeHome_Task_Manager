import { Component } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task } from '../task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import bootstrap from 'bootstrap';

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
  paginatedTasks: Task[] = []; // Tarefas exibidas na página atual
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filterStatus: string = '';
  currentPage: number = 1; // Página atual
  errorMessage: string = ''; // Armazena erros da API
  deleteTaskId: any = null;
  selectedTask: any = this.paginatedTasks;

  constructor(private taskService: TasksService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    // Dados mockados com a propriedade correta "creationDate"
    const mockTasks: Task[] = [
      {
        id: '1a2b3c4d-5678-9101-1121-314151617181',
        title: 'Implementar autenticação JWT',
        description: 'Adicionar autenticação segura usando JSON Web Token (JWT).',
        status: 'IN_PROGRESS',
        deadline: new Date('2025-02-15'),
        creationDate: new Date('2025-01-28T10:00:00.000+00:00'),
      },
      {
        id: '2b3c4d5e-6789-1011-1213-415161718192',
        title: 'Criar layout responsivo',
        description: 'Ajustar o design para dispositivos móveis.',
        status: 'PENDING',
        deadline: new Date('2025-03-01'),
        creationDate: new Date('2025-01-29T14:30:00.000+00:00'),
      },
      {
        id: '3c4d5e6f-7890-1112-1314-516171819202',
        title: 'Melhorar performance da API',
        description: 'Otimizar consultas ao banco de dados para melhorar tempo de resposta.',
        status: 'COMPLETED',
        deadline: new Date('2025-01-31'),
        creationDate: new Date('2025-01-20T08:45:00.000+00:00'),
      },
      {
        id: '4d5e6f7g-8901-1213-1415-617181920212',
        title: 'Criar documentação OpenAPI',
        description: 'Gerar documentação para os endpoints usando Swagger.',
        status: 'IN_PROGRESS',
        deadline: new Date('2025-02-10'),
        creationDate: new Date('2025-01-25T16:20:00.000+00:00'),
      },
      {
        id: '5e6f7g8h-9012-1314-1516-718192021222',
        title: 'Refatorar código do frontend',
        description: 'Organizar componentes e melhorar reutilização de código.',
        status: 'PENDING',
        deadline: new Date('2025-02-20'),
        creationDate: new Date('2025-01-27T09:10:00.000+00:00'),
      }
    ];

    // Simulando a resposta do serviço
    this.tasks = mockTasks;
    this.applyFilter();
  }
  // // Método para carregar todas as tarefas
  // loadTasks() {
  //   this.taskService.getAllTasks().subscribe({
  //     next: (tasks) => {
  //       this.tasks = tasks;
  //       this.applyFilter();
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       console.error('Erro ao carregar tarefas:', error);
  //       this.errorMessage = 'Falha ao carregar tarefas. Tente novamente mais tarde.';
  //     }
  //   });
  // }

  // Aplica filtro por status
  applyFilter() {
    this.filteredTasks = this.filterStatus
      ? this.tasks.filter(task => task.status === this.filterStatus)
      : this.tasks;

    this.currentPage = 1; // Reseta para a primeira página ao filtrar
    this.updatePagination();
  }

  // Atualiza a paginação
  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTasks = this.filteredTasks.slice(startIndex, endIndex);
  }

  // Navegação - Página Anterior
  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  // Navegação - Próxima Página
  goToNextPage() {
    if (this.currentPage * this.itemsPerPage < this.filteredTasks.length) {
      this.currentPage++;
      this.updatePagination();
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
      this.updatePagination();
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
        this.updatePagination();
      }

}
