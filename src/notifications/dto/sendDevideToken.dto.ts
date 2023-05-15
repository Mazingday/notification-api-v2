import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsString, IsOptional, ValidateIf } from 'class-validator';

export class SendDeviceTokenDTO {
  @IsString()
  @MaxLength(64)
  @ValidateIf((o) => o.email == undefined || o.userId)
  @ApiProperty({ example: '123456', description: 'userId user Device Token' })
  readonly userId: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'token', description: 'token of notification' })
  readonly token: string;

  @IsOptional()
  @ApiProperty({ example: 'true', description: 'delete token of notification' })
  readonly isdelete: boolean;
}
