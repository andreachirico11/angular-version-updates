import {
  ApplicationRef,
  Component,
  ComponentRef,
  ElementRef,
  EnvironmentInjector,
  ViewChild,
  ViewContainerRef,
  createComponent,
} from '@angular/core';
import { DynamicCompComponent } from '../dynamic-comp/dynamic-comp.component';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
})
export class Page1Component {
  @ViewChild('container') container!: ElementRef;

  private created: ComponentRef<DynamicCompComponent> | null = null;

  constructor(private injector: EnvironmentInjector, private appRef: ApplicationRef) {}

  toggleCompo() {
    if (!!this.created) {
      this.created.destroy();
      this.created = null;
    } else {
      this.created = createComponent(DynamicCompComponent, {
        environmentInjector: this.injector,
        hostElement: this.container.nativeElement,
      });
      // after this the view will be sync with angular change detection
      this.appRef.attachView(this.created.hostView);
    }
  }
}
