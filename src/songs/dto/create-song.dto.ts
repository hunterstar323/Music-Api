import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateSongDto {
  @ApiProperty({ example: 'Lose Yourself', description: 'Título de la canción' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Eminem', description: 'Artista o banda' })
  @IsNotEmpty()
  @IsString()
  artist: string;

  @ApiPropertyOptional({ example: '8 Mile OST', description: 'Álbum al que pertenece' })
  @IsString()
  album: string;

  @ApiProperty({ example: 2002, description: 'Año de lanzamiento' })
  @IsInt()
  @Min(1900)
  year: number;

  @ApiProperty({ example: 1, description: 'ID del género musical asociado' })
  @IsInt()
  genreId: number;
}
