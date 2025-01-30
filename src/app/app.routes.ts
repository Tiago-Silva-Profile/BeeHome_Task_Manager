import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { TasksEditComponent } from './tasks/tasks-edit/tasks-edit.component';
import { TasksDeleteComponent } from './tasks/tasks-delete/tasks-delete.component';
import { Routes } from '@angular/router';
import { TasksFormComponent } from './tasks/tasks-form/tasks-form.component';
import { TasksCreateComponent } from './tasks/tasks-create/tasks-create.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TasksListComponent }, // Rota para listar tarefas
  { path: 'task/create', component: TasksCreateComponent }, // Rota para criar nova tarefa
  { path: 'task/edit/:id', component: TasksEditComponent }, // Rota para editar tarefa (id como parâmetro)
  { path: 'task/delete/:id', component: TasksDeleteComponent }, // Rota para excluir tarefa (id como parâmetro)
  { path: '**', redirectTo: '/login' },
 ];
