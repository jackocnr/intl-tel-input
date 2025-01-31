import 'zone.js';
import "@angular/compiler";
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './simple.component';

bootstrapApplication(AppComponent)
  .catch((err) => console.error(err));