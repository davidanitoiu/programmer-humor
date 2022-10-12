import { Test, TestingModule } from '@nestjs/testing';
import { Subreddit, Timeframe } from '../reddit.dto';
import { RedditService } from '../reddit.service';
import * as helpers from '../../utils/reddit/helpers';

export const templateGenerator = (subreddit) => ({
  url: 'https://reddit.com',
  sourceUrl: 'https://reddit.com',
  thumbnail: 'https://reddit.com',
  media: 'https://reddit.com',
  upvotes: 1,
  title: 'title',
  permalink: 'https://reddit.com',
  source: '/r/' + subreddit,
  posted: new Date(1661094988),
});

describe('RedditService', () => {
  let service: RedditService;
  const fetchAllSpy = jest.spyOn(
    RedditService.prototype,
    'fetchAllSubredditPosts',
  );
  const fetchSpy = jest.spyOn(RedditService.prototype, 'fetchSubredditPosts');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedditService],
    }).compile();

    service = module.get<RedditService>(RedditService);
  });

  afterEach(() => {
    fetchAllSpy.mockClear();
    fetchSpy.mockClear();
  }),

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of reddit posts', async () => {
    const serviceSpy = jest.spyOn(helpers, 'fetchPostsFromAllSubreddits');
    serviceSpy.mockImplementationOnce(() => Promise.resolve([]));

    const timeframe = Timeframe.Today;
    const limit = 5;
    
    service.fetchAllSubredditPosts({timeframe, limit});

    expect(serviceSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalledWith({timeframe, limit});
  });

  it('should return an array of reddit posts with a subreddit', async () => {
    const serviceSpy = jest.spyOn(helpers, 'fetchPosts');
    serviceSpy.mockImplementationOnce(() => Promise.resolve([]));

    const subreddit = Subreddit.ProgrammerHumor;
    const timeframe = Timeframe.Today;
    const limit = 5;
    
    service.fetchSubredditPosts({subreddit, timeframe, limit});

    expect(serviceSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalledWith({subreddit, timeframe, limit});
  });
});
