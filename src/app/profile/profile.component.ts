import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, Signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalStateService } from '../global-state.service';
import { OldGlobalStateService } from '../old-global-state.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isAuthenticated!: Signal<boolean>;
  isAuthenticatedOld!: Observable<boolean>;

  constructor(
    private globalState: GlobalStateService,
    private oldGlobalState: OldGlobalStateService
  ) {}

  ngOnInit(): void {
    this.isAuthenticatedOld = this.oldGlobalState.isAuth();
    this.isAuthenticated = this.globalState.isAuth();
  }
}
