import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller.js';
import { SongsService } from './songs.service.js';
import { SongsRepository } from './songs.repository.js';

@Module({
  controllers: [SongsController],
  providers: [SongsService, SongsRepository],
  exports: [SongsRepository],
})
export class SongsModule {}
