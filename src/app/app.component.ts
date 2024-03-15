import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
  signal,
} from '@angular/core';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { LoadingbarComponent } from './loadingbar/loadingbar.component';
import { ListComponent } from './list/list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AuthButtonComponent,
    ProfileComponent,
    HeaderComponent,
    LoadingbarComponent,
    ListComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked, DoCheck, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ONCHANGES -> appcomponent');
  }
  ngDoCheck(): void {
    console.log('DOCHECK -> appcomponent');
  }
  ngOnInit(): void {
    console.log('ONINIT -> appcomponent');
  }
  ngAfterViewInit(): void {
    console.log('AFTERVIEWINIT -> appcomponent');
  }
  ngAfterViewChecked(): void {
    console.log('AFTERVIEWCHECKED -> appcomponent');
  }
  isAuthenticated = signal(false);
  isAuthenticatedOld = false;

  onisAuthenticating($event: boolean) {
    this.isAuthenticatedOld = $event;
  }
}
