import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FirstStandaloneComponent } from './first-standalone/first-standalone.component';
import { RouterModule } from '@angular/router';
import { ColorDirective } from './color.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ColorDirective,
    FirstStandaloneComponent,
    RouterModule.forRoot([
      {
        path: 'carouselOld',
        loadComponent: () =>
          import('./carousel/old/carousel.component').then(
            ({CarouselComponent}) => CarouselComponent
          ),
      },
      {
        path: 'carouselNew',
        loadComponent: () =>
          import('./carousel/new/carousel.component').then(
            ({CarouselComponent}) => CarouselComponent
          ),
      },
      {
        path: 'classic',
        // old lazy loaded module are still supported
        loadChildren: () =>
          import('./classic-compo/classic-module.module').then(
            ({ClassicModuleModule}) => ClassicModuleModule
          ),
      },
      {
        path: 'second',
        title: 'Second',
        // will be loaded as a module
        loadComponent: () =>
          import('./second-standalone/second-standalone.component').then(
            ({SecondStandaloneComponent}) => SecondStandaloneComponent
          ),
      },
      {
        path: '',
        title: 'HOME',
        component: FirstStandaloneComponent
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
