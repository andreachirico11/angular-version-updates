import { Injectable, computed, signal } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OldGlobalStateService {

  private appState = new BehaviorSubject({
    loading: false,
    theme: 'dark',
    language: 'en'
  })

  isLoading() {
    return this.appState.asObservable().pipe(map(state => state.loading));
  }

  startLoading() {
    this.mutateLoading(true);
  }


  stopLoading() {
    this.mutateLoading(false);
  }


  mutateLoading(loading: boolean) {
    this.appState.next({...this.appState.value, loading})
  }
}
