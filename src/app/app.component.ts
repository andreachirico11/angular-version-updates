import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StaticFalseComponent } from './static-false/static-false.component';
import { StaticTrueComponent } from './static-true/static-true.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    console.log("------ ngAfterViewInit");
    console.log(this.staticFalse);
    console.log(this.staticTrue);
    console.log("----------------------");
  }
  ngOnInit() {
    console.log("------------- ngOnInit");
    console.log(this.staticFalse);
    console.log(this.staticTrue);
    console.log("----------------------");
  }
  @ViewChild(StaticFalseComponent, { read: ElementRef })
  staticFalse!: ElementRef<StaticFalseComponent>;
  @ViewChild(StaticTrueComponent, { read: ElementRef, static: true })
  staticTrue!: ElementRef<StaticTrueComponent>;
}
