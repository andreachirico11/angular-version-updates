import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appColor]',
  standalone: true,
})
export class ColorDirective {
  @Input('color') set color(color: string) {
    this._ = color;
  }

  @HostBinding('style.color') _ = 'blue';
}
