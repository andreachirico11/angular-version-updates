import {
  Component,
  effect,
  inputBinding,
  outputBinding,
  signal,
  twoWayBinding,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <ng-container #navContainer />
    <router-outlet />
  `,
})
export class App {
  private readonly navContainer = viewChild('navContainer', { read: ViewContainerRef });
  protected readonly title = signal('My App');
  protected isLoggedIn = signal(false);

  constructor() {
    effect(() => {
      const container = this.navContainer();
      if (!container) {
        return;
      }
      container.createComponent(Navbar, {
        bindings: [
          inputBinding('title', this.title),
          outputBinding('navigatePressed', (isNavigatingTo: string) => {
            console.log('is Navigating to: ' + isNavigatingTo);
          }),
          twoWayBinding('isLoggedIn', this.isLoggedIn),
        ],
      });
    });

    effect(() => {
      console.log('logged in changed to ' + this.isLoggedIn());
    });
  }
}
