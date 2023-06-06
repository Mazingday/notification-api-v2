import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class FirebaseDTO {
  @ApiProperty({
    example: 'ccZLLkPiR4KfdKyYELXtSN:APA91bF4XzjIWdxHHty',
    description: 'Token id',
  })
  to?: string;

  @ApiProperty({ example: 'high', description: 'priority of notification' })
  priority?: string;

  @ApiProperty({ example: 'title', description: 'Title of notification' })
  title?: string;

  @ApiProperty({ example: 'body', description: 'Body of notification' })
  body?: any;

  @ApiProperty({ example: 'text', description: 'Body of notification' })
  text?: string;

  @ApiProperty({ example: 'text', description: 'Body of notification' })
  type?: string;

  @ApiProperty({ example: 'text', description: 'Body of notification' })
  data?: any;
}
