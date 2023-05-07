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

    const nofifBody = {
      to: body.to,
      priority: body.priority,
      notification: {
        title: body.priority,
        body: body.body,
        text: body.text,
      },
    };

    if (process.env.ENABLE_NOTIFICATIONS === 'true') {
      return await lastValueFrom(
        this.httpService
          .post(process.env.API_NOTIFICATIONS, nofifBody, config)
          .pipe(
            map((axiosResponse: AxiosResponse<NotificationResponse>) => {
              return axiosResponse.data;
            }),
          ),
      );
    } else {
      return null;
    }
  }
}
