import { AsyncPipe } from '@angular/common';
import { afterRenderEffect, Component, inject, input, output } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../contacts.models';
import { ContactsService } from '../contacts.service.ts.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
  imports: [AsyncPipe],
})
export class ContactDetailComponent {
  private service = inject(ContactsService);
  contact = input<Contact | null>();
  goBack = output<void>();
  contactDetail$!: Observable<Contact>

  constructor() {
    afterRenderEffect(() => {
      this.contactDetail$ = this.service.getContactDetail(this.contact()!.id);
    });
  }
}
