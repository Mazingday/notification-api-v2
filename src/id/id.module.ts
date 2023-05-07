import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IdService } from '@services/id';

@Module({
  imports: [HttpModule],
  providers: [IdService],
  exports: [IdService],
})
export class IdModule {}
