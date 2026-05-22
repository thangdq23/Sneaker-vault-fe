import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/product.type";
import { formatVnd } from "../../utils/formatCurrency";

interface ProductCardProps {
  product: Product;
}

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
          {product.isSale ? (
            <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white">
              Giảm giá
            </span>
          ) : null}
        </div>
      </div>
      <div className="product-card-body">
        <p className="mb-1 line-clamp-1 text-xs text-on-surface-variant">
          {product.brand}
        </p>
        <h3 className="mb-auto line-clamp-2 min-h-[2.5rem] font-display text-base font-semibold leading-snug text-on-surface sm:min-h-[2.75rem] sm:text-lg">
          {product.name}
        </h3>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 border-t border-outline-variant/15 pt-3">
          <p className="price-vnd text-sm font-bold text-on-surface sm:text-base">
            {saleLabel ?? priceLabel}
          </p>
          {saleLabel ? (
            <p className="price-vnd text-xs text-on-surface-variant line-through sm:text-sm">
              {priceLabel}
            </p>
          ) : null}
        </div>
      </div>
    </button>
  );
};

export default ProductCard;
