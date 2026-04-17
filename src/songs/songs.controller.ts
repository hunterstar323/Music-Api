import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SongsService } from './songs.service.js';
import { CreateSongDto } from './dto/create-song.dto.js';
import { UpdateSongDto } from './dto/update-song.dto.js';
import { Song } from './song.entity.js';

@ApiTags('Canciones')
@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las canciones' })
  @ApiQuery({ name: 'genreId', required: false, description: 'Filtrar por ID de género' })
  @ApiResponse({ status: 200, description: 'Lista de canciones', type: [Song] })
  findAll(@Query('genreId') genreId?: string): Song[] {
    if (genreId) {
      return this.songsService.findByGenreId(Number(genreId));
    }
    return this.songsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una canción por ID' })
  @ApiResponse({ status: 200, description: 'Canción encontrada', type: Song })
  @ApiResponse({ status: 404, description: 'Canción no encontrada' })
  findById(@Param('id', ParseIntPipe) id: number): Song {
    return this.songsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva canción' })
  @ApiResponse({ status: 201, description: 'Canción creada', type: Song })
  create(@Body() dto: CreateSongDto): Song {
    return this.songsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una canción existente' })
  @ApiResponse({ status: 200, description: 'Canción actualizada', type: Song })
  @ApiResponse({ status: 404, description: 'Canción no encontrada' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSongDto): Song {
    return this.songsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una canción' })
  @ApiResponse({ status: 200, description: 'Canción eliminada' })
  @ApiResponse({ status: 404, description: 'Canción no encontrada' })
  delete(@Param('id', ParseIntPipe) id: number): void {
    return this.songsService.delete(id);
  }
}
