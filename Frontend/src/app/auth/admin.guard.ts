import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { User } from '../login/login.component';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user: string = localStorage.getItem('user') ?? '';

    if (user) {
      try {
        const rUser: User = JSON.parse(user);
        if (rUser && rUser.role.toLowerCase() === 'admin') {
          return true;
        } else {
          this.router.navigate(['/unauthorized']);
          return false;
        }
      } catch (err) {
        console.log(err);
        return false;
      }
    } else {
      return false;
    }
  }
}
