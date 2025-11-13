import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ModalCompComponent } from './modal-comp/modal-comp.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  // entryComponents: [ModalCompComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
