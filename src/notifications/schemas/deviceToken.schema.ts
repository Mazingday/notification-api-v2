import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, ObjectId } from 'mongoose';

export type NotificationDatasDocument = notificationDatas & Document;

@Schema()
export class notificationDatas {
  @Prop({ type: 'string' })
  @ApiProperty({
    example: '017d98e4fe1e14200254200000012345',
    description: "Notification's ID",
  })
  _id: ObjectId;

  @Prop({ type: 'string' })
  @ApiProperty({ example: 'Test', description: 'Title' })
  deviceToken: string;

  @Prop({ type: 'boolean' })
  @ApiProperty({ example: 'true', description: 'notification' })
  notification: boolean;

  @Prop({ type: 'boolean' })
  @ApiProperty({ example: 'true', description: 'newChat' })
  newChat: boolean;

  @Prop({ type: 'boolean' })
  @ApiProperty({ example: 'true', description: 'newMessage' })
  newMessage: boolean;

  @Prop({ type: 'boolean' })
  @ApiProperty({ example: 'true', description: 'regularMessage' })
  regularMessage: boolean;
}

export const NotificationDatasSchema =
  SchemaFactory.createForClass(notificationDatas);
