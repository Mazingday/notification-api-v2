import { Module } from '@nestjs/common';
import { NotificationsService } from '@services/notifications';
import { NotificationsController } from '@controllers/notifications';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema, Notification } from '@schemas/notification';
import { FirebaseModule } from '../firebaseAPI/firebase.module';

import { DeviceToken, DeviceTokenSchema } from '@schemas/deviceToken';
import {
  NotificationSchedule,
  NotificationScheduleSchema,
} from '@schemas/notificationSchedule';

import { IdModule } from '@modules/id';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Notification.name,
        schema: NotificationSchema,
      },
      {
        name: DeviceToken.name,
        schema: DeviceTokenSchema,
      },
      {
        name: NotificationSchedule.name,
        schema: NotificationScheduleSchema,
      },
    ]),
    IdModule,
    FirebaseModule,
  ],
  providers: [NotificationsService],
  controllers: [NotificationsController],
  exports: [NotificationsService],
})
export class NotificationsModule {}
