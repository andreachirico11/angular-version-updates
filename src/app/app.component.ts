import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StaticFalseComponent } from './static-false.component';
import { StaticTrueComponent } from './static-true.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(StaticFalseComponent, { static: false })
  staticFalse!: ElementRef<StaticFalseComponent>;
  @ViewChild(StaticTrueComponent, { static: true })
  staticTrue!: ElementRef<StaticTrueComponent>;
  ngOnInit() {
    console.log('------------- ngOnInit');
    console.log("Component with static false is: " + this.staticFalse);
    console.log('Component with static true is: ' + this.staticTrue);
    console.log('\n\n');
  }
  ngAfterViewInit() {
    console.log('------ ngAfterViewInit');
    console.log('Component with static false is: ' + this.staticFalse);
    console.log('Component with static true is: ' + this.staticTrue);
    console.log('----------------------');
  }
}
