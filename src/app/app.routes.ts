import { Route } from '@angular/router';

const routes: Route[] = [
  {
    path: 'list/:ofWhat',
    title: 'LIST',
    loadComponent: () =>
      import('./list/list.component').then(({ListComponent}) => ListComponent),
  }
];

export default routes;
