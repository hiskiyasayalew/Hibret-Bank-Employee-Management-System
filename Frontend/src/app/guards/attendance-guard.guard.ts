import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class attendanceGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('employees'); // or whatever key you use to store logged-in user
    if (user) {
      return true;
    } else {
      this.router.navigate(['/employee-login']); // redirect to login page
      return false;
    }
  }
}
