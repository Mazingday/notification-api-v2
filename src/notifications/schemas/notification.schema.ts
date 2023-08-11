import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, ObjectId } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
  @Prop({ type: 'string' })
  @ApiProperty({
    example: '017d98e4fe1e14200254200000012345',
    description: "Notification's ID",
  })
  _id: ObjectId;

  @Prop()
  @ApiProperty({
    example: '017d9f555a0c11100384200000012345',
    description: "User's ID",
  })
  userId: string;

  @Prop()
  @ApiProperty({
    example: 'high',
    description: 'Notification priority',
  })
  priority: string;

  @Prop()
  @ApiProperty({ example: 'Test', description: 'Title' })
  title: string;

  @Prop()
  @ApiProperty({ example: 'text', description: 'text' })
  text: string;

  @Prop()
  @ApiProperty({ example: 'Test', description: 'Message' })
  body: string;

  @Prop()
  @ApiProperty({ example: 'true', description: 'Notification Viewed' })
  isRead: boolean;

  @Prop()
  @ApiProperty({
    example: 'true',
    description: 'Notification That need to show',
  })
  showOnNotification: boolean;

  @Prop()
  @ApiProperty({
    example: '2022-01-25T00:36:20+00:00',
    description: 'Creation date of the notification',
  })
  creationDate: Date;

  @Prop()
  @ApiProperty({
    example: '2022-01-25T00:36:20+00:00',
    description: 'Delivery date of the notification',
  })
  deliveryDate: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
