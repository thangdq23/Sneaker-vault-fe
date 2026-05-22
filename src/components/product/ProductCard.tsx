import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/product.type";

interface ProductCardProps {
  product: Product;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const ProductCard = ({ product }: ProductCardProps): React.JSX.Element => {
  const navigate = useNavigate();
  const productId = product._id ?? product.id ?? "";

  const priceLabel = useMemo(() => {
    const priceValue = product.price ?? 0;
    return currencyFormatter.format(priceValue);
  }, [product.price]);

  const saleLabel = useMemo(() => {
    if (!product.isSale || product.salePrice == null) return null;
    return currencyFormatter.format(product.salePrice);
  }, [product.isSale, product.salePrice]);

  const thumbnail =
    product.images?.[0] ?? "https://via.placeholder.com/520x520?text=No+Image";

  return (
    <button
      type="button"
      onClick={() => navigate(`/products/${productId}`)}
      className="group w-full text-left bg-white rounded-3xl border border-outline-variant/80 shadow-sm overflow-hidden transition duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative overflow-hidden bg-slate-50 aspect-4/5">
        <img
          src={thumbnail}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-4 top-4 flex flex-wrap gap-2">
          {product.isNewProduct ? (
            <span className="bg-tertiary text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full">
              NEW
            </span>
          ) : null}
          {product.isSale ? (
            <span className="bg-rose-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full">
              SALE
            </span>
          ) : null}
        </div>
      </div>
      <div className="p-5">
        <p className="text-[11px] uppercase tracking-[0.24em] text-on-surface-variant mb-2">
          {product.brand}
        </p>
        <h3 className="font-display font-semibold text-lg text-on-surface leading-tight mb-3">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <p className="text-base font-bold text-on-surface">
            {saleLabel ?? priceLabel}
          </p>
          {saleLabel ? (
            <p className="text-sm text-on-surface-variant line-through">
              {priceLabel}
            </p>
          ) : null}
        </div>
      </div>
    </button>
  );
};

export default ProductCard;
