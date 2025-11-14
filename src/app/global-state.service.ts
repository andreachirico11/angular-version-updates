import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  private appState = signal({
    loading: false,
    theme: 'dark',
    language: 'en',
    isAuthenticated: false,
  });

  isLoading() {
    return computed(() => this.appState().loading)();
  }

  isAuth() {
    return computed(() => this.appState().isAuthenticated);
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
      this.appState.update(({ isAuthenticated, ...oldstate }) => ({
        ...oldstate,
        isAuthenticated: !isAuthenticated,
        loading: false,
      }));
    }, 1000);
  }

  mutateLoading(loading: boolean) {
    this.appState.update((oldstate) => ({ ...oldstate, loading }));
  }
}
