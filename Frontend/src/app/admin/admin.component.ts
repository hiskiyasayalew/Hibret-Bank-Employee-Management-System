import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

// Angular Material modules
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Dialog components
import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AdminComponent implements OnInit {
  attendanceData: any[] = [];
  appeals: any[] = [];
  users: any[] = [];
  filteredUsers: any[] = [];
  displayedColumns: string[] = ['name', 'date', 'status'];
  selectedTab: string = '/admin/attendance';
  searchTerm: string = '';

  navLinks = [
    { path: '/admin/attendance', label: 'Attendance' },
    { path: '/admin/users', label: 'Users' },
    { path: '/admin/appeal', label: 'Appeal' },
    { path: '/admin/employee', label: 'Employee' },
    { path: '/admin/dashboard', label: 'Dashboard' }
  ];

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadAttendance();
    this.fetchAppeals();
    this.fetchUsers();
  }

  // Loads attendance data
  loadAttendance() {
    this.http.get<any[]>('http://localhost:8080/api/attendance/all')
      .subscribe({
        next: (data) => {
          this.attendanceData = data.map(item => ({
            name: `${item.firstName} ${item.lastName}`,
            date: item.date,
            status: item.status
          }));
        },
        error: (err) => {
          console.error('Error fetching attendance:', err);
        }
      });
  }

  // Fetches all appeals
  fetchAppeals() {
    this.http.get<any[]>('http://localhost:8080/api/appeals/all').subscribe(
      (data) => {
        this.appeals = data.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          status: item.status,
          createdAt: item.createdAt
        }));
      },
      (error) => {
        console.error('Error fetching appeals:', error);
      }
    );
  }

  // Fetch all users
  fetchUsers() {
    this.http.get<any[]>('http://localhost:8080/users/all').subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // Search users by username
  searchUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.userName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Updates appeal status
  updateStatus(appealId: number, status: string) {
    this.http.put(`http://localhost:8080/api/appeals/update-status/${appealId}?status=${status}`, {})
      .subscribe(
        () => {
          alert(`Appeal ${status.toLowerCase()} successfully!`);
          this.fetchAppeals(); // Refresh after update
        },
        (error) => {
          console.error('Error updating appeal status:', error);
        }
      );
  }

  // Tab selection
  setTab(path: string) {
    this.selectedTab = path;

    if (path === '/admin/attendance') {
      this.loadAttendance();
    } else if (path === '/admin/appeal') {
      this.fetchAppeals();
    } else if (path === '/admin/users') {
      this.fetchUsers();
    }
  }

  // Used in template for tab highlighting
  isActiveTab(path: string): boolean {
    return this.selectedTab === path;
  }

  // Logout
  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

  // Open dialog to create a new user
  openCreateUserDialog() {
    const dialogRef = this.dialog.open(CreateUserDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchUsers(); // Refresh user list
      }
    });
  }

  // Open dialog to edit a user
  openEditUserDialog(user: any) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, { data: user });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchUsers(); // Refresh user list
      }
    });
  }

  // Delete a user
  deleteUser(userId: number) {
    this.http.delete(`http://localhost:8080/users/${userId}`).subscribe(
      () => {
        alert('User deleted successfully!');
        this.fetchUsers(); // Refresh user list
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
}
