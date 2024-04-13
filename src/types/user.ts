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
    name: string|null;
    bio: string|null;
    username: string|null;
    dept?: string|null;
}