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
        let posts = []
        
        posts = await this.nineGagService.fetchAllProgrammingPosts({ sorting, after });

        // sometimes the first response is empty, so we fetch again
        if (!(posts?.length)) {
            console.log('9gag posts were empty, fetching again');
            posts = await this.nineGagService.fetchAllProgrammingPosts({ sorting, after });;
        }

        return posts;
    }
}