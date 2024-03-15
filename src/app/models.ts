import { FormControl, FormGroup } from '@angular/forms';

export interface Item<ITEMTYPE> {
  item: ITEMTYPE;
  quantity: number;
}
export interface Shirt {
  text: string;
  color: Color;
  size: Size;
}
export enum Color {
  Red = 'Red',
  Blue = 'Blue',
  Green = 'Green',
  Yellow = 'Yellow',
  Pink = 'Pink',
}
export enum Size {
  xs = 'XS',
  small = 'S',
  medium = 'M',
  large = 'L',
  xl = 'XL',
  xxl = 'XXL',
}
///////////////////////
export type FormGroupAlike<objectAlike extends Object> = {
  [key in keyof objectAlike]: FormControl<objectAlike[key]>;
};

export interface ItemForm<FORMCONTROLS extends FormGroupAlike<any>> {
  quantity: FormControl<number>;
  item: FormGroup<FORMCONTROLS>;
}

export type ShirtForm = FormGroupAlike<Shirt>;
