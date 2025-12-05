import { CommonModule } from '@angular/common';
import { Component, effect, inject, Injector, Input, viewChildren, ViewContainerRef } from '@angular/core';
import { CardComponent } from './card/card';
import { CardData } from './model';

@Component({
  selector: 'app-cards-old-vcr',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cards-grid">
      @for (card of cardsData; track card.id) {
      <ng-container #container />
      }
    </div>
  `,
  styleUrl: './cards.scss',
})
export class CardsOldVcrComponent {
  @Input() cardsData: CardData[] = [];
  private readonly containers = viewChildren('container', { read: ViewContainerRef });
  private readonly _injector = inject(Injector);
  protected readonly fakeCustomInjector = Injector.create({
    providers: [], // custom providers
    parent: this._injector,
  });

  constructor() {
    effect(() => {
      const actualContainers = this.containers();
      actualContainers.forEach((c, index) => {
        c.clear();
        const ref = c.createComponent(CardComponent, {injector: this.fakeCustomInjector});
        ref.setInput('data', { ...this.cardsData[index] });
      });
    });
  }
}
