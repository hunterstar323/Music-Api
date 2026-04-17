import { PartialType } from '@nestjs/swagger';
import { CreateSongDto } from './create-song.dto.js';

export class UpdateSongDto extends PartialType(CreateSongDto) {}
