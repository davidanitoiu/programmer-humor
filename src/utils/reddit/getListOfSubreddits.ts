import { Subreddit } from "@/reddit/reddit.dto";

export function getListOfSubreddits(): Subreddit[] {
    const keys = Object.keys(Subreddit);
    const map = keys.map(key => Subreddit[key]);
    const mapWithoutAll = map.filter(subreddit => subreddit !== Subreddit.All);

    return mapWithoutAll;
}
