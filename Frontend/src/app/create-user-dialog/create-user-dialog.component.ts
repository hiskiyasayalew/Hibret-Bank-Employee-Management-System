import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // ✅ Added this

@Component({
  selector: 'app-create-user-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Create User</h2>
    <div mat-dialog-content class="dialog-form">
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Username</mat-label>
        <input
          matInput
          placeholder="Enter username"
          [(ngModel)]="user.userName"
          required
        />
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Email</mat-label>
        <input
          matInput
          type="email"
          placeholder="Enter email"
          [(ngModel)]="user.email"
          required
        />
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Role</mat-label>
        <mat-select [(ngModel)]="user.role" name="role" required>
          <mat-option value="ADMIN">ADMIN</mat-option>
          <mat-option value="EMPLOYEE">EMPLOYEE</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Password</mat-label>
        <input
          matInput
          type="password"
          placeholder="Enter password"
          [(ngModel)]="user.password"
          required
        />
      </mat-form-field>
    </div>

    <div mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button
        mat-raised-button
        color="primary"
        (click)="onCreate()"
        [disabled]="!isFormValid()"
      >
        Create
      </button>
    </div>
  `,
  styles: [
    `
      .dialog-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding-top: 8px;
      }
      .full-width {
        width: 100%;
      }
    `,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule, // ✅ Imported here
  ],
})
export class CreateUserDialogComponent {
  user = {
    userName: '',
    email: '',
    role: '',
    password: '',
  };

  constructor(
    private dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private http: HttpClient
  ) {}

  onCreate() {
    this.http.post('http://localhost:8080/users/new', this.user).subscribe(
      () => this.dialogRef.close(true),
      (error) => console.error('Error creating user:', error)
    );
  }

  onCancel() {
    this.dialogRef.close();
  }

  isFormValid(): boolean {
    const { userName, email, role, password } = this.user;
    return !!(userName && email && role && password);
  }
}
