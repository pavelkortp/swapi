import { IsArray, IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePeopleDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  birth_year?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  eye_color?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  hair_color?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  height?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  mass?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  skin_color?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  films?: number[];
}
