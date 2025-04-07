// Create Employee Dialog Component
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-employee-dialog',
  standalone: true,
  templateUrl: './create-employee-dialog.component.html',
  styleUrls: ['./create-employee-dialog.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class CreateEmployeeDialogComponent {
  employee = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    department: '',
    position: '',
    salary: 0,
    hireDate: '',
    status: 'ACTIVE',
  };

  constructor(
    public dialogRef: MatDialogRef<CreateEmployeeDialogComponent>,
    private http: HttpClient
  ) {}

  // Method to create an employee
  createEmployee() {
    this.http
      .post('http://localhost:8080/api/employees/save', this.employee)
      .subscribe(
        () => {
          alert('Employee created successfully!');
          this.dialogRef.close(true); // Notify that the employee was created
        },
        (error) => {
          console.error('Error creating employee:', error);
          alert('Error creating employee.');
        }
      );
  }

  // Close the dialog without doing anything
  onCancel(): void {
    this.dialogRef.close();
  }
}
