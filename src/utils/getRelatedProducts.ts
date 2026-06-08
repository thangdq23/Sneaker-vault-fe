import type { Product } from "../types/product.type";

const getProductId = (product: Product): string =>
  product._id ?? product.id ?? "";

export const getRelatedProducts = (
  current: Product,
  allProducts: Product[],
  limit = 4,
): Product[] => {
  const currentId = getProductId(current);

  const others = allProducts.filter(
    (product) => getProductId(product) !== currentId,
  );

  const sameBrand = others.filter(
    (product) =>
      product.brand.toLowerCase() === current.brand.toLowerCase(),
  );

  if (sameBrand.length >= limit) {
    return sameBrand.slice(0, limit);
  }

  const usedIds = new Set(sameBrand.map(getProductId));
  const filler = others.filter((product) => !usedIds.has(getProductId(product)));

  return [...sameBrand, ...filler].slice(0, limit);
};
