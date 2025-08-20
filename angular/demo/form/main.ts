import 'zone.js';
import "@angular/compiler";
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './form.component';

bootstrapApplication(AppComponent)
  .catch((err) => console.error(err));