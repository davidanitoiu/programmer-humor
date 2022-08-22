import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { RedditPostDto, Subreddit, Timeframe } from './reddit.dto';

@Injectable()
export class RedditService {
    async fetchAllSubredditPosts(timeframe: Timeframe, limit: number): Promise<RedditPostDto[]> {
        const subreddits: (keyof typeof Subreddit)[] = <(keyof typeof Subreddit)[]>Object.keys(Subreddit);

        const posts = await Promise.all(
            subreddits.slice(1).map((subreddit) => this.fetchPosts(subreddit as Subreddit, timeframe, limit))
        ).then(arrays => [].concat(...arrays))

        return posts.slice(0, limit);
    }

    async fetchSubredditPosts(subreddit: Subreddit, timeframe: Timeframe, limit: number): Promise<RedditPostDto[]> {
        const posts = await this.fetchPosts(subreddit, timeframe, limit);
        return posts;
    }

    private async fetchPosts(
        subreddit: Subreddit,
        timeframe: Timeframe,
        limit: number)
        : Promise<RedditPostDto[]> {
        const url = `https://www.reddit.com/r/${subreddit}/top.json?t=${timeframe}&limit=${limit}`;
        const response = await axios.get(url);
        const { data } = await response.data;
        return data.children
            .filter(child => child.data.score > 2000)
            .map(child => ({
                url: 'https://reddit.com' + child.data.permalink,
                sourceUrl: 'https://reddit.com/r/' + child.data.subreddit,
                thumbnail: child.data.thumbnail,
                media: child.data.url,
                upvotes: child.data.score,
                title: child.data.title,
                permalink: child.data.permalink,
                source: '/r/' + child.data.subreddit,
                posted: new Date(child.data.created_utc * 1000),
            }));;
    }
}
