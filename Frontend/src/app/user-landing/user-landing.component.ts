import { Component } from '@angular/core';

@Component({
  selector: 'app-user-landing',
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.css'],
})
export class UserLandingComponent {
  currentSlide = 0;
  slides = ['assets/image1.jpg', 'assets/image2.jpg', 'assets/image3.jpg'];

  changeSlide(direction: number) {
    this.currentSlide =
      (this.currentSlide + direction + this.slides.length) % this.slides.length;
  }

  autoSlide() {
    setInterval(() => {
      this.changeSlide(1);
    }, 5000);
  }

  ngOnInit() {
    this.autoSlide();
  }
}
