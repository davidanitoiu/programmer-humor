/*
    {"posts":[{"title":"Hahaha, classic :)","id":"aeQ3BO5","name":"aeQ3BO5","url":"http://9gag.com/gag/aeQ3BO5","image":"https://img-9gag-fun.9cache.com/photo/aeQ3BO5_700b.jpg","upvotes":501,"nsfw":0,"content":{"url":"http://9gag.com/gag/aeQ3BO5","selftext":"","selftext_html":null,"thumbnail":"https://img-9gag-fun.9cache.com/photo/aeQ3BO5_fbthumbnail.jpg"},"source":{"label":"tag/programming","link":"https://9gag.com/tag/programming"}},{"title":"I use this more than a full stop 💀","id":"aYVWwgN","name":"aYVWwgN","url":"http://9gag.com/gag/aYVWwgN","image":"https://img-9gag-fun.9cache.com/photo/aYVWwgN_700b.jpg","upvotes":169,"nsfw":0,"content":{"url":"http://9gag.com/gag/aYVWwgN","selftext":"","selftext_html":null,"thumbnail":"https://img-9gag-fun.9cache.com/photo/aYVWwgN_fbthumbnail.jpg"},"source":{"label":"tag/Funny","link":"https://9gag.com/tag/Funny"}},{"title":"Some poetry","id":"adPNxvZ","name":"adPNxvZ","url":"http://9gag.com/gag/adPNxvZ","image":"https://img-9gag-fun.9cache.com/photo/adPNxvZ_700b.jpg","upvotes":787,"nsfw":0,"content":{"url":"http://9gag.com/gag/adPNxvZ","selftext":"","selftext_html":null,"thumbnail":"https://img-9gag-fun.9cache.com/photo/adPNxvZ_fbthumbnail.jpg"},"source":{"label":"tag/programmer humor","link":"https://9gag.com/tag/programmer humor"}},{"title":"Why do lawyers get paid so much when people can read the constitution for free?","id":"aA0r3pZ","name":"aA0r3pZ","url":"http://9gag.com/gag/aA0r3pZ","image":"https://img-9gag-fun.9cache.com/photo/aA0r3pZ_700b.jpg","upvotes":699,"nsfw":0,"content":{"url":"http://9gag.com/gag/aA0r3pZ","selftext":"","selftext_html":null,"thumbnail":"https://img-9gag-fun.9cache.com/photo/aA0r3pZ_fbthumbnail.jpg"},"source":{"label":"tag/Funny","link":"https://9gag.com/tag/Funny"}},{"title":"And that's why I hate dealing with memory management","id":"adPNm8j","name":"adPNm8j","url":"http://9gag.com/gag/adPNm8j","image":"https://img-9gag-fun.9cache.com/photo/adPNm8j_700b.jpg","upvotes":299,"nsfw":0,"content":{"url":"http://9gag.com/gag/adPNm8j","selftext":"","selftext_html":null,"thumbnail":"https://img-9gag-fun.9cache.com/photo/adPNm8j_fbthumbnail.jpg"},"source":{"label":"tag/programming","link":"https://9gag.com/tag/programming"}},{"title":"Programmer Psycho","id":"a8qbdVQ","name":"a8qbdVQ","url":"http://9gag.com/gag/a8qbdVQ","image":"https://img-9gag-fun.9cache.com/photo/a8qbdVQ_460s.jpg","upvotes":1409,"nsfw":0,"content":{"url":"http://9gag.com/gag/a8qbdVQ","selftext":"","selftext_html":null,"thumbnail":"https://img-9gag-fun.9cache.com/photo/a8qbdVQ_fbthumbnail.jpg"},"source":{"label":"tag/american psycho","link":"https://9gag.com/tag/american psycho"}},{"title":"Anon is shopping online","id":"aDY0g3w","name":"aDY0g3w","url":"http://9gag.com/gag/aDY0g3w","image":"https://img-9gag-fun.9cache.com/photo/aDY0g3w_700b.jpg","upvotes":286,"nsfw":0,"content":{"url":"http://9gag.com/gag/aDY0g3w","selftext":"","selftext_html":null,"thumbnail":"https://img-9gag-fun.9cache.com/photo/aDY0g3w_fbthumbnail.jpg"},"source":{"label":"tag/programmer humor","link":"https://9gag.com/tag/programmer humor"}},{"title":"Sadly, I can relate now","id":"aDYA1Xx","name":"aDYA1Xx","url":"http://9gag.com/gag/aDYA1Xx","image":"https://img-9gag-fun.9cache.com/photo/aDYA1Xx_460s.jpg","upvotes":745,"nsfw":0,"content":{"url":"http://9gag.com/gag/aDYA1Xx","selftext":"","selftext_html":null,"thumbnail":"https://img-9gag-fun.9cache.com/photo/aDYA1Xx_fbthumbnail.jpg"},"source":{"label":"tag/IT","link":"https://9gag.com/tag/IT"}},{"title":"Make sense","id":"aGEw8xK","name":"aGEw8xK","url":"http://9gag.com/gag/aGEw8xK","image":"https://img-9gag-fun.9cache.com/photo/aGEw8xK_700b.jpg","upvotes":357,"nsfw":0,"content":{"url":"http://9gag.com/gag/aGEw8xK","selftext":"","selftext_html":null,"thumbnail":"https://img-9gag-fun.9cache.com/photo/aGEw8xK_fbthumbnail.jpg"},"source":{"label":"tag/Funny","link":"https://9gag.com/tag/Funny"}},{"title":"Which one are you?","id":"amA0BP4","name":"amA0BP4","url":"http://9gag.com/gag/amA0BP4","image":"https://img-9gag-fun.9cache.com/photo/amA0BP4_700b.jpg","upvotes":6752,"nsfw":0,"content":{"url":"http://9gag.com/gag/amA0BP4","selftext":"","selftext_html":null,"thumbnail":"https://img-9gag-fun.9cache.com/photo/amA0BP4_fbthumbnail.jpg"},"source":{"label":"tag/Funny","link":"https://9gag.com/tag/Funny"}}],"last":"c=10"}
*/

export enum NineGagSorting {
    Hot = 'hot',
    Fresh = 'fresh',
}

export class NineGagPostDto {
    id: string;
    name: string;
    url: string;
    sourceUrl: string;
    thumbnail: string;
    content: string;
    content_html: string;
    media: string;
    upvotes: number;
    title: string;
    permalink: string;
    source: string;
    posted: Date;
    after: string;
}