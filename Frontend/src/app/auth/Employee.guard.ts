import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EmployeeGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const employee = localStorage.getItem('employee') ?? '';
    const status = localStorage.getItem('status') ?? '';

    console.log(employee, status);

    if (employee !== '' && status === 'Login successful') {
      return true;
    } else {
      this.router.navigate(['/employee-login']);
      return false;
    }
  }
}
