export interface User {
    id: number;
    name: string;
    avatar: string;
    bio: string;
    username: string;
    email: string;
    points: number;
    dept: string;
    github: string | null;
    linkedin: string | null;
    instagram: string | null;
    created_at: string;
}

export interface ProfileUpdateRequest  {
    name: string|null;
    bio: string|null;
    username: string|null;
    dept?: string|null;
}

export interface ProfileLinksRequest {
    github: string | null;
    linkedin: string | null;
    instagram: string | null;
}

export interface ProfileAvatarRequest {
    avatar_url: string;
}

export interface AdminUser {
    id: number;
    created_at: any;
    is_active: boolean;
    private: boolean;
    name: string;
    avatar: string;
    bio: string;
    username: string;
    email: string;
    points: number;
    dept: string;
    github: string | null;
    linkedin: string | null;
    instagram: string | null;
}

export interface UserPage {
    items: Array<AdminUser>;
    total: number;
    page: number;
    size: number;
    pages: number;
}