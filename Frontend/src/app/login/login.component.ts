import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

export type User = {
  id: number;
  userName: string;
  password: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYEE'; // Adjust roles as necessary
  createdAt: string; // Alternatively, use Date if you want to parse it
};

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  user = signal<User | null>(null);

  authService = inject(AuthService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { userName, password } = this.loginForm.value;

      this.authService.login(userName, password).subscribe({
        next: (response: User) => {
          console.log('Login Successful', response);
          this.user.set(response);

          // Save login status in localStorage or sessionStorage if needed
          localStorage.setItem('loggedInUser', userName);
          localStorage.setItem('user', JSON.stringify(response));

          // Redirect based on role
          if (this.user()?.role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/user-landing']);
          }
        },
        error: (error) => {
          console.error('Login Failed:', error);
          this.errorMessage = 'Invalid username or password!';
        },
      });
    }
  }
}
