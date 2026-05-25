import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/product.type";
import { formatVnd } from "../../utils/formatCurrency";
import ProductRating from "./ProductRating";

interface ProductCardProps {
  product: Product;
}

const getDiscountPercent = (product: Product): number | null => {
  if (!product.isSale) return null;

  if (product.discountPercent != null && product.discountPercent > 0) {
    return Math.round(product.discountPercent);
  }

  if (
    product.salePrice != null &&
    product.price > 0 &&
    product.salePrice < product.price
  ) {
    return Math.round((1 - product.salePrice / product.price) * 100);
  }

  return null;
};

const ProductCard = ({ product }: ProductCardProps): React.JSX.Element => {
  const navigate = useNavigate();
  const productId = product._id ?? product.id ?? "";

  const priceLabel = useMemo(
    () => formatVnd(product.price ?? 0),
    [product.price],
  );

  const saleLabel = useMemo(() => {
    if (!product.isSale || product.salePrice == null) return null;
    return formatVnd(product.salePrice);
  }, [product.isSale, product.salePrice]);

  const discountPercent = useMemo(() => getDiscountPercent(product), [product]);

  const thumbnail =
    product.images?.[0] ?? "https://via.placeholder.com/520x520?text=No+Image";

  return (
    <button
      type="button"
      onClick={() => navigate(`/products/${productId}`)}
      className="product-card group w-full overflow-hidden rounded-3xl border border-outline-variant/80 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-slate-50">
        <img
          src={thumbnail}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-3 top-3 flex flex-wrap gap-1.5">
          {product.isNewProduct ? (
            <span className="rounded-full bg-tertiary px-2 py-0.5 text-[10px] font-bold text-white">
              Mới
            </span>
          ) : null}
          {discountPercent != null ? (
            <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white">
              -{discountPercent}%
            </span>
          ) : null}
        </div>
      </div>
      <div className="product-card-body">
        <p className="mb-0.5 line-clamp-1 text-xs text-on-surface-variant">
          {product.brand}
        </p>
        <h3 className="line-clamp-2 font-display text-[15px] font-semibold leading-snug text-on-surface sm:text-base">
          {product.name}
        </h3>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          {saleLabel ? (
            <>
              <p className="price-vnd text-sm font-bold text-red-600 sm:text-base">
                {saleLabel}
              </p>
              <p className="price-vnd text-xs text-gray-400 line-through sm:text-sm">
                {priceLabel}
              </p>
            </>
          ) : (
            <p className="price-vnd text-sm font-bold text-on-surface sm:text-base">
              {priceLabel}
            </p>
          )}
        </div>
        <div className="mt-2">
          <ProductRating rating={5} />
        </div>
      </div>
    </button>
  );
};

export default ProductCard;
