import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { AppealComponent } from './appeal/appeal.component';
import { AdminComponent } from './admin/admin.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AdminGuard } from './auth/admin.guard';
import { UserLandingComponent } from './user-landing/user-landing.component'; // Import the guard
import { UserAuthGuard } from './guards/user-auth.guard';
import { attendanceGuard } from './guards/attendance-guard.guard';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user-landing',
    component: UserLandingComponent,
  },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'employee', component: EmployeeComponent },
  {
    path: 'attendance',
    component: AttendanceComponent,
    canActivate: [UserAuthGuard]
  },
  {
    path: 'employee-login',
    component: EmployeeLoginComponent ,canActivate: [UserAuthGuard],
  },
  { path: 'appeal', component: AppealComponent,canActivate: [UserAuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] }, // Admin guard applied here
  { path: 'unauthorized', component: UnauthorizedComponent }, // Unauthorized route
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
