import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

import { Employee } from '../employee/employee.model';
@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  // Inject FormBuilder and AuthService
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {}

  ngOnInit() {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      department: [''],
      position: [''],
      salary: [''],
      hireDate: [''],
      status: ['ACTIVE', Validators.required] ,
    });
  }

  registerEmployee() {
    if (this.employeeForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly!';
      return;
    }

    this.authService.saveEmployee(this.employeeForm.value).subscribe(
      (response) => {
        this.successMessage = 'Employee Registered Successfully!';
        this.errorMessage = '';
        this.employeeForm.reset();
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/employee-login']);
        }, 2000);
      },
      (error) => {
        console.error('Error:', error);
        this.errorMessage = 'Failed to register employee!';
      }
    );
  }
}
