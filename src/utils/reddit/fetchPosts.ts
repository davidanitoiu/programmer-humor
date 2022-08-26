import { Subreddit, Timeframe, RedditPostDto } from "../../reddit/reddit.dto";
import axios from "axios";

export async function fetchPosts(subreddit: Subreddit, timeframe: Timeframe, limit: number): Promise<RedditPostDto[]> {
    const url = `https://www.reddit.com/r/${subreddit}/top.json?t=${timeframe}&limit=${limit}`;
    const response = await axios.get(url);
    const { data } = response.data;
    return data.children
        .map((child) => ({
            url: 'https://reddit.com' + child.data.permalink,
            sourceUrl: 'https://reddit.com/r/' + child.data.subreddit,
            thumbnail: child.data.thumbnail,
            media: child.data.url,
            upvotes: child.data.score,
            title: child.data.title,
            permalink: child.data.permalink,
            source: '/r/' + child.data.subreddit,
            posted: new Date(child.data.created_utc * 1000),
        }))
        .sort((a, b) => b.upvotes - a.upvotes);        
}