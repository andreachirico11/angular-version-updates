import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'media-list',
  imports: [CommonModule],
  templateUrl: './polymorphic-list.html',
  styleUrl: './polymorphic-list.scss'
})
export class MediaListComponent {
  mediaItems = signal<MediaItem[]>([
    {
      id: '1',
      title: 'The Great Gatsby',
      type: 'book',
      author: 'F. Scott Fitzgerald',
      pages: 180,
      isbn: '978-0-7432-7356-5',
      rating: 4.5,
      createdAt: new Date('2024-01-15')
    } as Book,
    {
      id: '2',
      title: 'Inception',
      type: 'movie',
      director: 'Christopher Nolan',
      duration: 148,
      releaseYear: 2010,
      rating: 5,
      createdAt: new Date('2024-02-20')
    } as Movie,
    {
      id: '3',
      title: 'Dark Side of the Moon',
      type: 'music',
      artist: 'Pink Floyd',
      album: 'Dark Side of the Moon',
      tracks: 10,
      rating: 5,
      createdAt: new Date('2024-03-10')
    } as Music,
    {
      id: '4',
      title: 'The Joe Rogan Experience',
      type: 'podcast',
      host: 'Joe Rogan',
      episodes: 2000,
      frequency: 'Daily',
      rating: 4,
      createdAt: new Date('2024-04-05')
    } as Podcast,
    {
      id: '5',
      title: '1984',
      type: 'book',
      author: 'George Orwell',
      pages: 328,
      isbn: '978-0-452-28423-4',
      rating: 4.8,
      createdAt: new Date('2024-05-12')
    } as Book,
    {
      id: '6',
      title: 'Interstellar',
      type: 'movie',
      director: 'Christopher Nolan',
      duration: 169,
      releaseYear: 2014,
      rating: 4.9,
      createdAt: new Date('2024-06-18')
    } as Movie,
    {
      id: '7',
      title: 'Abbey Road',
      type: 'music',
      artist: 'The Beatles',
      album: 'Abbey Road',
      tracks: 17,
      rating: 4.7,
      createdAt: new Date('2024-07-22')
    } as Music,
    {
      id: '8',
      title: 'Hardcore History',
      type: 'podcast',
      host: 'Dan Carlin',
      episodes: 69,
      frequency: 'Irregular',
      rating: 4.9,
      createdAt: new Date('2024-08-30')
    } as Podcast
  ]);

  selectedFilter = signal<'all' | 'book' | 'movie' | 'music' | 'podcast'>('all');
  filters: Array<'all' | 'book' | 'movie' | 'music' | 'podcast'> = ['all', 'book', 'movie', 'music', 'podcast'];

  getFilteredItems(): MediaItem[] {
    const filter = this.selectedFilter();
    if (filter === 'all') {
      return this.mediaItems();
    }
    return this.mediaItems().filter(item => item.type === filter);
  }

  getAverageRating(): string {
    const items = this.getFilteredItems();
    if (items.length === 0) return '0.0';
    const avg = items.reduce((sum, item) => sum + item.rating, 0) / items.length;
    return avg.toFixed(1);
  }

  getTypeIcon(type: string): string {
    const icons: Record<string, string> = {
      'book': '📖',
      'movie': '🎬',
      'music': '🎵',
      'podcast': '🎙️'
    };
    return icons[type] || '📦';
  }

}
