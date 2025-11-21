
import { Component, input, output } from '@angular/core';
import { Contact } from '../contacts.models';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
})
export class ContactComponent {
  contact = input.required<Contact>();
  protected contactSelected = output<number>();
  protected select() {
    this.contactSelected.emit(this.contact().id);
  }
}
