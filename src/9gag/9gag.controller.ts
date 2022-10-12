import { Controller, DefaultValuePipe, Get, ParseEnumPipe, Query } from "@nestjs/common";
import { NineGagSorting } from "./9gag.dto";
import { NineGagService } from "./9gag.service";

@Controller('api/9gag')
export class NineGagController {
    constructor(private nineGagService: NineGagService) { }

    @Get()
    async getProgrammingPosts(
        @Query(
            'sorting',
            new DefaultValuePipe(NineGagSorting.Hot),
            new ParseEnumPipe(NineGagSorting),
        ) sorting: NineGagSorting,
        // after is an optional parameter that is used to fetch the next page of posts
        @Query('after') after?: string
    ) {
        // await this.nineGagService.fetchAllProgrammingPosts({ sorting, after });
        // sometimes the 9gag api returns an empty array, so we need to retry
        // sometimes there's a lot of filtered posts, so keep fetching until we get at least 10 posts total
        // trim the array to 10 posts
        // each post slice has a property 'after' that is used to fetch the next page of posts
        // stop fetching if some of the new posts are already in the array

        // let posts = await this.nineGagService.fetchAllProgrammingPosts({ sorting, after });
        // let totalPosts = posts.length;
        // while (posts.length === 0 || totalPosts < 10) {
        //     const lastPost = posts[posts.length - 1];
        //     posts = await this.nineGagService.fetchAllProgrammingPosts({ sorting, after: lastPost.after });
        //     totalPosts += posts.length;
        // }
        // return posts.slice(0, 10);

        let posts = await this.nineGagService.fetchAllProgrammingPosts({ sorting, after });
        let totalPosts = posts.length;
        while (posts.length === 0 || totalPosts < 10) {
            const lastPost = posts[posts.length - 1];
            const newPosts = await this.nineGagService.fetchAllProgrammingPosts({ sorting, after: lastPost.after });
            totalPosts += newPosts.length;
            posts = posts.concat(newPosts);
        }
        return posts.slice(0, 10);
    }
}