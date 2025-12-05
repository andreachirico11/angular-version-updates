import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthService } from './simple-auth-mock';
import { map } from 'rxjs';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./products/products').then(({ Products }) => Products),
  },
  {
    path: 'media',
    loadComponent: () =>
      import('./polymorphic-list/polymorphic-list').then(
        ({ MediaListComponent }) => MediaListComponent
      ),
  },
  {
    path: 'cards',
    loadComponent: () => import('./cards/cards').then(({ CardsComponent }) => CardsComponent),
  },
  {
    path: '**',
    redirectTo: () => {
      const authSrv = inject(AuthService);
      const router = inject(Router);
      return authSrv
        .checkForAuth()
        .pipe(map((isAuth) => router.createUrlTree([isAuth ? 'media' : 'products'])));
    },
  },
];
