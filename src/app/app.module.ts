import { Module } from '@nestjs/common';
import { NineGagModule } from '../9gag/9gag.module';
import { RedditModule } from '../reddit/reddit.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [RedditModule, NineGagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
