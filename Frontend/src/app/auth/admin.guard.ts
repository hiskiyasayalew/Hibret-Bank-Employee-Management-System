import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userRole = localStorage.getItem('userRole'); // Retrieve role from localStorage

    if (userRole === 'admin') {
      return true; // Allow access if the user is admin
    } else {
      this.router.navigate(['/unauthorized']); // Redirect to unauthorized page
      return false;
    }
  }
}
