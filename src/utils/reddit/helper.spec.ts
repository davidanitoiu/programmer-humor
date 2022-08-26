import { Subreddit, Timeframe } from "../../reddit/reddit.dto";
import axios from "axios";
import * as helpers from "./helpers";
import { fetchPostsFromAllSubreddits } from "./fetchPostsFromAllSubreddits";
import { fetchPosts } from "./fetchPosts";

describe('Reddit helper utils', () => {
    it('should return an array of reddit posts', async () => {
        // mock the axios call to the reddit api and make sure the correct parameters are passed
        // const posts = await fetchPostsFromAllSubreddits(Timeframe.Today, 5);
        // expect(posts).toBeDefined();

        const limit = 3;
        const timeframe = Timeframe.Month;

        const getListOfSubredditsSpy = jest.spyOn(helpers, 'getListOfSubreddits');
        const fetchPostsSpy = jest.spyOn(helpers, 'fetchPosts').mockImplementation(() => Promise.resolve([]));

        await fetchPostsFromAllSubreddits(timeframe, limit);

        expect(getListOfSubredditsSpy).toHaveBeenCalledWith();

        expect(fetchPostsSpy).toHaveBeenCalledWith(Subreddit.CodingHumor, timeframe, limit);
        expect(fetchPostsSpy).toHaveBeenCalledWith(Subreddit.ProgrammerDadJokes, timeframe, limit);
        expect(fetchPostsSpy).toHaveBeenCalledWith(Subreddit.ProgrammerHumor, timeframe, limit);
        expect(fetchPostsSpy).toHaveBeenCalledWith(Subreddit.ProgrammingJokes, timeframe, limit);
    });

    it('should use fetchPosts to make an axios call with the correct parameters', async () => {
        const subreddit = Subreddit.ProgrammerHumor;
        const timeframe = Timeframe.Today;
        const limit = 5;
        const url = `https://www.reddit.com/r/${subreddit}/top.json?t=${timeframe}&limit=${limit}`;

/*
{
            url: 'https://reddit.com' + child.data.permalink,
            sourceUrl: 'https://reddit.com/r/' + child.data.subreddit,
            thumbnail: child.data.thumbnail,
            media: child.data.url,
            upvotes: child.data.score,
            title: child.data.title,
            permalink: child.data.permalink,
            source: '/r/' + child.data.subreddit,
            posted: new Date(child.data.created_utc * 1000),
        }

*/

        const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({
            data: {
                data: {
                    children: [
                        {
                            data: {
                                permalink: '/r/fakepermalink/someId/',
                                subreddit: 'fakesubreddit',
                                title: 'fake title',
                                thumbnail: 'https://fake.com/fake.jpg',
                                url: 'https://fake.com/fake.jpg',
                                score: 2001,
                                created_utc: 1588888888,
                            }
                        }
                    ],
                }
            }
        }));

        await fetchPosts(subreddit, timeframe, limit);

        expect(axiosSpy).toHaveBeenCalled();
        expect(axiosSpy).toHaveBeenCalledWith(url);
    })
})