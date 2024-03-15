import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Color, Item, ItemForm, Shirt, ShirtForm, Size } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  protected label = 'Go To page 1'; // now compiles

  @Output() addShirtToCartRequested = new EventEmitter<Item<Shirt>>();

  formGroup = new FormGroup<ItemForm<ShirtForm>>({
    quantity: new FormControl<number>(1, { nonNullable: true }),
    item: new FormGroup<ShirtForm>({
      color: new FormControl(Color.Green, { nonNullable: true }),
      size: new FormControl(Size.medium, { nonNullable: true }),
      text: new FormControl('hello world 🌎', { nonNullable: true }),
    }),
  });

  onSubmit() {
    // compiler does not give error because the form respects typization
    this.addShirtToCartRequested.emit(this.formGroup.getRawValue());
    // impossible before
    this.formGroup.controls.item.controls;
  }
}
