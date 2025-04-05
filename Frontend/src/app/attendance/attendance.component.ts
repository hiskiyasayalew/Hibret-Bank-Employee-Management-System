import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Employee } from '../employee/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent implements OnInit {
  private http = inject(HttpClient);
  user = signal<Employee | null>(null);
  attendanceList: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('employee');

    if (userString) {
      try {
        const parsedUser = JSON.parse(userString);
        console.log("✅ User loaded from localStorage:", parsedUser);
        this.user.set(parsedUser);
      } catch (error) {
        console.error("❌ Error parsing user data:", error);
      }
    } else {
      console.warn("⚠️ No user found in localStorage!");
    }

    this.fetchAttendance();
  }

  fetchAttendance(): void {
    if (!this.user()) {
      console.warn("⚠️ fetchAttendance(): No user found.");
      return;
    }

    const userId = this.user()?.id;
    console.log(`📡 Fetching attendance for user ID: ${userId}`);

    this.http
      .get<any[]>(`http://localhost:8080/api/attendance/employee/${userId}`)
      .subscribe(
        (data) => {
          this.attendanceList = data;
        },
        (error) => console.error("❌ Error fetching attendance:", error)
      );
  }
navigateToAppeal(): void {
  this.router.navigate(['/appeal']);
}
  markAttendance(): void {
    if (!this.user()) {
      console.warn("⚠️ markAttendance(): No user found.");
      return;
    }

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    const requestBody = {
      employeeId: this.user()?.id,
      date: formattedDate,
      checkInTime: formattedTime,
      status: 'PRESENT',
    };

    console.log("📡 Sending attendance request:", requestBody);

    this.http
      .post<any>('http://localhost:8080/api/attendance/mark', requestBody)
      .subscribe(
        () => {
          alert('Attendance marked successfully!');
          this.fetchAttendance(); // Refresh attendance list after marking
        },
        (error) => console.error("❌ Error marking attendance:", error)
      );
  }

  logout(): void {
    alert("Have a good day!");
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}











