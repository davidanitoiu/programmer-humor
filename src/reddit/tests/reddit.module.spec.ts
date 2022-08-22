import { Test } from '@nestjs/testing';
import { RedditModule } from '../reddit.module';
import { RedditService } from '../reddit.service';

describe('RedditModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [RedditModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(RedditService)).toBeInstanceOf(RedditService);
  });
});
