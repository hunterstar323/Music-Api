import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({ example: 'Electrónica', description: 'Nombre del género musical' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Música producida con sintetizadores', description: 'Descripción del género' })
  @IsNotEmpty()
  @IsString()
  description: string;
}
