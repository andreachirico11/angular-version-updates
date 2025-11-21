import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'list',
    loadComponent: () => import('./list/list.component').then(({ ListComponent }) => ListComponent),
  },
  {
    path: 'contacts',
    loadComponent: () =>
      import('./contacts/contacts.component').then(({ ContactsComponent }) => ContactsComponent),
  },
  {
    path: 'cars',
    loadComponent: () =>
      import('./table/table.component').then(({ TableComponent }) => TableComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
];
