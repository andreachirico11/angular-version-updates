import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { FirstStandaloneComponent } from './app/first-standalone/first-standalone.component';
import { bootstrapApplication } from '@angular/platform-browser';


  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
  // bootstrapApplication(FirstStandaloneComponent);
