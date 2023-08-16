import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Get,
  Req,
  Headers,
  Res,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBasicAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateNotificationBody } from './dto/CreateNotificationBody';
import { SendNotificationDTO } from '@dto/sendNotification';
import { MarkReadDTO } from '@dto/markRead';

import { NotificationsService } from '@services/notifications';

@Controller('v2/notifications')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationsService) {}

  @UseGuards(AuthGuard('basic'))
  @Post('/')
  @ApiOperation({ summary: 'Send notification' })
  @ApiBasicAuth()
  public async sendNotification(
    @Res() res,
    @Req() req,
    @Body() sendNotificationDto: SendNotificationDTO,
  ) {
    const notificationBody: CreateNotificationBody = {
      user_id: sendNotificationDto.userId,
      email: sendNotificationDto.email,
      title: sendNotificationDto.title,
      priority: sendNotificationDto.priority,
      body: sendNotificationDto.body,
      type: sendNotificationDto.type,
      data: sendNotificationDto.data,
      isPopUp: sendNotificationDto.isPopUp,
    };

    const notification = await this.notificationService.sendNotification(
      notificationBody,
    );
    if (notification === null)
      return res
        .status(HttpStatus.OK)
        .json({ notification: 'notification not send' });
    return res.status(HttpStatus.OK).json({ notification });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/fatchNotification')
  @ApiOperation({ summary: 'Get notification' })
  @ApiBasicAuth()
  public async fatchNotification(@Req() req, @Res() res) {
    const notification = await this.notificationService.getNotification(
      req.user._id,
    );

    return res.status(HttpStatus.OK).json({ notification });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/markRead')
  @ApiOperation({ summary: 'mark read notification' })
  public async markReadNotification(@Res() res, @Req() req) {
    await this.notificationService.updateNotificationData(req.user._id);
    console.log(req.user._id);

    return res
      .status(HttpStatus.OK)
      .json({ success: true, message: 'Notification Data updated' });
  }
}
