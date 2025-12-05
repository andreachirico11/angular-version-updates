import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardsNewVcrComponent } from './cards-new-vcr';
import { CardsOldVcrComponent } from './cards-old-vcr';
import { CardsSimpleLoopComponent } from './cards-simple-loop';
import { CardData } from './model';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, CardsOldVcrComponent, CardsSimpleLoopComponent, CardsNewVcrComponent],
  template: `
    <div class="cards-container">
      <header class="cards-header">
        <h1>{{ title }}</h1>
        <p class="subtitle">{{ subtitle }}</p>
      </header>
      <app-cards-simple-loop [cardsData]="cardsData" />
      <app-cards-old-vcr [cardsData]="cardsData" />
      <app-cards-new-vcr [cardsData]="cardsData" />
      @if (cardsData.length === 0) {
      <div class="empty-state">
        <p>No cards available</p>
      </div>
      }
    </div>
  `,
  styleUrl: './cards.scss',
})
export class CardsComponent {
  @Input() title: string = 'Cards Collection';
  @Input() subtitle: string = 'Browse through our collection';
  cardsData: CardData[] = [
    {
      id: '1',
      title: 'Mountain Peak',
      description:
        'Explore the breathtaking views from the highest mountain peaks around the world.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      title: 'Ocean Waves',
      description: 'Discover the serene beauty of ocean waves and coastal landscapes.',
      image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop',
    },
    {
      id: '3',
      title: 'Forest Trail',
      description: 'Walk through the peaceful forest trails and connect with nature.',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    },
    {
      id: '4',
      title: 'Desert Sunset',
      description: 'Experience the magical colors of a desert sunset in all its glory.',
      image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=300&fit=crop',
    },
    {
      id: '5',
      title: 'City Lights',
      description: 'Marvel at the vibrant nightlife and illuminated skylines of modern cities.',
      image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=300&fit=crop',
    },
    {
      id: '6',
      title: 'Northern Lights',
      description: 'Witness the spectacular aurora borealis dancing across the night sky.',
      image: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=400&h=300&fit=crop',
    },
  ];
}
