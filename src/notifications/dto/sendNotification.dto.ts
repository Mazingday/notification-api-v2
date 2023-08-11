import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
  ValidateIf,
  IsEmail,
} from 'class-validator';

export class SendNotificationDTO {
  @IsString()
  @MaxLength(64)
  @ValidateIf((o) => o.email == undefined || o.userId)
  @ApiProperty({ example: 'title', description: 'Target user of notification' })
  readonly userId: string;

  @IsString()
  @MaxLength(64)
  @IsEmail()
  @ValidateIf((o) => o.userId == undefined || o.email)
  @ApiProperty({
    example: 'name@email.com',
    description: 'Target email of notification',
  })
  readonly email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'title', description: 'Title of notification' })
  readonly title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'priority', description: 'priority of notification' })
  readonly priority: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'body', description: 'Body of notification' })
  readonly body: any;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    example: '01-01-2001',
    description: 'Target date to send the notification',
  })
  readonly date: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'navigate_to',
    description: 'navigate_to of notification',
  })
  readonly type: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'true',
    description: 'is popup notification',
  })
  readonly isPopUp: boolean;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'data', description: 'data of notification' })
  readonly data: any;
}
