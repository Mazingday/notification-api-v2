import { Injectable } from '@nestjs/common';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationResponse } from './interfaces/NotificationResponse.interface';
import { FirebaseDTO } from './dto/firebaseNotification.dto';
import e from 'express';

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

    const nofifBody = {
      to: body.to,
      priority: body.priority,
      type: body.type,
      data: body.data,
      notification: {
        title: body.title,
        body: body.body,
        text: body.text,
      },
    };
    console.log(process.env.API_NOTIFICATIONS, nofifBody);

    if (process.env.ENABLE_NOTIFICATIONS === 'true') {
      try {
        return await lastValueFrom(
          this.httpService
            .post(process.env.API_NOTIFICATIONS, nofifBody, config)
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
    } else {
      return null;
    }
  }
}
