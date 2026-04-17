import { Injectable, NotFoundException } from '@nestjs/common';
import { SongsRepository } from './songs.repository.js';
import { CreateSongDto } from './dto/create-song.dto.js';
import { UpdateSongDto } from './dto/update-song.dto.js';
import { Song } from './song.entity.js';

@Injectable()
export class SongsService {
  constructor(private readonly songsRepository: SongsRepository) {}

  findAll(): Song[] {
    return this.songsRepository.findAll();
  }

  findById(id: number): Song {
    const song = this.songsRepository.findById(id);
    if (!song) throw new NotFoundException(`Canción con id ${id} no encontrada`);
    return song;
  }

  findByGenreId(genreId: number): Song[] {
    return this.songsRepository.findByGenreId(genreId);
  }

  create(dto: CreateSongDto): Song {
    return this.songsRepository.create(dto);
  }

  update(id: number, dto: UpdateSongDto): Song {
    const song = this.songsRepository.update(id, dto);
    if (!song) throw new NotFoundException(`Canción con id ${id} no encontrada`);
    return song;
  }

  delete(id: number): void {
    const deleted = this.songsRepository.delete(id);
    if (!deleted) throw new NotFoundException(`Canción con id ${id} no encontrada`);
  }
}
