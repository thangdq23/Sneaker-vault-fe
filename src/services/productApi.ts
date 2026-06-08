import apiClient from "./apiClient";
import type { Product } from "../types/product.type";

export interface ProductFilters {
  search?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  isSale?: boolean;
  isNewProduct?: boolean;
  "sizes.size"?: number | number[] | string | string[];
}

export interface ProductsResponsePaginated {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

type ProductsResponse = Product[] | ProductsResponsePaginated;
type ProductResponse = Product | { product: Product } | { data: Product };

export const getProducts = async (filters?: ProductFilters): Promise<ProductsResponsePaginated> => {
  const response = await apiClient.get<ProductsResponse>("/products", {
    params: filters,
  });
  const payload = response.data;

  if (Array.isArray(payload)) {
    return {
      products: payload,
      total: payload.length,
      page: 1,
      limit: payload.length,
      totalPages: 1,
    };
  }

  return payload;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await apiClient.get<ProductResponse>(`/products/${id}`);
  const payload = response.data;

  if (payload && typeof payload === "object") {
    if ("product" in payload && payload.product) {
      return payload.product;
    }
    if ("data" in payload && payload.data) {
      return payload.data as Product;
    }
  }

  return payload as Product;
};

export const createProduct = async (productData: Partial<Product>): Promise<Product> => {
  const response = await apiClient.post<Product>("/products", productData);
  return response.data;
};

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product> => {
  const response = await apiClient.put<Product>(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  const response = await apiClient.delete<{ message: string }>(`/products/${id}`);
  return response.data;
};
