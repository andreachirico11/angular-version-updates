import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MouseDown } from '../mouse-down';

@Component({
  selector: 'app-products',
  imports: [FormsModule, MouseDown],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  productName = signal('banana');
  productType = signal('premium');
  discount = signal(70);
  price = 20;

  formatPrice(strings: TemplateStringsArray, productName: string, productType: string, discount: number ){
    return `${strings[0]} ${productName}${strings[1]} ${productType}${strings[2]}${discount}${strings[3]}`;
  }
}
