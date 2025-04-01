import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  styleUrls: ['./employee-login.component.css'],
})
export class EmployeeLoginComponent implements OnInit {
  employeeLoginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeLoginForm = this.fb.group({
      firstName: ['', Validators.required], // Using firstName instead of password
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
    });
  }

  login(): void {
    if (this.employeeLoginForm.invalid) {
      this.errorMessage = 'Please enter valid credentials!';
      return;
    }

    const { firstName, phoneNumber } = this.employeeLoginForm.value;

    console.log('Attempting login with:', { firstName, phoneNumber }); // Debugging

    this.authService.login(firstName, phoneNumber).subscribe({
      next: (response) => {
        console.log('Login response:', response); // Debugging

        if (!response || !response.token) {
          this.errorMessage = 'Invalid login response!';
          return;
        }

        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/attendance']);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = error?.error?.message || 'Login failed!';
      },
    });
  }
}
