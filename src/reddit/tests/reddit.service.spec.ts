import { Test, TestingModule } from '@nestjs/testing';
import { Subreddit, Timeframe } from '../reddit.dto';
import { RedditService } from '../reddit.service';

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
})

export const MockRedditService = {
  provide: RedditService,
  useValue: {
    fetchAllSubredditPosts: jest.fn((timeframe: Timeframe, limit: number) => {
      // return an array of templates matching the length of the limit
      return Array(limit).fill(templateGenerator(Subreddit.ProgrammerHumor));
    }),
    fetchSubredditPosts: jest.fn((subreddit: Subreddit, timeframe: Timeframe, limit: number) => {
      // return an array of templates matching the length of the limit
      return Array(limit).fill(templateGenerator(subreddit));
    }),
  }
}

describe('RedditService', () => {
  let service: RedditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MockRedditService],
    }).compile();

    service = module.get<RedditService>(RedditService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  })

  it('should return an array of reddit posts', async () => {
    const serviceSpy = jest.spyOn(service, 'fetchAllSubredditPosts');
    serviceSpy.mockImplementationOnce(() => Promise.resolve([]));

    const timeframe = Timeframe.Today;
    const limit = 5;
    await service.fetchAllSubredditPosts(timeframe, limit);

    expect(serviceSpy).toHaveBeenCalledWith(timeframe, limit);
  })

  it('should return an array of reddit posts with a subreddit', async () => {
    const serviceSpy = jest.spyOn(service, 'fetchSubredditPosts');
    serviceSpy.mockImplementationOnce(() => Promise.resolve([]));

    const subreddit = Subreddit.ProgrammerHumor;
    const timeframe = Timeframe.Today;
    const limit = 5;
    await service.fetchSubredditPosts(subreddit, timeframe, limit);

    expect(serviceSpy).toHaveBeenCalledWith(subreddit, timeframe, limit);
  })


});
