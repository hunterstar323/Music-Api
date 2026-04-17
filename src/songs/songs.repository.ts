import { Injectable } from '@nestjs/common';
import { Song } from './song.entity.js';
import { songs as seedSongs } from '../data.js';

@Injectable()
export class SongsRepository {
  private songs: Song[] = [...seedSongs];
  private nextId = this.songs.length + 1;

  findAll(): Song[] {
    return this.songs;
  }

  findById(id: number): Song | undefined {
    return this.songs.find((s) => s.id === id);
  }

  findByGenreId(genreId: number): Song[] {
    return this.songs.filter((s) => s.genreId === genreId);
  }

  create(song: Omit<Song, 'id'>): Song {
    const newSong: Song = { id: this.nextId++, ...song };
    this.songs.push(newSong);
    return newSong;
  }

  update(id: number, data: Partial<Omit<Song, 'id'>>): Song | undefined {
    const song = this.findById(id);
    if (!song) return undefined;
    Object.assign(song, data);
    return song;
  }

  delete(id: number): boolean {
    const index = this.songs.findIndex((s) => s.id === id);
    if (index === -1) return false;
    this.songs.splice(index, 1);
    return true;
  }
}
