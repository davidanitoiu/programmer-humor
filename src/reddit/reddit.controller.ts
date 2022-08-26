import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseEnumPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { RedditPostDto, Subreddit, Timeframe } from './reddit.dto';
import { RedditService } from './reddit.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('api/reddit')
export class RedditController {
  constructor(private redditService: RedditService) {}

  @ApiQuery({
    name: 'subreddit',
    description: 'The subreddit to fetch posts from',
    enum: Subreddit,
    enumName: 'Subreddit',
    required: false,
    example: Subreddit.All,
  })
  @ApiQuery({
    name: 'timeframe',
    description: 'The timeframe to fetch posts from',
    enum: Timeframe,
    enumName: 'Timeframe',
    required: false,
    example: Timeframe.Today,
  })
  @ApiQuery({
    name: 'limit',
    description:
      'The number of posts to fetch. The list returns the most upvoted posts.',
    type: Number,
    required: false,
    example: 5,
  })
  @Get()
  async getPosts(
    @Query(
      'subreddit',
      new DefaultValuePipe(Subreddit.All),
      new ParseEnumPipe(Subreddit),
    )
    subreddit: Subreddit,
    @Query(
      'timeframe',
      new DefaultValuePipe(Timeframe.Today),
      new ParseEnumPipe(Timeframe),
    )
    timeframe: Timeframe,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<RedditPostDto[]> {
    return subreddit === Subreddit.All
      ? this.redditService.fetchAllSubredditPosts(timeframe, limit)
      : this.redditService.fetchSubredditPosts(subreddit, timeframe, limit);
  }
}
