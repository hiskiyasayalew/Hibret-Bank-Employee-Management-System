import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
      firstName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
    });
  }

  employeelogin(): void {
    if (this.employeeLoginForm.invalid) {
      this.errorMessage = 'Please enter valid credentials!';
      return;
    }

    const { firstName, phoneNumber } = this.employeeLoginForm.value;

    this.authService.employeelogin(firstName, phoneNumber).subscribe({
      next: (employee) => {
        if (!employee || !employee.firstName || !employee.phoneNumber) {
          this.errorMessage = 'Invalid login response!';
          return;
        }

        // Store employee data in localStorage
        localStorage.setItem('employee', JSON.stringify(employee));

        // Navigate to attendance for all employees
        this.router.navigate(['/attendance']);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = err?.error?.message || 'Login failed!';
      },
    });
  }
}
