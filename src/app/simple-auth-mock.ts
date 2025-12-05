import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  checkForAuth(): Observable<boolean> {
    return of(Math.random() > 0.5).pipe(
      delay(1000)
    );
  }
}