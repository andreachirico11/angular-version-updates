import { Component, effect, OnInit } from '@angular/core';
import { GlobalStateService } from '../global-state.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable, interval, map, tap } from 'rxjs';
import { OldGlobalStateService } from '../old-global-state.service';

@Component({
  selector: 'app-loadingbar',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './loadingbar.component.html',
  styleUrls: ['./loadingbar.component.scss'],
})
export class LoadingbarComponent implements OnInit {
  loadingBar$!: Observable<string>;
  isLoadingOld$!: Observable<boolean>;

  constructor(public globalState: GlobalStateService, private oldGlobal: OldGlobalStateService) {
    effect(() => {
      // effect is a wrapper function that fires every time the signal inside it fires
      this.createLoadingBar(this.globalState.isLoading());
    });
  }

  ngOnInit(): void {
    this.isLoadingOld$ = this.oldGlobal.isLoading().pipe(
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
