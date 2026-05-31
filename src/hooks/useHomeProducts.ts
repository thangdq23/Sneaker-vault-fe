import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../services/productApi";
import type { Product } from "../types/product.type";

const PREVIEW_LIMIT = 15;

export const useHomeProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getProducts();
        setProducts(data.products);
      } catch (error_) {
        const message =
          error_ instanceof Error ? error_.message : "Không thể tải sản phẩm.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadProducts();
  }, []);

  const newProducts = useMemo(
    () => products.filter((product) => product.isNewProduct).slice(0, PREVIEW_LIMIT),
    [products],
  );

  const saleProducts = useMemo(
    () => products.filter((product) => product.isSale).slice(0, PREVIEW_LIMIT),
    [products],
  );

  const allProductsPreview = useMemo(
    () => products.slice(0, PREVIEW_LIMIT),
    [products],
  );

  const hasMoreNewProducts = useMemo(
    () => products.filter((product) => product.isNewProduct).length > PREVIEW_LIMIT,
    [products],
  );

  const hasMoreAllProducts = products.length > PREVIEW_LIMIT;

  return {
    isLoading,
    error,
    saleProducts,
    newProducts,
    allProductsPreview,
    hasMoreNewProducts,
    hasMoreAllProducts,
    totalProducts: products.length,
  };
};
