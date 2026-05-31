import apiClient from "./apiClient";
import type { Cart } from "../types/cart.type";

export const getCart = async (): Promise<Cart> => {
  const response = await apiClient.get<Cart>("/cart");
  return response.data;
};

export const addToCart = async (
  productId: string,
  size: number | string,
  quantity: number
): Promise<Cart> => {
  const response = await apiClient.post<Cart>("/cart/add", {
    productId,
    size,
    quantity,
  });
  return response.data;
};

export const updateCartItem = async (
  itemId: string,
  quantity: number
): Promise<Cart> => {
  const response = await apiClient.put<Cart>(`/cart/item/${itemId}`, {
    quantity,
  });
  return response.data;
};

export const removeCartItem = async (itemId: string): Promise<Cart> => {
  const response = await apiClient.delete<Cart>(`/cart/item/${itemId}`);
  return response.data;
};

export const clearCart = async (): Promise<{ items: []; totalPrice: number }> => {
  const response = await apiClient.delete<{ items: []; totalPrice: number }>("/cart/clear");
  return response.data;
};
