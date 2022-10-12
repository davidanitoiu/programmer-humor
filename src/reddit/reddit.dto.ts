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

export enum Sorting {
  Hot = 'hot',
  Best = 'best',
  New = 'new',
  Top = 'top',
  Rising = 'rising',
  Controversial = 'controversial',
}

export class RedditPostDto {
  id: string;
  name: string;
  url: string;
  sourceUrl: string;
  thumbnail: string;
  media: string;
  upvotes: number;
  title: string;
  permalink: string;
  source: string;
  posted: Date;
  after: string;
}

