import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ColorDirective } from '../color.directive';

@Component({
  selector: 'app-third-standalone',
  standalone: true,
  imports: [NgIf], // ngif now can be imported without the common module
  templateUrl: './third-standalone.component.html',
  hostDirectives: [{directive: ColorDirective, inputs: ['color']}]
})
export class ThirdStandaloneComponent {

}
