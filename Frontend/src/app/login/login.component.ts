import { Component } from '@angular/core';
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required], // Changed from username to userName to match DTO
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { userName, password } = this.loginForm.value; // Now it matches DTO

      this.authService.login(userName, password).subscribe({
        next: (response) => {
          console.log('Login Successful', response);
          localStorage.setItem('status', response.message);
          this.router.navigate(['/home']); // Redirect on success
        },
        error: (error) => {
          console.error('Login Failed:', error);
          this.errorMessage = 'Invalid username or password!';
        },
      });
    }
  }
}
