import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EmployeeLoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const employee = localStorage.getItem('employee') ?? '';
    const status = localStorage.getItem('status') ?? '';

    console.log('Employee login guard');
    console.log(employee, status);
    console.log('End Employee login guard');

    if (employee !== '' && status === 'Login successful') {
      // this.router.navigate(['/attendance']);
      return false;
    } else {
      // this.router.navigate(['/employee-login']);
      return true;
    }
  }
}
