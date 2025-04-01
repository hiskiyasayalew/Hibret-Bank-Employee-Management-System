import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      department: ['', Validators.required],
      position: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      hireDate: ['', Validators.required],
      status: ['ACTIVE', Validators.required],
    });
  }

  registerEmployee() {
    if (this.employeeForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly!';
      return;
    }

    this.authService.saveEmployee(this.employeeForm.value).subscribe({
      next: (response) => {
        console.log('Employee registered:', response);
        this.successMessage = 'Employee Registered Successfully!';
        this.errorMessage = '';

        this.employeeForm.reset();
        this.employeeForm.patchValue({ status: 'ACTIVE' }); // Keep status ACTIVE

        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/']); // Redirect after success
        }, 2000);
      },
      error: (error) => {
        console.error('Error registering employee:', error);
        this.errorMessage = error?.error?.message || 'Failed to register employee!';
      },
    });
  }
}
