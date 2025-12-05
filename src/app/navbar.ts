import { Component, effect, inject, input, Input, model, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationStart, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <a href="#" class="navbar-brand">
          <span>🚀</span>
          <span>{{ title() }}</span>
        </a>

        <button class="navbar-toggle" onclick="toggleMenu()">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul class="navbar-menu" id="navbarMenu">
          <li><a routerLink="">Home</a></li>
          <li><a routerLink="products" routerLinkActive="active">Products</a></li>
          <li><a routerLink="media" routerLinkActive="active">Media</a></li>
          <li><a routerLink="cards" routerLinkActive="active">Cards</a></li>
        </ul>

        <div class="navbar-actions">
          <button class="btn-login" (click)="setLogIn()">
            {{ isLoggedIn() ? 'logout' : 'Login' }}
          </button>
        </div>
      </div>
    </nav>
  `,
})
export class Navbar {
  protected readonly title = input.required<string>();
  protected isLoggedIn = model(false);
  protected navigatePressed = output<string>();
  private readonly routerNav = toSignal(
    inject(Router).events.pipe(
      filter((e) => e instanceof NavigationStart),
      map((e) => e.url)
    ),
    { initialValue: '' }
  );

  constructor() {
    effect(() => {
      this.navigatePressed.emit(this.routerNav())
    });
  }

  setLogIn() {
    this.isLoggedIn.update((prev) => !prev);
  }
}
