import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Color, FormGroupAlike, Item, ItemForm, Shirt, ShirtForm, Size } from './models';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  // Before Angular@14, if you tried binding protected property in the view,
  // the compiler would complain that the property is not accessible outside class.
  // IMPROVEMENT: father component can't access child property by referencing it in the view (Viewchild)
  // On the other hand child component can use these properties directly in the view without getters or similar workarounds

  protected get routerLinkUrl() {
    return this.router.url === '/' ? '/page1' : '../';
  }

  protected get label() {
    return this.router.url === '/' ? 'Go To page 1' : 'Go Home';
  }

  @Output() addShirtToCartRequested = new EventEmitter<Item<Shirt>>();

  formGroup = new FormGroup<ItemForm<ShirtForm>>({
    quantity: new FormControl<number>(1, { nonNullable: true }),
    item: new FormGroup<ShirtForm>({
      color: new FormControl(Color.Green, { nonNullable: true }),
      size: new FormControl(Size.medium, { nonNullable: true }),
      text: new FormControl('hello world 🌎', { nonNullable: true }),
    }),
  });

  // now you can also access directly to controls
  private itemControlsOld = this.formGroup.controls['item'].controls; // before
  private itemControlsNew: FormGroupAlike<Shirt> = this.formGroup.controls.item.controls; // now (item is the property name of the formGroup and it's available)

  onSubmit() {
    // const rawValueTyped: ItemForm<ShirtForm> = this.formGroup.getRawValue(); // this doesn't compile
    // compiler does not give error because the form respects typization
    const rawValueTyped: Item<Shirt> = this.formGroup.getRawValue();
    this.addShirtToCartRequested.emit(rawValueTyped);
  }

  constructor(private router: Router) {}
}
