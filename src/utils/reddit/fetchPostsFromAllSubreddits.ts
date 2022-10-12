import { sortBy } from 'lodash';
import { RedditPostDto, Timeframe } from "../../reddit/reddit.dto";
import { fetchPosts, getListOfSubreddits } from "./helpers";

interface FetchAllArgs {
    timeframe: Timeframe;
    limit: number;
    sorting?: string;
    after?: string;
}

export function fetchPostsFromAllSubreddits(args: FetchAllArgs): Promise<RedditPostDto[]> {
    const subreddits = getListOfSubreddits(); // skip the entry 'All', it would fetch from the whole of reddit
    const promises = subreddits.map((subredditKey) =>
        fetchPosts({
            subreddit: subredditKey,
            ...args
        })
    );
    return Promise.all(promises).then((posts) => {
        const mergedPosts = posts.reduce((acc, curr) => {
            return acc.concat(curr);
        }, []);

        const sortedMergedPosts = sortBy(mergedPosts, "upvotes").reverse();

        console.dir(sortedMergedPosts);

        return sortedMergedPosts.slice(0, args?.limit);
    });
}