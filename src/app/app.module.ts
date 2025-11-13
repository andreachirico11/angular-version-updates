import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, TitleStrategy } from '@angular/router';
import { routes } from './app.routes';
import { TemplatePageTitleStrategy } from './titleStrategy';
import { Page1Component } from './page1/page1.component';

@NgModule({
  declarations: [
    AppComponent, Page1Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{provide: TitleStrategy,  useClass: TemplatePageTitleStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
