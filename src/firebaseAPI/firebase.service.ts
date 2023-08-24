import { Injectable } from '@nestjs/common';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationResponse } from './interfaces/NotificationResponse.interface';
import { FirebaseDTO } from './dto/firebaseNotification.dto';

@Injectable()
export class FirebaseService {
  constructor(private httpService: HttpService) {}

  public async sendNotifications(
    body: FirebaseDTO,
  ): Promise<NotificationResponse> {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.AUTHKEY,
      },
    };

    let notifBody;
    notifBody = {
      to: body.to,
      priority: body.priority,
      content_available: true,
    };

    if (body.isDialog) {
      notifBody = {
        ...notifBody,
        data: {
          title: body.title,
          body: body.body,
          text: body.text,
          type: body.type,
          dialogType: body.dialogType,
        },
      };
    } else {
      notifBody = {
        ...notifBody,
        notification: {
          title: body.title,
          body: body.body,
          text: body.text,
          type: body.type,
        },
        data: {
          title: body.title,
          body: body.body,
          text: body.text,
          type: body.type,
          navigateTo: body.navigateTo,
        },
      };
    }
    console.log(notifBody);
    try {
      return await lastValueFrom(
        this.httpService
          .post(process.env.API_NOTIFICATIONS, notifBody, config)
          .pipe(
            map((axiosResponse: AxiosResponse<NotificationResponse>) => {
              return axiosResponse.data;
            }),
          ),
      );
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
