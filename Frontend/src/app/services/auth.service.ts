import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/users'; // Base API URL

  constructor(private http: HttpClient) {}

  // Function to send login request
  login(userName: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { userName, password });
  }
}