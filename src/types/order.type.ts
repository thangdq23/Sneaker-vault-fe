import type { Product } from "./product.type";

export interface OrderItem {
  _id?: string;
  product: string | Product;
  size: number | string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  orderCode: string;
  user: string;
  items: OrderItem[];
  shippingAddress: string;
  phone: string;
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "returned";
  paymentMethod: "cod" | "card";
  paymentStatus: "pending" | "paid" | "failed";
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  shippingAddress: string;
  phone: string;
  paymentMethod: "cod" | "card";
}

export interface OrderListResponse {
  data: Order[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
