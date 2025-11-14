import { Component } from '@angular/core';
import { ThirdStandaloneComponent } from '../third-standalone/third-standalone.component';

@Component({
  selector: 'app-second-standalone',
  standalone: true,
  imports: [ThirdStandaloneComponent],
  templateUrl: './second-standalone.component.html',
})
export class SecondStandaloneComponent {

}
