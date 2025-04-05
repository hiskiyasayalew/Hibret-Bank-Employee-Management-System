import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  navLinks = [
    { path: '/attendance', label: 'Attendance' },
    { path: '/users', label: 'Users' },
    { path: '/appeal', label: 'Appeal' },
    { path: '/employee', label: 'Employee' },
    { path: '/dashboard', label: 'Dashboard' },
  ];

  activeLink = this.navLinks[0].path;

  displayedColumns: string[] = ['name', 'date', 'action'];
  dataSource = new MatTableDataSource([
    { name: 'Amanuel', date: '27/11/2025' },
    { name: 'Amanuel', date: '27/11/2025' },
    { name: 'Amanuel', date: '27/11/2025' },
  ]);

  delete(row: any) {
    this.dataSource.data = this.dataSource.data.filter(item => item !== row);
  }
}
