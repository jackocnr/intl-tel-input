import 'zone.js';
import "@angular/compiler";
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './controlled-value.component';

bootstrapApplication(AppComponent)
  .catch((err) => console.error(err));
