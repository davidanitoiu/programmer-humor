import { Injectable } from '@nestjs/common';
import { fetchPosts, fetchPostsFromAllSubreddits } from '../utils/reddit/helpers';
import { RedditPostDto, Timeframe } from './reddit.dto';

@Injectable()
export class RedditService {

  fetchAllSubredditPosts(args): Promise<RedditPostDto[]> {
    return fetchPostsFromAllSubreddits(args);
  }

  fetchSubredditPosts(args): Promise<RedditPostDto[]> {
    return fetchPosts(args);
  }

}
