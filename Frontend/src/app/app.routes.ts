import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component'; // Import EmployeeComponent
import { AttendanceComponent } from './attendance/attendance.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'employee-login', component: EmployeeLoginComponent },
];
