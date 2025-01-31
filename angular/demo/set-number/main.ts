import 'zone.js';
import "@angular/compiler";
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './set-number.component';

bootstrapApplication(AppComponent)
  .catch((err) => console.error(err));