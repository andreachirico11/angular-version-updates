import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  WritableSignal,
  computed,
} from '@angular/core';
import { GlobalStateService } from '../global-state.service';
import { OldGlobalStateService } from '../old-global-state.service';

@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [],
  templateUrl: './auth-button.component.html',
  styleUrl: './auth-button.component.scss',
})
export class AuthButtonComponent
  implements OnInit, AfterViewInit, AfterViewChecked, DoCheck, OnChanges
{
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ONCHANGES -> authbuttoncomponent');
  }
  ngDoCheck(): void {
    console.log('DOCHECK -> authbuttoncomponent');
  }
  ngOnInit(): void {
    console.log('ONINIT -> authbuttoncomponent');
  }
  ngAfterViewInit(): void {
    console.log('AFTERVIEWINIT -> authbuttoncomponent');
  }
  ngAfterViewChecked(): void {
    console.log('AFTERVIEWCHECKED -> authbuttoncomponent');
  }

  constructor(
    private globalState: GlobalStateService,
    private oldGlobalState: OldGlobalStateService
  ) {}

  @Input({required: true}) isAuthenticated!: WritableSignal<boolean>;
  @Input({required: true}) isAuthenticatedOld!: boolean;
  @Output() isAuthenticating = new EventEmitter<boolean>();

  label = computed(() => (this.isAuthenticated() ? 'Logout' : 'Login'));
  get labelOld() {
    return this.isAuthenticatedOld ? 'Logout Old' : 'Login Old';
  }

  loginLogout() {
    this.globalState.startLoading();
    setTimeout(() => {
      this.isAuthenticated.set(!this.isAuthenticated());
      this.globalState.stopLoading();
    }, 1000);
  }

  loginLogoutOld() {
    this.oldGlobalState.startLoading();
    setTimeout(() => {
      this.isAuthenticating.emit(!this.isAuthenticatedOld);
      this.oldGlobalState.stopLoading();
    }, 1000);
  }
}
