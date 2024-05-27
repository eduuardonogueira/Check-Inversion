import { IsIP, IsString, Max, Min } from 'class-validator';

export class CustomRequestDto {
  @IsString()
  @IsIP('4')
  @Min(7)
  @Max(15)
  ip: string;

  @Max(60)
  @IsString()
  community: string;

  @Max(100)
  @IsString()
  oid: string;
}
