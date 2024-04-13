export interface User {
    id: number;
    name: string;
    avatar: string;
    bio: string;
    username: string;
    email: string;
    points: number;
    dept: string;
}

export interface ProfileUpdateRequest  {
    name: string;
    bio: string;
    username: string;
    dept?: string;
}