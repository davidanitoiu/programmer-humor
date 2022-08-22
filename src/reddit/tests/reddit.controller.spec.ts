import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { RedditController } from '../reddit.controller';
import { Subreddit, Timeframe } from '../reddit.dto';
import { RedditService } from '../reddit.service';

describe('RedditController', () => {
  let instance: INestApplication;
  let redditController: RedditController;
  const fetchAllSpy = jest.spyOn(
    RedditService.prototype,
    'fetchAllSubredditPosts',
  );
  const fetchSpy = jest.spyOn(RedditService.prototype, 'fetchSubredditPosts');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedditController],
      providers: [
        {
          provide: RedditService,
          useValue: {
            fetchAllSubredditPosts: fetchAllSpy.mockImplementation(jest.fn()),
            fetchSubredditPosts: fetchSpy.mockImplementation(jest.fn()),
          },
        },
      ],
    }).compile();

    redditController = module.get<RedditController>(RedditController);
    instance = module.createNestApplication();
    await instance.init();
  });

  afterEach(async () => {
    // reset spies
    fetchAllSpy.mockReset();
    fetchSpy.mockReset();
  });

  it('should be defined', () => {
    expect(redditController).toBeDefined();
  });

  it('should return an array of reddit posts', async () => {
    const result = await request(instance.getHttpServer()).get('/reddit');
    expect(result.status).toBe(200);

    expect(fetchAllSpy).toHaveBeenCalledTimes(1);
    expect(fetchAllSpy).toHaveBeenCalledWith(Timeframe.Today, 5);
  });

  it('should return an array of reddit posts with a limit', async () => {
    const timeframe = Timeframe.Today;
    const limit = 3;
    const result = await request(instance.getHttpServer()).get(
      '/reddit?limit=' + limit,
    );
    expect(result.status).toBe(200);

    expect(fetchAllSpy).toHaveBeenCalledTimes(1);
    expect(fetchAllSpy).toHaveBeenCalledWith(timeframe, limit);
  });

  it('should return an array of reddit posts with a subreddit', async () => {
    const subreddit = Subreddit.ProgrammerHumor;
    const timeframe = Timeframe.Today;
    const limit = 3;

    const result = await request(instance.getHttpServer()).get(
      '/reddit?subreddit=' + subreddit + '&limit=' + limit,
    );
    expect(result.status).toBe(200);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(subreddit, timeframe, limit);
  });

  it('should return an array of reddit posts with a subreddit and a limit', async () => {
    const subreddit = Subreddit.ProgrammerHumor;
    const timeframe = Timeframe.Today;
    const limit = 3;

    const result = await request(instance.getHttpServer()).get(
      '/reddit?subreddit=' + subreddit + '&limit=' + limit,
    );
    expect(result.status).toBe(200);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(subreddit, timeframe, limit);
  });

  it('should return an array of reddit posts with a subreddit and a timeframe', async () => {
    const subreddit = Subreddit.ProgrammerHumor;
    const timeframe = Timeframe.Today;
    const limit = 3;

    const result = await request(instance.getHttpServer()).get(
      '/reddit?subreddit=' +
        subreddit +
        '&timeframe=' +
        timeframe +
        '&limit=' +
        limit,
    );
    expect(result.status).toBe(200);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(subreddit, timeframe, limit);
  });

  it('should return an array of reddit posts with a subreddit, a timeframe and a limit', async () => {
    const subreddit = Subreddit.ProgrammerHumor;
    const timeframe = Timeframe.Today;
    const limit = 3;

    const result = await request(instance.getHttpServer()).get(
      '/reddit?subreddit=' +
        subreddit +
        '&timeframe=' +
        timeframe +
        '&limit=' +
        limit,
    );
    expect(result.status).toBe(200);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(subreddit, timeframe, limit);
  });

  it('should return an array of reddit posts with a timeframe', async () => {
    const timeframe = Timeframe.Today;
    const limit = 3;

    const result = await request(instance.getHttpServer()).get(
      '/reddit?timeframe=' + timeframe + '&limit=' + limit,
    );
    expect(result.status).toBe(200);

    expect(fetchAllSpy).toHaveBeenCalledTimes(1);
    expect(fetchAllSpy).toHaveBeenCalledWith(timeframe, limit);
  });

  it('should return an array of reddit posts with a timeframe and a limit', async () => {
    const timeframe = Timeframe.Today;
    const limit = 3;

    const result = await request(instance.getHttpServer()).get(
      '/reddit?timeframe=' + timeframe + '&limit=' + limit,
    );
    expect(result.status).toBe(200);

    expect(fetchAllSpy).toHaveBeenCalledTimes(1);
    expect(fetchAllSpy).toHaveBeenCalledWith(timeframe, limit);
  });
});
