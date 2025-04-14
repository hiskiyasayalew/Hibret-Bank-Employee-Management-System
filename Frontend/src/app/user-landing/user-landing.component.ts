import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-landing',
  templateUrl: './user-landing.component.html',
  standalone: true,
  styleUrls: ['./user-landing.component.css'],
  imports:[CommonModule,RouterModule],
})
export class UserLandingComponent {

}
