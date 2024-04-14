export interface User {
    id: number;
    name: string;
    avatar: string;
    bio: string;
    username: string;
    email: string;
    points: number;
    dept: string;
    github: string|null;
    linkedin: string|null;
    instagram: string|null;
}

export interface ProfileUpdateRequest  {
    name: string|null;
    bio: string|null;
    username: string|null;
    dept?: string|null;
}