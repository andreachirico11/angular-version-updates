import { Component, inject, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { SpinnerComponent } from '../spinner.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactComponent } from './contact/contact.component';
import { ContactsService } from './contacts.service.ts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  standalone: true,
  imports: [ContactComponent, SpinnerComponent, ContactDetailComponent],
})
export class ContactsComponent {
  private contactService = inject(ContactsService);
  private contactResource = resource({
    loader: async (_params) => {
      const response = await this.contactService.fetchContacts();
      if (!response.ok) {
        return [];
      }
      return await response.json();
    },
    defaultValue: [],
  });
  protected contacts = this.contactResource.value;
  protected contactsLoading = this.contactResource.isLoading;

  private contactSelectedId = signal<number | null>(null);
  private contactDetailResource = rxResource({
    request: this.contactSelectedId,
    defaultValue: null,
    loader: ({ request: contactSelectedId }) => {
      if (!!contactSelectedId) {
        return this.contactService.getContactDetail(contactSelectedId);
      }
      return of(null);
    },
  });
  protected contactDetail = this.contactDetailResource.value;
  protected contactDetailLoading = this.contactDetailResource.isLoading;

  protected reloadContacts() {
    this.contactResource.reload();
  }

  protected onContactSelected(id: number) {
    this.contactSelectedId.set(id);
  }

  protected goBackFromDetail() {
    this.contactSelectedId.set(null);
  }
}
