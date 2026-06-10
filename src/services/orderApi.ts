import apiClient from "./apiClient";
import type { Order, CreateOrderRequest, OrderListResponse } from "../types/order.type";

export const createOrder = async (orderData: CreateOrderRequest): Promise<Order> => {
  const response = await apiClient.post<Order>("/orders", orderData);
  return response.data;
};

export const getMyOrders = async (params?: { page?: number; limit?: number }): Promise<OrderListResponse> => {
  const response = await apiClient.get<OrderListResponse>("/orders/me", {
    params,
  });
  return response.data;
};

export const getOrderById = async (id: string): Promise<Order> => {
  const response = await apiClient.get<Order>(`/orders/${id}`);
  return response.data;
};

export const listAllOrders = async (params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}): Promise<OrderListResponse> => {
  const response = await apiClient.get<OrderListResponse>("/orders", {
    params,
  });
  return response.data;
};

export const updateOrderStatus = async (
  id: string,
  statusData: { status?: string; paymentStatus?: string }
): Promise<{ message: string; order: Order }> => {
  const response = await apiClient.patch<{ message: string; order: Order }>(
    `/orders/${id}/status`,
    statusData
  );
  return response.data;
};

export const cancelOrder = async (
  id: string,
  cancelData: { cancelReason: string; cancelNote?: string }
): Promise<{ message: string; order: Order }> => {
  const response = await apiClient.patch<{ message: string; order: Order }>(
    `/orders/${id}/cancel`,
    cancelData
  );
  return response.data;
};
