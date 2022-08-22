// import { Test } from '@nestjs/testing';
// import { ThingsModule } from './things.module';
// import { ThingsResolver } from './things.resolver';
// import { ThingsService } from './things.service';

// describe('ThingsModule', () => {
//   it('should compile the module', async () => {
//     const module = await Test.createTestingModule({
//       imports: [ThingsModule],
//     }).compile();

//     expect(module).toBeDefined();
//     expect(module.get(ThingsResolver)).toBeInstanceOf(ThingsResolver);
//     expect(module.get(ThingsService)).toBeInstanceOf(ThingsService);
//   });
// });

import {Test} from '@nestjs/testing';
import { RedditModule } from '../reddit.module';
import { RedditService } from '../reddit.service';

describe('RedditModule', () => {
    it('should compile the module', async () => {
        const module = await Test.createTestingModule({
            imports: [RedditModule],
        }).compile();

        expect(module).toBeDefined();
        expect(module.get(RedditService)).toBeInstanceOf(RedditService);
    })
})