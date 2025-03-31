import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Adjust the path as necessary
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Employee } from '../employee/employee.model';
@Component({
  selector: 'app-employee-login',
  standalone: true,
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
})
export class EmployeeLoginComponent {
  employeeLoginForm: FormGroup;
  errorMessage: string = '';

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  constructor() {
    this.employeeLoginForm = this.fb.group({
      firstName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
    });
  }

  login() {
    if (this.employeeLoginForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly!';
      return;
    }

    const { firstName, phoneNumber } = this.employeeLoginForm.value;
    console.log('Attempting to validate employee:', { firstName, phoneNumber });

    type EmployeeResponse = {
      message: string;
    };
    // Call to validateEmployee
    this.authService.validateEmployee(firstName, phoneNumber).subscribe(
      (response) => {
        console.log('Validation response:', response);
        let employee: Employee | EmployeeResponse;
        employee = response;
        if (employee !== null && employee) {
          localStorage.setItem('user', JSON.stringify(employee));
          this.router.navigateByUrl('/attendance');
        } else {
          this.errorMessage = 'Invalid employee details. Please try again.';
        }
        // if (response === 'Employee found') {
        //     this.router.navigate(['/attendance']);
        // } else {
        //     this.errorMessage = 'Invalid employee details. Please try again.';
        // }
      },
      (error) => {
        console.error('Error validating employee:', error);
        this.errorMessage = 'Invalid employee details. Please try again.';
      }
    );
  }
}
