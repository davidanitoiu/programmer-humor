
import { Controller, DefaultValuePipe, Get, ParseEnumPipe, ParseIntPipe, Query } from '@nestjs/common';
import { RedditPostDto, Subreddit, Timeframe } from './reddit.dto';
import { RedditService } from './reddit.service';

@Controller('reddit')
export class RedditController {
  constructor(private redditService: RedditService) { }

  @Get()
  async getPosts(
    @Query('subreddit',  new DefaultValuePipe(Subreddit.All), new ParseEnumPipe(Subreddit)) subreddit: Subreddit,
    @Query('timeframe',  new DefaultValuePipe(Timeframe.Today), new ParseEnumPipe(Timeframe)) timeframe: Timeframe,
    @Query('limit',  new DefaultValuePipe(5), ParseIntPipe) limit: number
  ): Promise<RedditPostDto[]> {
    return (subreddit === Subreddit.All)
      ? this.redditService.fetchAllSubredditPosts(timeframe, limit)
      : this.redditService.fetchSubredditPosts(subreddit, timeframe, limit);

  }
}
