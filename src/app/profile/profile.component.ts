import { NgIf } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit, Signal, SimpleChanges, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, AfterViewInit,AfterViewChecked, DoCheck, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ONCHANGES -> profilecomponent");
  }
  ngDoCheck(): void {
    console.log("DOCHECK -> profilecomponent");
  }
  ngOnInit(): void {
    console.log("ONINIT -> profilecomponent");

  }
  ngAfterViewInit(): void {
    console.log("AFTERVIEWINIT -> profilecomponent");
  }
  ngAfterViewChecked(): void {
    console.log("AFTERVIEWCHECKED -> profilecomponent");
  }
  @Input() isAuthenticated!: WritableSignal<boolean>;
  @Input() isAuthenticatedOld!: boolean;
}
