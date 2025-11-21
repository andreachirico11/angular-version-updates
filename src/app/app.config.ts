import { ApplicationConfig, provideAppInitializer, provideEnvironmentInitializer, providePlatformInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAppInitializer(() => {
      console.log('app initialized');
    }),
    provideEnvironmentInitializer(() => {
      console.log('environment initialized');
    }),
    providePlatformInitializer(() => {
      console.log('platform initialized');
    }),
  ],
};
