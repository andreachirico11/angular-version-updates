import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMouseDown]',
  host: { '(mousedown)': 'handleMousedown($event)', '(mouseup)': 'void handleMouseUp($event)' },
})
export class MouseDown {
  constructor(private elRef: ElementRef) {}
  handleMousedown(ev: MouseEvent) {
    console.log(this.elRef);
    console.log('mousedown is prevented?: ' + ev.defaultPrevented);
    console.log('                  ');

    return false;
  }

  handleMouseUp(ev: MouseEvent) {
    console.log(this.elRef);
    console.log('mouseup is prevented?: ' + ev.defaultPrevented);
    console.log('                  ');
    return false;
  }
}
