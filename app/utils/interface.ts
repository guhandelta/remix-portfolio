export interface Post {
    posts: {
        createdAt: string;
        id: string;
        overview: string;
        title: string;
        slug: string;
    }[] // The Post would be delivered as an array, so it should be defined as an array
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

export interface Project {
    projects: {
        id: string;
        title: string;
        link: string;
        overview: string;
        titleImage: {
            url: string
        };
        publishedAt: string;
    }[]
}
export interface Experience {
    experiences: {
        id: string;
        title: string;
        link: string;
        overview: string;
        titleImage: {
            url: string
        };
        publishedAt: string;
    }[]
}

export interface Apps {
    projects: {
        title: string;
        summary: string;
        image: {
            id: string
        };
        link: string;
        github: string;
    }[]
}