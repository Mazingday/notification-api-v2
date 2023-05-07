import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, ObjectId } from 'mongoose';

export type DeviceTokenDocument = DeviceToken & Document;

@Schema()
export class DeviceToken {
  @Prop({ type: 'string' })
  @ApiProperty({
    example: '017d98e4fe1e14200254200000012345',
    description: "Notification's ID",
  })
  _id: ObjectId;

  @Prop({ type: 'string' })
  @ApiProperty({ example: 'Test', description: 'Title' })
  token: string;
}

export const DeviceTokenSchema = SchemaFactory.createForClass(DeviceToken);
