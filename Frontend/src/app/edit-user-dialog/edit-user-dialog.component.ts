import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  template: `
    <h1 mat-dialog-title>Edit User</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <input matInput placeholder="Username" [(ngModel)]="user.userName" required />
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Email" [(ngModel)]="user.email" required />
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Password" [(ngModel)]="user.password" type="password" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button (click)="onUpdate()">Update</button>
    </div>
  `,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
  ]
})
export class EditUserDialogComponent {
  user: any;

  constructor(
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private http: HttpClient
  ) {
    this.user = { ...data }; // Clone the user data for editing
  }

  onUpdate() {
    const updatedUser = {
      userName: this.user.userName,
      email: this.user.email,
      password: this.user.password
    };

    this.http.put(`http://localhost:8080/users/${this.user.id}`, updatedUser).subscribe(
      () => this.dialogRef.close(true),
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }


  onCancel() {
    this.dialogRef.close();
  }
}
