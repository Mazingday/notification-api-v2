import { ObjectId } from 'mongoose';

export interface Payload {
  _id: ObjectId;
  email: string;
  increment: number;
  deviceId: string;
  verified: boolean;
}
