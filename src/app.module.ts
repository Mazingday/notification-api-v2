import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '@controllers/app';
import { AppService } from '@services/app';
import { LoggerMiddleware } from '@middlewares/logger';
import { ConfigModule } from '@nestjs/config';
import { IdModule } from '@modules/id';
import { AuthModule } from '@modules/auth';
import { ThrottlerModule } from '@nestjs/throttler'
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsModule } from '@modules/notifications';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    HttpModule,
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    IdModule,
    NotificationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
