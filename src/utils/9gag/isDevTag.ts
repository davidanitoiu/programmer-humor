interface Tag {
    url: string;
    key: string;
}


export const isDevTag = (tag: Tag): boolean => {
    const devTags = ['programming', 'coding', 'code', 'tech', 'technology', 'developer', 'developers', 'webdev', 'webdevs', 'web-development', 'web-developer', 'web-developers'];

    return devTags.some((devTag) => tag.url.includes(devTag));
}
