import { Genre } from './genres/genre.entity.js';
import { Song } from './songs/song.entity.js';

export const genres: Genre[] = [
  { id: 1, name: 'Rock', description: 'Género musical con guitarras eléctricas y batería potente' },
  { id: 2, name: 'Pop', description: 'Música popular con melodías pegajosas' },
  { id: 3, name: 'Jazz', description: 'Género con improvisación y armonías complejas' },
  { id: 4, name: 'Reggaeton', description: 'Género urbano latino con ritmos bailables' },
  { id: 5, name: 'Salsa', description: 'Género tropical bailable de origen caribeño' },
];

export const songs: Song[] = [
  { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', year: 1975, genreId: 1 },
  { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', year: 2020, genreId: 2 },
  { id: 3, title: 'Take Five', artist: 'Dave Brubeck', album: 'Time Out', year: 1959, genreId: 3 },
  { id: 4, title: 'Dákiti', artist: 'Bad Bunny', album: 'El Último Tour Del Mundo', year: 2020, genreId: 4 },
  { id: 5, title: 'Quimbara', artist: 'Celia Cruz', album: 'Quimbara', year: 1974, genreId: 5 },
  { id: 6, title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV', year: 1971, genreId: 1 },
  { id: 7, title: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide', year: 2017, genreId: 2 },
  { id: 8, title: 'So What', artist: 'Miles Davis', album: 'Kind of Blue', year: 1959, genreId: 3 },
];
