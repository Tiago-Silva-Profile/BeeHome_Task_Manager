import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.successMessage = '';
      this.errorMessage = '';

      this.http.post('http://localhost:8080/user', this.registerForm.value).subscribe({
        next: () => {
          this.successMessage = 'Usuário registrado com sucesso!';
          this.registerForm.reset();
        },
        error: () => {
          this.errorMessage = 'Erro ao registrar usuário!';
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

}
