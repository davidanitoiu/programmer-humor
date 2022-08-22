import { fetchPosts, fetchPostsFromAllSubreddits } from '@/utils/reddit/helpers';
import { Injectable } from '@nestjs/common';
import { RedditPostDto, Subreddit, Timeframe } from './reddit.dto';

@Injectable()
export class RedditService {

  fetchAllSubredditPosts(timeframe: Timeframe, limit: number,): Promise<RedditPostDto[]> {
    return fetchPostsFromAllSubreddits(timeframe, limit);
  }

  fetchSubredditPosts(subreddit: Subreddit,timeframe: Timeframe,limit: number,): Promise<RedditPostDto[]> {
    return fetchPosts(subreddit, timeframe, limit);
  }

}
