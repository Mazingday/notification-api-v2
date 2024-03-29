import { Injectable } from '@nestjs/common';
// import * as OneSignal from 'onesignal-node';
import mongoose, { ObjectId } from 'mongoose';
import { Notification, NotificationDocument } from '@schemas/notification';
import {
  notificationDatas,
  NotificationDatasDocument,
} from '@schemas/deviceToken';
import { Cron, CronExpression } from '@nestjs/schedule';

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

  async getNotification(id: string | ObjectId) {
    return await this.notificationsModel
      .find({
        userId: id,
        showOnNotification: true,
        isRead: false,
      })
      .select('text userId _id body title deliveryDate');
  }

  async updateNotificationData(id: string | ObjectId) {
    return this.notificationsModel.updateMany(
      { userId: id, isRead: false },
      { isRead: true },
      { new: true, setDefaultsOnInsert: true, timestamps: false },
    );
  }

  async getNotificationCounts(id: string | ObjectId, date: Date) {
    const getNotif = await this.notificationsModel
      .find({
        userId: id,
        isRead: false,
      })
      .select('text userId _id body title deliveryDate');
    const result = getNotif.filter(
      (item) => new Date(date) <= new Date(item.deliveryDate),
    );
    return result;
  }

  public async sendNotification(
    notificationBody: CreateNotificationBody,
  ): Promise<Notification> {
    console.log('----------------1234');

    const user = await this.findById(notificationBody.user_id);
    if (user.deviceToken == null) return null;
    const notifBody: FirebaseDTO = {
      to: user.deviceToken,
      priority: notificationBody.priority,
      title: notificationBody.title,
      body: notificationBody.body,
      text: notificationBody.title,
      type: notificationBody.type,
      data: notificationBody.data,
      isDialog: notificationBody.isDialog,
      navigateTo: notificationBody.navigateTo,
      dialogType: notificationBody.dialogType,
    };
    if (user.deviceToken == null && user.notification != false) return null;
    const response = await this.firebaseService.sendNotifications(notifBody);
    if (response) {
      const tmpNotification: Notification = new Notification();
      tmpNotification._id = (await this.idService.generateId('520')).id;
      tmpNotification.body = notificationBody.body;
      tmpNotification.title = notificationBody.title;
      tmpNotification.text = notificationBody.title;
      tmpNotification.priority = notificationBody.priority;
      tmpNotification.userId = notificationBody.user_id;

      tmpNotification.creationDate = new Date();
      tmpNotification.showOnNotification =
        notificationBody.isDialog === true ||
        notificationBody.isFriendRequest === true
          ? false
          : true;
      tmpNotification.isRead = false;
      tmpNotification.deliveryDate = new Date();
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
