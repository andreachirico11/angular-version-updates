interface MediaItem {
  id: string;
  title: string;
  type: 'book' | 'movie' | 'music' | 'podcast';
  rating: number;
  createdAt: Date;
}

interface Book extends MediaItem {
  type: 'book';
  author: string;
  pages: number;
  isbn: string;
}

interface Movie extends MediaItem {
  type: 'movie';
  director: string;
  duration: number;
  releaseYear: number;
}

interface Music extends MediaItem {
  type: 'music';
  artist: string;
  album: string;
  tracks: number;
}

interface Podcast extends MediaItem {
  type: 'podcast';
  host: string;
  episodes: number;
  frequency: string;
}
