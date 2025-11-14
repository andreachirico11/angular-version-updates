import { AsyncPipe } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  OnInit,
  Output,
  signal,
  WritableSignal
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { GlobalStateService } from '../global-state.service';
import { OldGlobalStateService } from '../old-global-state.service';

@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './auth-button.component.html',
})
export class AuthButtonComponent implements OnInit {
  label = computed(() => (this.globalState.isAuth()() ? 'Logout' : 'Login'));
  labelOld!: Observable<string>;

  constructor(
    private globalState: GlobalStateService,
    private oldGlobalState: OldGlobalStateService
  ) {}

  ngOnInit(): void {
    this.labelOld = this.oldGlobalState
      .isAuth()
      .pipe(map((isAuth) => (isAuth ? 'Logout Old' : 'Login Old')));
  }

  loginLogout() {
    this.globalState.loginLogout();
  }

  loginLogoutOld() {
    this.oldGlobalState.loginLogout();
  }
}
