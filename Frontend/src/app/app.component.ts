import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component'; // Adjust the path as needed
import { RouterOutlet } from '@angular/router';
import { SignupComponent } from "./signup/signup.component";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet]
})
export class AppComponent {
  title = 'Angular-app';
}
