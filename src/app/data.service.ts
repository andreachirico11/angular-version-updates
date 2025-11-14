import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http
      .get<{ name: string }[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(map((users) => users.map(({ name }) => name)));
  }

  getAlbums() {
    return this.http
      .get<{ title: string }[]>('https://jsonplaceholder.typicode.com/albums')
      .pipe(map((albums) => albums.map(({ title }) => title)));
  }


}
