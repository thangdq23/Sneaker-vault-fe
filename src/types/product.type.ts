export interface ProductSizeInfo {
  size: number | string;
  stock: number;
}

export type Product = {
  _id?: string;
  id?: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  images: string[];
  sizes: ProductSizeInfo[];
  stock: number;
  sku: string;
  isNewProduct: boolean;
  isSale: boolean;
  salePrice?: number;
  discountPercent?: number;
};
