import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  router: any;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (response: any) => {
          console.log('Login bem-sucedido:', response);
          // Aqui você pode armazenar o token e redirecionar o usuário
        },
        error: (error: any) => {
          this.errorMessage = 'Falha ao fazer login. Verifique suas credenciais!';
          console.error('Erro:', error);
        }
      });
    }
  }

  // navigateToRegister() {
  //   this.router.navigate(['/register']); // Redireciona para a tela de registro
  // }

}
