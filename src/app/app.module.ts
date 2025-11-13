import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StaticFalseComponent } from './static-false.component';
import { StaticTrueComponent } from './static-true.component';

@NgModule({
  declarations: [
    AppComponent,
    StaticFalseComponent,
    StaticTrueComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'o',
        loadChildren: "./old-style/old-style.module#OldStyleModule"
      },
      {
        path: 'n',
        loadChildren: () => import("./new-style/new-style.module").then(m=> m.NewStyleModule)
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
