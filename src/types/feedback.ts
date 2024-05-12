export interface Feedback {
    name: string;
    email: string;
    feedback: string;
    created_at: string;
    id: number;
    status: string;
}

export interface FeedbackPage {
    items: Feedback[];
    total: number;
    page: number;
    pages: number;
    size: number;
    sort: string;
}
