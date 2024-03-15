import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StaticFalseComponent } from './static-false/static-false.component';
import { StaticTrueComponent } from './static-true/static-true.component';

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
        // loadChildren: "./old-style/old-style.module#OldStyleModule"
        loadChildren: () => import("./old-style/old-style.module").then(m=> m.OldStyleModule)

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
