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
        return await this.nineGagService.fetchAllProgrammingPosts({ sorting, after });
    }
}