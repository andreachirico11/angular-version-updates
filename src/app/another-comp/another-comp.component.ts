import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-another-comp',
  template:  `<p> COMPONENT inside {{father}}</p>`,
})
export class AnotherCompComponent {

  @Input() father: string = '';

}
