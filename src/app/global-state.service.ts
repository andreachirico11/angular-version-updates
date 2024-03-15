import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {

  private appState = signal({
    loading: false,
    theme: 'dark',
    language: 'en'
  })

  isLoading() {
    return computed(() => this.appState().loading)()
  }

  startLoading() {
    this.mutateLoading(true);
  }


  stopLoading() {
    this.mutateLoading(false);
  }


  mutateLoading(loading: boolean) {
    this.appState.update(oldstate => ({...oldstate, loading}))
  }
}
