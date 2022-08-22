import { Module } from '@nestjs/common';
import { RedditModule } from '../reddit/reddit.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [RedditModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
