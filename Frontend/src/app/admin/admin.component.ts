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
import { CreateEmployeeDialogComponent } from '../create-employee-dialog/create-employee-dialog.component';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog/edit-employee-dialog.component';

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
    MatInputModule,
  ],
})
export class AdminComponent implements OnInit {
  attendanceData: any[] = [];
  appeals: any[] = [];
  users: any[] = [];
  filteredUsers: any[] = [];
  employees: any[] = [];
  filteredEmployees: any[] = []; // Add filtered employees array
  displayedColumns: string[] = ['name', 'date', 'status'];
  selectedTab: string = '/admin/attendance';
  searchTerm: string = '';
  employeeSearchTerm: string = ''; // Add search term for employees

  navLinks = [
    { path: '/admin/attendance', label: 'Attendance' },
    { path: '/admin/users', label: 'Users' },
    { path: '/admin/appeal', label: 'Appeal' },
    { path: '/admin/employee', label: 'Employee' },
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadAttendance();
    this.fetchAppeals();
    this.fetchUsers();
    this.fetchEmployees();
  }

  // Loads attendance data
  loadAttendance() {
    this.http.get<any[]>('http://localhost:8080/api/attendance/all').subscribe({
      next: (data) => {
        this.attendanceData = data.map((item) => ({
          name: `${item.firstName} ${item.lastName}`,
          date: item.date,
          status: item.status,
        }));
      },
      error: (err) => {
        console.error('Error fetching attendance:', err);
      },
    });
  }

  // Fetches all appeals
  fetchAppeals() {
    this.http.get<any[]>('http://localhost:8080/api/appeals/all').subscribe(
      (data) => {
        this.appeals = data;
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

  // Fetch all employees
  fetchEmployees() {
    this.http.get<any[]>('http://localhost:8080/api/employees/all').subscribe(
      (data) => {
        this.employees = data;
        this.filteredEmployees = data; // Initialize filteredEmployees
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  // Search users
  searchUsers() {
    this.filteredUsers = this.users.filter((user) =>
      user.userName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Search employees
  searchEmployees() {
    if (this.employeeSearchTerm.trim() === '') {
      this.filteredEmployees = this.employees; // If no search term, reset to all employees
    } else {
      this.filteredEmployees = this.employees.filter(
        (emp) =>
          emp.firstName
            .toLowerCase()
            .includes(this.employeeSearchTerm.toLowerCase()) ||
          emp.lastName
            .toLowerCase()
            .includes(this.employeeSearchTerm.toLowerCase()) ||
          emp.phoneNumber
            .toLowerCase()
            .includes(this.employeeSearchTerm.toLowerCase())
      );
    }
  }

  // Updates appeal status
  updateStatus(appealId: number, status: string) {
    this.http
      .put(
        `http://localhost:8080/api/appeals/update-status/${appealId}?status=${status}`,
        {}
      )
      .subscribe(
        () => {
          alert(`Appeal ${status.toLowerCase()} successfully!`);
          this.fetchAppeals();
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
    } else if (path === '/admin/employee') {
      this.fetchEmployees();
    }
  }

  // Highlight active tab
  isActiveTab(path: string): boolean {
    return this.selectedTab === path;
  }

  // Logout
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // Open create user dialog
  openCreateUserDialog() {
    const dialogRef = this.dialog.open(CreateUserDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchUsers();
      }
    });
  }

  // Open edit user dialog
  openEditUserDialog(user: any) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, { data: user });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchUsers();
      }
    });
  }

  // Delete a user
  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http
        .delete(`http://localhost:8080/users/delete/${userId}`)
        .subscribe(
          () => {
            alert('User deleted successfully!');
            this.fetchUsers();
          },
          (error) => {
            console.error('Error deleting user:', error);
          }
        );
    }
  }

  // Delete employee
  deleteEmployee(employeeId: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.http
        .delete(`http://localhost:8080/api/employees/delete/${employeeId}`)
        .subscribe(
          () => {
            alert('Employee deleted successfully!');
            this.fetchEmployees();
          },
          (error) => {
            console.error('Error deleting employee:', error);
          }
        );
    }
  }
  openCreateEmployeeDialog() {
    const dialogRef = this.dialog.open(CreateEmployeeDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchEmployees(); // Refresh the employee list after creation
      }
    });
  }
  openEditEmployeeDialog(employee: any) {
    const dialogRef = this.dialog.open(EditEmployeeDialogComponent, {
      data: employee, // Pass the employee data to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchEmployees(); // Refresh employee list after update
      }
    });
  }
}
