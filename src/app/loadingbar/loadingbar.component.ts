import { Component, effect } from '@angular/core';
import { GlobalStateService } from '../global-state.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable, interval, map, tap } from 'rxjs';
import { OldGlobalStateService } from '../old-global-state.service';

@Component({
  selector: 'app-loadingbar',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './loadingbar.component.html',
  styleUrl: './loadingbar.component.scss',
})
export class LoadingbarComponent {
  loadingBar$!: Observable<string>;

  isLoadingOld$;

  constructor(public globalState: GlobalStateService, oldGlobal: OldGlobalStateService) {
    effect(() => {
      // effect is a wrapper function that fires every time the signal inside it fires
      this.createLoadingBar( this.globalState.isLoading());
    });
    this.isLoadingOld$ = oldGlobal.isLoading().pipe(
      tap((isLoading) => {
          this.createLoadingBar(isLoading);
      })
    );
  }

  private createLoadingBar(isLoading: boolean) {
    if (isLoading) {

    this.loadingBar$ = interval(100).pipe(
      tap((n) => console.log('loading ' + n)),
      map((n) => '-'.repeat(n))
    );
  }
}
}
