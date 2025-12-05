import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardData } from '../model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-image" *ngIf="data.image">
        <img [src]="data.image" [alt]="data.title">
      </div>
      <div class="card-content">
        <h3>{{ data.title }}</h3>
        <p>{{ data.description }}</p>
      </div>
    </div>
  `,
  styleUrl: './card.scss'
})
export class CardComponent {
  @Input({ required: true }) data!: CardData;
}

