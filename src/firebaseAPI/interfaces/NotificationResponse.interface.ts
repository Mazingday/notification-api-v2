import { ObjectId } from 'mongoose';

export interface NotificationResponse {
  id: ObjectId;
  multicast_id: string;
  success: boolean;
  failure: 0;
  canonical_ids: boolean;
  results: any;
}
