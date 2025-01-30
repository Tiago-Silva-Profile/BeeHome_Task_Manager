import { Component, Input } from '@angular/core';
import { TasksService } from '../tasks.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../task.model';


@Component({
  selector: 'app-tasks-edit',
  imports: [
    FormsModule,
    CommonModule,

  ],
  templateUrl: './tasks-edit.component.html',
  styleUrl: './tasks-edit.component.css'
})
export class TasksEditComponent {

  tasks: any[] = [];
  paginatedTasks: any[] = []; // Tarefas exibidas na página atual
  selectedTask: any = this.paginatedTasks;
  isEditModalVisible = false;

  @Input() task: Task | undefined;

  constructor(private taskService: TasksService) {}

  updateTask() {
    if (this.selectedTask) {
      // Chama o serviço para atualizar a tarefa na API
      this.taskService.updateTask(this.selectedTask).subscribe(
        (updatedTask) => {
          // Atualiza a tarefa no array com a resposta do servidor
          const index = this.tasks.findIndex(task => task.id === updatedTask.id);
          if (index > -1) {
            this.tasks[index] = { ...updatedTask };
          }

          // Fecha o modal após salvar
          this.closeEditModal();  // Utiliza o método para fechar o modal
        },
        (error) => {
          console.error('Erro ao atualizar a tarefa', error);
          // Você pode adicionar um tratamento de erro aqui, como exibir uma mensagem para o usuário
        }
      );
    }
  }

  // Método para abrir o modal e carregar a tarefa selecionada
  openEditModal(task: any) {
    this.selectedTask = { ...task }; // Clona a tarefa para edição
    this.isEditModalVisible = true;  // Exibe o modal
  }

  // Método para fechar o modal
  closeEditModal() {
    this.isEditModalVisible = false;  // Fecha o modal
  }


}
