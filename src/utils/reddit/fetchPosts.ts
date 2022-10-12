import { Subreddit, Timeframe, RedditPostDto } from "../../reddit/reddit.dto";
import axios from "axios";
import { reject, has, sortBy } from "lodash";

interface FetchArgs {
    subreddit: Subreddit;
    timeframe: Timeframe;
    limit: number;
    sorting?: string;
    after?: string;    
}

export async function fetchPosts(args:FetchArgs): Promise<RedditPostDto[]> {
    const { subreddit, timeframe, limit, sorting = 'top', after = '' } = args;

    try {
        const { data } = await axios.get(
            `https://www.reddit.com/r/${subreddit}/${sorting}.json`,
            {
                params: {
                    t: timeframe,
                    limit,
                    after
                }
            }
        );

        const posts = reject(data.data.children, entry => entry.data.stickied || entry.data.link_flair_text === 'Mod Post' || has(entry.data, 'crosspost_parent_list') || entry.data.over_18);
        const redditPosts = posts
            .map((child, i) => ({
                id: child.data.id,
                name: child.data.name,
                url: 'https://reddit.com' + child.data.permalink,
                sourceUrl: 'https://reddit.com/r/' + child.data.subreddit,
                thumbnail: child.data.thumbnail,
                media: child.data.url,
                upvotes: child.data.score,
                title: child.data.title,
                permalink: child.data.permalink,
                source: '/r/' + child.data.subreddit,
                posted: new Date(child.data.created_utc * 1000),
                after: i === 0 ? data?.data.after : posts[i - 1]?.data.name
            }))

        const sortedRedditPosts = sortBy(redditPosts, "upvotes").reverse();

        return sortedRedditPosts.slice(0, limit);

    } catch (error) {
        console.error(error);
        return [];
    }
}