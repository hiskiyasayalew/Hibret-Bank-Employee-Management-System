import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,RouterModule, HttpClientModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  roles: string[] = [];

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  ngOnInit() {
    // Initialize the form
    this.employeeForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{10}$')]], // 10-digit phone number validation
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });

    // Fetch roles from backend
    this.fetchRoles();
  }

  fetchRoles() {
    this.http.get<string[]>('/api/roles').subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  loginEmployee() {
    if (this.employeeForm.invalid) {
      alert('Please fill in all fields correctly.');
      return;
    }

    this.http.post('/api/employees/login', this.employeeForm.value).subscribe(
      (response) => {
        console.log('Login successful:', response);
        alert('Login successful');
      },
      (error) => {
        console.error('Login failed:', error);
        alert('Login failed');
      }
    );
  }
}
