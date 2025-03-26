import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Ensure this file exists and is correct
import { provideHttpClient } from '@angular/common/http'; // Import HttpClient provider
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // Provide HttpClient
    importProvidersFrom(ReactiveFormsModule) // Ensure reactive forms are available
  ]
}).catch(err => console.error(err));
