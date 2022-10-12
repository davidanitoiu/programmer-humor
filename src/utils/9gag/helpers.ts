interface Tag {
    url: string;
    key: string;
}

export const validTags = ['programming', 'coding', 'code', 'tech', 'developer', 'webdev', 'web-dev', 'software'];

export const isDevTag = (tag: Tag): boolean => {
    return validTags.some((devTag) => tag.url.includes(devTag));
}

export const hasTitleDevTag = (title: string): boolean => {
    return validTags.some((devTag) => title.toLowerCase().includes(devTag));
}