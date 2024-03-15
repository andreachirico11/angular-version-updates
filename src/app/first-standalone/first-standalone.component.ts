import { Component } from '@angular/core';
import { TestService } from '../test.service';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-first-standalone',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './first-standalone.component.html'
})
export class FirstStandaloneComponent {

  constructor(private testSevice: TestService){}
}
