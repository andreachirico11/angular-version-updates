import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalCompComponent } from './modal-comp/modal-comp.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  commentingThisCausesError = "Now the compiler detects template variables which doesn't exists in the model"
  @ViewChild('modalContainer', {read: ViewContainerRef}) modalContainer!: ViewContainerRef;

  private isOpen = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}


  toggleModal() {
    if (this.isOpen) {
      this.modalContainer.remove();
    } else {
      const factory = this.componentFactoryResolver.resolveComponentFactory(ModalCompComponent);
      this.modalContainer.createComponent(factory);
    }
    this.isOpen = !this.isOpen;
  }
}
