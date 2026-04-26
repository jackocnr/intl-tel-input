import 'zone.js';
import "@angular/compiler";
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './validation.component';

bootstrapApplication(AppComponent)
  .catch((err) => console.error(err));