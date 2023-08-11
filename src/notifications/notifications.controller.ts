import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Get,
  Req,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBasicAuth, ApiOperation } from '@nestjs/swagger';
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

  @UseGuards(AuthGuard('basic'))
  @Get('/fatchNotification/:id')
  @ApiOperation({ summary: 'Get notification' })
  @ApiBasicAuth()
  public async fatchNotification(
    @Req() req,
    @Res() res,
    @Param('id') id: string,
  ) {
    const notification = await this.notificationService.getNotification(id);

    return res.status(HttpStatus.OK).json({ notification });
  }

  @UseGuards(AuthGuard('basic'))
  @Post('/markRead')
  @ApiOperation({ summary: 'mark read notification' })
  @ApiBasicAuth()
  public async markReadNotification(
    @Res() res,
    @Req() req,
    @Body() markReadDto: MarkReadDTO,
  ) {
    const notificationId = markReadDto.notificationId;

    await this.notificationService.updateNotificationData(notificationId);

    return res
      .status(HttpStatus.OK)
      .json({ success: true, message: 'Notification Data updated' });
  }
}
