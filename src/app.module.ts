import { Module } from '@nestjs/common';
import { RedditModule } from './reddit/reddit.module';

@Module({
    imports: [RedditModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
