import { Component } from '@angular/core';
import { TasksService } from '../tasks.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks-delete',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './tasks-delete.component.html',
  styleUrl: './tasks-delete.component.css'
})
export class TasksDeleteComponent {

  tasks: any[] = [];
  taskId: number | null = null;
  selectedTask: any;  // Tarefa selecionada para exclusão
  isDeleteModalVisible = false;  // Controle de visibilidade do modal


 // Injetando o TaskService no construtor
 constructor(private taskService: TasksService) {}

 // Método para abrir o modal de exclusão e definir a tarefa
 openDeleteModal(task: any) {
  this.selectedTask = task;  // Define a tarefa a ser excluída
  this.isDeleteModalVisible = true;  // Exibe o modal
}

// Método para fechar o modal
closeDeleteModal() {
  this.isDeleteModalVisible = false;  // Fecha o modal
}

 // Método para excluir a tarefa
 deleteTask(taskId: number): void  {
  if (taskId !== null) {
    // Chama o serviço para excluir a tarefa no backend
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        // Se a exclusão for bem-sucedida, remove a tarefa do array local
        const index = this.tasks.findIndex((task) => task.id === taskId);
        if (index > -1) {
          this.tasks.splice(index, 1); // Remove a tarefa do array
        }

        // Fecha o modal após a exclusão
        this.closeDeleteModal();

        // Atualiza a paginação (se necessário)
        this.updatePagination();
      },
      (error) => {
        console.error('Erro ao excluir a tarefa', error);
        // Você pode adicionar um tratamento de erro aqui, como exibir uma mensagem para o usuário
      }
    );
  }
 }

 // Método para atualizar a paginação (opcional, dependendo da lógica)
 updatePagination() {
   // Aqui você pode implementar a lógica de paginação, se necessário
 }

}
