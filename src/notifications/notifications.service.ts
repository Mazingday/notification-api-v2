import { Injectable } from '@nestjs/common';
// import * as OneSignal from 'onesignal-node';
import mongoose, { ObjectId } from 'mongoose';
import { Notification, NotificationDocument } from '@schemas/notification';
import {
  notificationDatas,
  NotificationDatasDocument,
} from '@schemas/deviceToken';
import {
  NotificationSchedule,
  NotificationScheduleDocument,
} from '@schemas/notificationSchedule';

import { FirebaseService } from '../firebaseAPI/firebase.service';
import { CreateNotificationBody } from './dto/CreateNotificationBody';
import { FirebaseDTO } from '../firebaseAPI/dto/firebaseNotification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdService } from '@services/id';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationsModel: Model<NotificationDocument>,
    @InjectModel(notificationDatas.name)
    private readonly deviceTokenModel: Model<NotificationDatasDocument>,
    @InjectModel(NotificationSchedule.name)
    private readonly notificationScheduleModel: Model<NotificationScheduleDocument>,
    private firebaseService: FirebaseService,

    private readonly idService: IdService,
  ) {}

  async findByIdAndUpdates(id: string | ObjectId, token: string) {
    const deviceTokens = {
      token: token,
    };
    return await this.deviceTokenModel.findByIdAndUpdate(id, deviceTokens, {
      new: true,
      upsert: true,
    });
  }
  async findByIdAndDelete(id: string | ObjectId) {
    await this.deviceTokenModel.deleteOne({ _id: id });
  }

  async findById(id: string | ObjectId) {
    return await this.deviceTokenModel.findById(id);
  }

  async storeScheduleNotification(notificationBody: CreateNotificationBody) {
    const tmpNotification: NotificationSchedule = new NotificationSchedule();
    tmpNotification._id = (await this.idService.generateId('520')).id;
    tmpNotification.body = notificationBody.body;
    tmpNotification.to = notificationBody.to;
    tmpNotification.title = notificationBody.title;
    tmpNotification.text = notificationBody.title;
    tmpNotification.priority = notificationBody.priority;
    tmpNotification.creationDate = notificationBody.send_after;
    tmpNotification.isDelevered = false;

    return this.storeNotification(tmpNotification);
  }

  public async storeNotification(
    notification: Partial<NotificationSchedule>,
  ): Promise<NotificationSchedule> {
    return this.notificationScheduleModel.create(notification);
  }

  public async sendNotification(
    notificationBody: CreateNotificationBody,
  ): Promise<Notification> {
    console.log('----------------');

    const user = await this.findById(notificationBody.user_id);
    if (user == null) return null;
    const notifBody: FirebaseDTO = {
      to: user.deviceToken,
      priority: notificationBody.priority,
      title: notificationBody.title,
      body: notificationBody.body,
      text: notificationBody.title,
    };

    const response = await this.firebaseService.sendNotifications(notifBody);
    if (response) {
      const tmpNotification: Notification = new Notification();
      tmpNotification._id = (await this.idService.generateId('520')).id;
      tmpNotification.body = notificationBody.body;
      tmpNotification.title = notificationBody.title;
      tmpNotification.text = notificationBody.title;
      tmpNotification.priority = notificationBody.priority;
      tmpNotification.creationDate = new Date();

      tmpNotification.deliveryDate = notificationBody.send_after
        ? new Date(notificationBody.send_after)
        : new Date();
      console.log(tmpNotification);
      return this.saveNotification(tmpNotification);
    }
    return null;
  }

  public async saveNotification(
    notification: Partial<Notification>,
  ): Promise<Notification> {
    return this.notificationsModel.create(notification);
  }
}
