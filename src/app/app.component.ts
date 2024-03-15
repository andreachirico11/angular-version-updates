import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalCompComponent } from './modal-comp/modal-comp.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  commentingThisCausesError = "Now the compiler detects template variables which doesn't exists in the model"
  @ViewChild('modalContainer', {read: ViewContainerRef}) modalContainer!: ViewContainerRef;

  private isOpen = false;

  constructor() {}


  toggleModal() {
    if (this.isOpen) {
      this.modalContainer.remove();
    } else {
      this.modalContainer.createComponent(ModalCompComponent);
    }
    this.isOpen = !this.isOpen;
  }
}
