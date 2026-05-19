export type Product = {
  _id?: string;
  id?: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  images: string[];
  sizes: string[];
  stock: number;
  isNewProduct: boolean;
  isSale: boolean;
  salePrice?: number;
  discountPercent?: number;
};
