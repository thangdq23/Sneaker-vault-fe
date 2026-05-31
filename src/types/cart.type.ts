import type { Product } from "./product.type";

export interface CartItem {
  _id: string;
  product: Product;
  size: number | string;
  quantity: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalPrice: number;
}
