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

  const sameCategory = others.filter(
    (product) =>
      product.category.toLowerCase() === current.category.toLowerCase() &&
      !sameBrand.some((p) => getProductId(p) === getProductId(product)),
  );

  const merged = [...sameBrand, ...sameCategory];

  if (merged.length >= limit) {
    return merged.slice(0, limit);
  }

  const usedIds = new Set(merged.map(getProductId));
  const filler = others.filter((product) => !usedIds.has(getProductId(product)));

  return [...merged, ...filler].slice(0, limit);
};
