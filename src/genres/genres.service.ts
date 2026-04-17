import { Injectable, NotFoundException } from '@nestjs/common';
import { GenresRepository } from './genres.repository.js';
import { CreateGenreDto } from './dto/create-genre.dto.js';
import { UpdateGenreDto } from './dto/update-genre.dto.js';
import { Genre } from './genre.entity.js';

@Injectable()
export class GenresService {
  constructor(private readonly genresRepository: GenresRepository) {}

  findAll(): Genre[] {
    return this.genresRepository.findAll();
  }

  findById(id: number): Genre {
    const genre = this.genresRepository.findById(id);
    if (!genre) throw new NotFoundException(`Género con id ${id} no encontrado`);
    return genre;
  }

  create(dto: CreateGenreDto): Genre {
    return this.genresRepository.create(dto);
  }

  update(id: number, dto: UpdateGenreDto): Genre {
    const genre = this.genresRepository.update(id, dto);
    if (!genre) throw new NotFoundException(`Género con id ${id} no encontrado`);
    return genre;
  }

  delete(id: number): void {
    const deleted = this.genresRepository.delete(id);
    if (!deleted) throw new NotFoundException(`Género con id ${id} no encontrado`);
  }
}
