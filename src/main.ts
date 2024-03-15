import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { ThirdStandaloneComponent } from './app/third-standalone/third-standalone.component';


  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  // bootstrapApplication(ThirdStandaloneComponent);
