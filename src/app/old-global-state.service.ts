import { Injectable, computed, signal } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OldGlobalStateService {

  private appState = new BehaviorSubject({
    loading: false,
    theme: 'dark',
    language: 'en',
    isAuthenticated: false
  })

  isLoading() {
    return this.appState.asObservable().pipe(map(state => state.loading));
  }

  isAuth() {
    return this.appState.asObservable().pipe(map((state) => state.isAuthenticated));
  }

  startLoading() {
    this.mutateLoading(true);
  }


  stopLoading() {
    this.mutateLoading(false);
  }

  loginLogout() {
    this.startLoading();
    setTimeout(() => {
      const {isAuthenticated} = this.appState.value;
      this.appState.next({...this.appState.value, loading: false, isAuthenticated: !isAuthenticated})
    }, 1000);
  }


  mutateLoading(loading: boolean) {
    this.appState.next({...this.appState.value, loading})
  }
}
