import axios from "axios";
import type { Product } from "../types/product.type";

const productApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

type ProductsResponse =
  | Product[]
  | { products: Product[] }
  | { data: Product[] };

type ProductResponse = Product | { product: Product } | { data: Product };

export const getProducts = async (): Promise<Product[]> => {
  const response = await productApi.get<ProductsResponse>("/products");
  const payload = response.data;

  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === "object") {
    if (Array.isArray((payload as { products: Product[] }).products)) {
      return (payload as { products: Product[] }).products;
    }
    if (Array.isArray((payload as { data: Product[] }).data)) {
      return (payload as { data: Product[] }).data;
    }
  }

  return [];
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await productApi.get<ProductResponse>(`/products/${id}`);
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
