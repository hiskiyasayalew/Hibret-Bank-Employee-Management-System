import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule] // Include ReactiveFormsModule
})
export class LoginComponent {
  loginForm: FormGroup;
  router: any;

  constructor(private fb: FormBuilder) {
    // Initialize the form
    this.loginForm = this.fb.group({
      username: ['', Validators.required], // Define the username control
      password: ['', Validators.required]    // Define the password control
    });
  }

  onSubmit() {
    console.log("Logged in", this.loginForm.value);
    this.router.navigate(['/home']);
  }

}
