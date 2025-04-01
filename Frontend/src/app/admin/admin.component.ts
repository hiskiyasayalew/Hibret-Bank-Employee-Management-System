import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  imports: [CommonModule],
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  appeals: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchAppeals();
  }

  fetchAppeals() {
    this.http.get<any[]>('http://localhost:8080/api/appeals').subscribe(
      (data) => {
        this.appeals = data;
      },
      (error) => {
        console.error('Error fetching appeals:', error);
      }
    );
  }

  updateStatus(appealId: number, status: string) {
    this.http.put(`http://localhost:8080/api/appeals/update/${appealId}?status=${status}`, {})
      .subscribe(
        () => {
          alert(`Appeal ${status.toLowerCase()} successfully!`);
          this.fetchAppeals(); // Refresh the list
        },
        (error) => {
          console.error('Error updating appeal status:', error);
        }
      );
  }

  logout() {
    localStorage.removeItem('role'); // Clear role
    this.router.navigate(['/login']); // Redirect to login
  }
}
