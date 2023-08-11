import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsString, ValidateIf } from 'class-validator';

export class MarkReadDTO {
  @IsString()
  @MaxLength(64)
  @ValidateIf((o) => o.email == undefined || o.userId)
  @ApiProperty({ example: '123456', description: 'notifId to change' })
  readonly notificationId: string;
}
