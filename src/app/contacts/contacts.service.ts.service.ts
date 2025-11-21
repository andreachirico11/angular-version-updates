import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { mockFetch } from '../utils';
import { Contact } from './contacts.models';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private MOCK_CONTACTS: Contact[] = [
    {
      id: 1,
      name: 'Mario',
      surname: 'Rossi',
      email: 'mario.rossi@esempio.it',
      phone: '+39 333 123 4567',
      avatarIcon: '👤',
    },
    {
      id: 2,
      name: 'Laura',
      surname: 'Bianchi',
      email: 'laura.bianchi@esempio.it',
      phone: '+39 347 987 6543',
      avatarIcon: '👤',
    },
    {
      id: 3,
      name: 'Giuseppe',
      surname: 'Verdi',
      email: 'giuseppe.verdi@esempio.it',
      phone: '+39 320 456 7890',
      avatarIcon: '👤',
    },
    {
      id: 4,
      name: 'Francesca',
      surname: 'Neri',
      email: 'francesca.neri@esempio.it',
      phone: '+39 349 234 5678',
      avatarIcon: '👤',
    },
    {
      id: 5,
      name: 'Alessandro',
      surname: 'Conti',
      email: 'alessandro.conti@esempio.it',
      phone: '+39 338 876 5432',
      avatarIcon: '👤',
    },
  ];

  fetchContacts() {
    return mockFetch<Contact[]>(this.MOCK_CONTACTS);
  }

  getContactDetail(idToFind: number) {
    return of(this.MOCK_CONTACTS.find(({ id }) => idToFind === id)!).pipe(delay(500));
  }
}
