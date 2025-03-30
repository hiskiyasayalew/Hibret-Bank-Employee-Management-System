import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../employee/employee.model'; // Ensure that Employee model exists

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userApiUrl = 'http://localhost:8080/users'; // Base API URL for user-related actions
  private employeeApiUrl = 'http://localhost:8080/api/employees'; // Base API URL for employee-related actions

  constructor(private http: HttpClient) {}

  // Function to send login request
  login(userName: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.userApiUrl}/login`, { userName, password });
  }

  // Function to send signup request
  signup(user: { userName: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.userApiUrl}/new`, user);
  }

  // Save or register employee
  saveEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.employeeApiUrl}/save`, employee); // Correct endpoint for saving employee
  }

  // Fetch roles from the backend (optional, remove if unnecessary)
  getRoles(): Observable<string[]> {
    return this.http.get<string[]>('/api/roles'); // Adjust the roles endpoint if needed
  }

  // Validate employee
  validateEmployee(firstName: string, phoneNumber: string): Observable<any> {
    return this.http.post<any>(`${this.employeeApiUrl}/validate`, { firstName, phoneNumber });
}
}
