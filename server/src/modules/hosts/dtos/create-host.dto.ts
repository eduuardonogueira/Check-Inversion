import { Type } from '@nestjs/class-transformer';
import { IsString, IsIP, IsArray, ValidateNested } from 'class-validator';
import { CreateNeighborDto } from 'src/modules/neighbors/dtos/create-neighbor.dto';

export class CreateHostDto {
  @IsString()
  hostname: string;

  @IsIP('4')
  ip: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateNeighborDto)
  neighbors: CreateNeighborDto[];
}
