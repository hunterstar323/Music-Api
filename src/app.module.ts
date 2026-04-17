import { Module } from '@nestjs/common';
import { GenresModule } from './genres/genres.module.js';
import { SongsModule } from './songs/songs.module.js';

@Module({
  imports: [GenresModule, SongsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
