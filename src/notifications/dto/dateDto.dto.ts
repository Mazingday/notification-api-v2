import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class DateDTO {
  @IsNotEmpty()
  @ApiProperty({ example: 'data', description: 'data of notification' })
  readonly date: Date;
}
