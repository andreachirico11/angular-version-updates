import { CommonModule, NgComponentOutlet } from '@angular/common';
import { Component, inject, Injector, Input, signal } from '@angular/core';
import { CardComponent } from './card/card';
import { CardData } from './model';

@Component({
  selector: 'app-cards-new-vcr',
  standalone: true,
  imports: [CommonModule, NgComponentOutlet],
  template: `
    <div class="cards-grid">
      @for (card of cardsData; track card.id) {
      <ng-container
        [ngComponentOutlet]="cardCompRef"
        [ngComponentOutletInputs]="getInputs($index)"
        [ngComponentOutletInjector]="fakeCustomInjector"
      />
      }
    </div>
  `,
  styleUrl: './cards.scss',
})
export class CardsNewVcrComponent {
  @Input() cardsData: CardData[] = [];
  private readonly _injector = inject(Injector);
  protected readonly fakeCustomInjector = Injector.create({
    providers: [], // custom providers
    parent: this._injector,
  });
  protected readonly cardCompRef = CardComponent;

  getInputs(index: number) {
    return { data: this.cardsData[index] };
  }
}
