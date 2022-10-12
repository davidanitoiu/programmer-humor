import * as cloudscraper from "cloudscraper";
import { NineGagPostDto } from "../../9gag/9gag.dto";
import { hasTitleDevTag, isDevTag, validTags } from "./helpers";

export async function fetchPosts({ sorting = 'hot', after = null }): Promise<NineGagPostDto[]> {
    const query = `query=${validTags.join('+')}`;
    const sortingString = `type%2F${sorting}`
    const next = after ? `&c=${after}` : '';
    let currentIndex: number = after ?? 0;

    try {
        const url = `https://9gag.com/v1/search-posts?${query}${next}%2F${sortingString}`;

        //const url = `https://9gag.com/v1/tag-posts/tag/${tag}/type/${sort}${next}`
        // have typescript ignore the next line
        // @ts-ignore
        const response = await cloudscraper.get(url);

        const responseJson = JSON.parse(response);


        const posts = responseJson.data.posts
            .filter((post) => {
                // remove posts that don't contain tags related to programming
                // check post.tags, which is an array of objects with url and key properties
                currentIndex++;
                return post.tags.some(isDevTag) || hasTitleDevTag(post.title);
            })
            .filter((post) => {
                // remove nsfw posts
                currentIndex++;
                return !post.nsfw;
            })
            .map((post, i) => {
                //const sourceTag = post.tags[random(0, post.tags.length - 1)].key;
                // search the post tags for a tag related to coding or programming or programmer and use that as any of those as the source tag
                const sourceTag = post.tags.find(isDevTag) ?? post.tags[0];

                const cursorPosition = Number(currentIndex) + i;

                return {
                    id: post.id,
                    name: post.id,
                    url,
                    title: post.title,
                    media: post.images.image700.url,
                    upvotes: post.upVoteCount,
                    content: post.description,
                    content_html: null,
                    thumbnail: post.images.imageFbThumbnail.url,
                    source: `${sourceTag.url}`,
                    sourceUrl: `https://9gag.com${sourceTag.url}`,
                    posted: new Date(post.creationTs * 1000),
                    after: `c=${cursorPosition}`,
                }
            });

        return posts;

    } catch (error) {
        console.error(error);
        return [];
    }
}