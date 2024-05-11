export interface Order {
    name: string;
    id: number;
    product: string;
    product_id: number;
    product_img: string;
    status: string;
    created_at: string;
}

export interface OrderPage {
    items: Array<Order>;
    total: number;
    page: number;
    size: number;
    pages: number;
}
