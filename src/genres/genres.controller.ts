import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GenresService } from './genres.service.js';
import { CreateGenreDto } from './dto/create-genre.dto.js';
import { UpdateGenreDto } from './dto/update-genre.dto.js';
import { Genre } from './genre.entity.js';

@ApiTags('Géneros')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los géneros musicales' })
  @ApiResponse({ status: 200, description: 'Lista de géneros', type: [Genre] })
  findAll(): Genre[] {
    return this.genresService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un género por ID' })
  @ApiResponse({ status: 200, description: 'Género encontrado', type: Genre })
  @ApiResponse({ status: 404, description: 'Género no encontrado' })
  findById(@Param('id', ParseIntPipe) id: number): Genre {
    return this.genresService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo género musical' })
  @ApiResponse({ status: 201, description: 'Género creado', type: Genre })
  create(@Body() dto: CreateGenreDto): Genre {
    return this.genresService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un género existente' })
  @ApiResponse({ status: 200, description: 'Género actualizado', type: Genre })
  @ApiResponse({ status: 404, description: 'Género no encontrado' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGenreDto): Genre {
    return this.genresService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un género musical' })
  @ApiResponse({ status: 200, description: 'Género eliminado' })
  @ApiResponse({ status: 404, description: 'Género no encontrado' })
  delete(@Param('id', ParseIntPipe) id: number): void {
    return this.genresService.delete(id);
  }
}
