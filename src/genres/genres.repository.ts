import { Injectable } from '@nestjs/common';
import { Genre } from './genre.entity.js';
import { genres as seedGenres } from '../data.js';

@Injectable()
export class GenresRepository {
  private genres: Genre[] = [...seedGenres];
  private nextId = this.genres.length + 1;

  findAll(): Genre[] {
    return this.genres;
  }

  findById(id: number): Genre | undefined {
    return this.genres.find((g) => g.id === id);
  }

  create(genre: Omit<Genre, 'id'>): Genre {
    const newGenre: Genre = { id: this.nextId++, ...genre };
    this.genres.push(newGenre);
    return newGenre;
  }

  update(id: number, data: Partial<Omit<Genre, 'id'>>): Genre | undefined {
    const genre = this.findById(id);
    if (!genre) return undefined;
    Object.assign(genre, data);
    return genre;
  }

  delete(id: number): boolean {
    const index = this.genres.findIndex((g) => g.id === id);
    if (index === -1) return false;
    this.genres.splice(index, 1);
    return true;
  }
}
