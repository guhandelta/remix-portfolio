export interface Post {
    posts: {
        createdAt: string;
        id: string;
        overview: string;
        title: string;
        slug: string;
    }[]
}

export interface PostId {
    post: {
        id: string;
        overview: string;
        title: string;
        slug: string;
        publishedAt: string;
        body: any;
    }[]
}