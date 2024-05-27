import { IsString, Max, Min } from 'class-validator';

export class CreateNeighborDto {
  @Max(30)
  @IsString()
  hostname: string;

  @Max(2)
  @IsString()
  port: string;

  @Max(5)
  @Min(3)
  @IsString()
  remotePort: string;
}
