import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getPosts() {
    return this.httpClient
      .get<IPost[]>('https://jsonplaceholder.typicode.com/comments')
      .pipe(first());
  }
}

export interface IPost {
  postId: number;
  name: string;
  email: string;
  body: string;
}
