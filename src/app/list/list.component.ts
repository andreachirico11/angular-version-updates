import { Component, effect, signal, viewChildren, WritableSignal } from '@angular/core';
import { ListHeaderComponent } from './list-header/list.header.component';
import { ListItemComponent } from './list-item/list.item.component';
import { ListItem, MOCK_DATA } from './list.item';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  imports: [ListHeaderComponent, ListItemComponent],
  standalone: true,
  styleUrl: './list.component.scss',
})
export class ListComponent {
  listTitle: string = 'La mia Lista';
  items: WritableSignal<ListItem[]> = signal([...MOCK_DATA]);
  oldCounter!: number;
  newCounter!: number;
  listItems =  viewChildren(ListItemComponent);

  private defaultDescription = 'Descrizione dell\'elemento';
  private customDescription = '';

  constructor() {
    effect(() => {
      this.oldCounter = this.items().length;
      this.newCounter = this.oldCounter;
    });
    effect(() => {
      console.log(this.listItems())
    });
  }

  onItemClick({ id }: ListItem): void {
    this.items.update((previousItems) =>
      previousItems.map((item) => ({
        ...item,
        active: item.id !== id ? item.active : !item.active,
      }))
    );
  }

  deleteItem(id: number): void {
    this.items.update((previousItems) => previousItems.filter((item) => item.id !== id));
  }

  deleteAllItems() {
    this.items.set([]);
  }

  addItem(): void {
    const id = this.getNewId();
    const newItem: ListItem = {
      id,
      title: `Nuovo elemento ${id}`,
      description: `${this.customDescription || this.defaultDescription} ${id}`,
      active: false,
    };
    this.items.update((previousItems) => [...previousItems, newItem]);
  }

  onCustomDescriptionChange(desc: string) {
    console.log(desc);

    this.customDescription = desc;
  }

  private getNewId() {
    const ids = this.items().map(({ id }) => id);
    let newId = 1;
    while (true) {
      if (ids.includes(newId)) {
        newId++;
        continue;
      }
      return newId;
    }
  }
}
