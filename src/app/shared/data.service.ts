import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from './models';

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly _httpClient = inject(HttpClient);

  submitData(value: User) {
    return this._httpClient
      .put<User>('https://dummyjson.com/users/2', value, { observe: 'response' })
      .pipe(
        map((response) => {
          console.log('Response type:', response.responseType);

          if (response.responseType === 'opaque') {
            console.warn('CORS issue detected — response is opaque.');
          }
          if (response.responseType === 'cors') {
            console.warn('CORS issue detected ');
          }

          return response.body;
        })
      )
      .toPromise();
  }
}
