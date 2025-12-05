import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardComponent } from './card/card';
import { CardData } from './model';

@Component({
  selector: 'app-cards-simple-loop',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <div class="cards-grid">
      @for (card of cardsData; track card.id) {
      <app-card [data]="card"></app-card>
      }
    </div>
  `,
  styleUrl: './cards.scss',
})
export class CardsSimpleLoopComponent {
  @Input() cardsData: CardData[] = [];
}
