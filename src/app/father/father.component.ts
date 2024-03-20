import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'father',
  standalone: true,
  imports: [ChildComponent],
  templateUrl: './father.component.html',
  styleUrl: './father.component.scss'
})
export class FatherComponent {

}
