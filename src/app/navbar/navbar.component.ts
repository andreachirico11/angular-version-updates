import { afterRender, afterRenderEffect, Component, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
})
export class NavbarComponent {
  counter = signal(0);
  counterOutput = output<number>();

  constructor() {
    afterRenderEffect(() => {
      this.counterOutput.emit(this.counter())
      console.log('after render effect', this.counter());
    });

    afterRender(() => {
      console.log('after render', this.counter());
    });

    setInterval(() => {
      this.counter.update(c => c+1)
    }, 5000);
  }
}
