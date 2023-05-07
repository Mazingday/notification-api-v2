import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsString, IsOptional, ValidateIf } from 'class-validator';

export class SendDeviceTokenDTO {
  @IsString()
  @MaxLength(64)
  @ValidateIf((o) => o.email == undefined || o.userId)
  @ApiProperty({ example: 'title', description: 'Target user Device Token' })
  readonly userId: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'title', description: 'Title of notification' })
  readonly token: string;
}
