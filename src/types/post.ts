export interface Post {
    id: number;
    user_id: number;
    content: string;
    likes: number;
    date: string;
    user: {
        id: number;
        name: string;
        avatar: string;
        username: string;
        dept: string;
    };
    new?: boolean;
    liked: boolean;
}

export interface PostPage {
    items: Post[];
    total: number;
    page: number;
    pages: number;
    size: number;
    sort: string;
}
