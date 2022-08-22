export enum Subreddit {
  All = 'all',
  ProgrammingJokes = 'programmingjokes',
  CodingHumor = 'codinghumor',
  ProgrammerHumor = 'programmerhumor',
  ProgrammerDadJokes = 'programmerdadjokes',
}

export enum Timeframe {
  Today = 'today',
  Month = 'month',
  Year = 'year',
  All = 'all',
}

export class RedditPostDto {
  url: string;
  sourceUrl: string;
  thumbnail: string;
  media: string;
  upvotes: number;
  title: string;
  permalink: string;
  source: string;
  posted: Date;
}
