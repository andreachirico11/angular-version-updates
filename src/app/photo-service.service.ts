import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PhotoServiceService {
  constructor(private httpClient: HttpClient) {}

  _getPhotos() {
    // non va piu
    return this.httpClient
      .get<[{ url: string }]>('https://jsonplaceholder.typicode.com/photos')
      .pipe(map((urls) => urls.slice(0, 99).map(({ url }) => url)));
  }

  getPhotos() {
    return this.httpClient
      .get<{ data: { url: string }[] }>(
        'https://raw.githubusercontent.com/xfiveco/mock-api-images/main/images.json'
      )
      .pipe(
        map(({ data }) => data.map(({ url }) => url)),
        map((urls) => urls.map((url) => Array(100).fill(url) as string[])),
        map((urlsMatrix) => urlsMatrix.flatMap((v) => v))
      );
  }
}
