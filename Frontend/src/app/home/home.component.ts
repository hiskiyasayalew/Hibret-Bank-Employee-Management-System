import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, RouterModule],
})
export class HomeComponent {
  isActive = false; // Initialize the isActive property

  toggleMenu() {
    this.isActive = !this.isActive;
  }
}
