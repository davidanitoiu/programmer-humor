import { Module } from '@nestjs/common';
import { NineGagService } from './9gag.service';
import { NineGagController } from './9gag.controller';

@Module({
  controllers: [NineGagController],
  providers: [NineGagService],
})
export class NineGagModule {}
