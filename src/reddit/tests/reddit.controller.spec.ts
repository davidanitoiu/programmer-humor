import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { RedditController } from '../reddit.controller';
import { RedditService } from '../reddit.service';

describe('RedditController', () => {
  let instance: INestApplication;
  let redditController: RedditController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedditController],
      providers: [RedditService],
    }).compile();

    redditController = module.get<RedditController>(RedditController);
    instance = module.createNestApplication();
    await instance.init();
  });

  it('should be defined', () => {
    expect(redditController).toBeDefined();
  });

  it('should return an array of reddit posts', async () => {
    const result = await request(instance.getHttpServer()).get('/reddit');
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });

  it('should return an array of reddit posts with a limit', async () => {
    const result = await request(instance.getHttpServer()).get(
      '/reddit?limit=5',
    );
    expect(result.status).toBe(200);
    expect(result.body.length).toBe(5);
  });

  it('should return an array of reddit posts with a subreddit', async () => {
    const result = await request(instance.getHttpServer()).get(
      '/reddit?subreddit=programmerhumor',
    );

    expect(result.status).toBe(200);
    expect(result.body.length).toBe(5);
  });

  it('should return an array of reddit posts with a subreddit and a limit', async () => {
    const result = await request(instance.getHttpServer()).get(
      '/reddit?subreddit=programmerhumor&limit=5',
    );
    expect(result.status).toBe(200);
    expect(result.body.length).toBe(5);
  });

  it('should return an array of reddit posts with a subreddit and a timeframe', async () => {
    const result = await request(instance.getHttpServer()).get(
      '/reddit?subreddit=programmerhumor&timeframe=today',
    );
    expect(result.status).toBe(200);
  });

  it('should return an array of reddit posts with a subreddit, a timeframe and a limit', async () => {
    const result = await request(instance.getHttpServer()).get(
      '/reddit?subreddit=programmerhumor&timeframe=today&limit=5',
    );
    expect(result.status).toBe(200);
    expect(result.body.length).toBe(5);
  });

  it('should return an array of reddit posts with a timeframe', async () => {
    const result = await request(instance.getHttpServer()).get(
      '/reddit?timeframe=today',
    );
    expect(result.status).toBe(200);
    expect(result.body.length).toBe(5);
  });

  it('should return an array of reddit posts with a timeframe and a limit', async () => {
    const result = await request(instance.getHttpServer()).get(
      '/reddit?timeframe=today&limit=5',
    );
    expect(result.status).toBe(200);
    expect(result.body.length).toBe(5);
  });
});
