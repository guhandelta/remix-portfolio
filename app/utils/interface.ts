export interface Post {
    post: {
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