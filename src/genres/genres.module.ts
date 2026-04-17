import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller.js';
import { GenresService } from './genres.service.js';
import { GenresRepository } from './genres.repository.js';

@Module({
  controllers: [GenresController],
  providers: [GenresService, GenresRepository],
  exports: [GenresRepository],
})
export class GenresModule {}
