import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-employee-dialog',
  standalone: true,
  templateUrl: './edit-employee-dialog.component.html',
  styleUrls: ['./edit-employee-dialog.component.css'],
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
export class EditEmployeeDialogComponent {
  employee: any;

  constructor(
    public dialogRef: MatDialogRef<EditEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    // Ensure that 'data' contains the employee object with an ID
    this.employee = { ...data };

    // Log the employee to verify that it has the correct ID
    console.log('Editing employee:', this.employee);
  }

  // Method to update the employee details
  updateEmployee() {
    // Check if the employee ID is defined
    if (!this.employee.id) {
      alert('Employee ID is missing. Cannot update employee.');
      return;
    }

    this.http
      .put(
        `http://localhost:8080/api/employees/update/${this.employee.id}`,
        this.employee
      )
      .subscribe(
        () => {
          alert('Employee updated successfully!');
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error updating employee:', error);
          alert('Error updating employee.');
        }
      );
  }

  // Close the dialog without doing anything
  onCancel(): void {
    this.dialogRef.close();
  }
}
