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

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    created_at: string;
    updated_at: string;
}