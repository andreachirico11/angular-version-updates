import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotoServiceService {

  constructor(private httpClient: HttpClient) { }

  getPhotos() {
    return this.httpClient
    .get<[{ url: string }]>('https://jsonplaceholder.typicode.com/photos')
    .pipe(map((urls) => urls.slice(0, 99).map(({ url }) => url)));
  }
}
