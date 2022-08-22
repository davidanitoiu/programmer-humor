import { Timeframe, RedditPostDto, Subreddit } from "@/reddit/reddit.dto";
import { getListOfSubreddits, fetchPosts } from "./helpers";

export function fetchPostsFromAllSubreddits(
    timeframe: Timeframe,
    limit: number,
): Promise<RedditPostDto[]> {
    const subreddits = getListOfSubreddits(); // skip the entry 'All', it would fetch from the whole of reddit
    const promises = subreddits.map((subredditKey) =>
        fetchPosts(subredditKey as Subreddit, timeframe, limit)
    );
    return Promise.all(promises).then((posts) =>
        posts.reduce((acc, curr) => {
            return acc.concat(curr);
        }).slice(0, limit)
    );
}