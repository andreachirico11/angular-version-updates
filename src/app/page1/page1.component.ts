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
  styleUrl: './page1.component.scss',
})
export class Page1Component {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  private created: ComponentRef<DynamicCompComponent> | null = null;

  toggleCompo() {
    // native api are used to show the ability of mixing angular component with
    // other browser tencologies

    if (!!this.created) {
      this.created.destroy();
      this.created = null;
    } else {
      const container = document.getElementById('container');
      const realContainer = document.createElement('div');
      container?.appendChild(realContainer);
      this.created = createComponent(DynamicCompComponent, {
        environmentInjector: this.injector,
        hostElement: realContainer,
      });
      this.appRef.attachView(this.created.hostView);
    }
  }

  constructor(private injector: EnvironmentInjector, private appRef: ApplicationRef) {}
}
