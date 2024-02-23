import { IsInt, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class InputPaginated {
  @ApiProperty({
    example: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(15)
  take: number;

  @ApiProperty({
    example: 0,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(1000)
  skip: number;
}
