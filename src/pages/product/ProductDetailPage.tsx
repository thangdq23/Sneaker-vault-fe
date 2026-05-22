import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/productApi";
import type { Product } from "../../types/product.type";
import { formatVnd } from "../../utils/formatCurrency";

const ProductDetailPage = (): React.JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError("Thiếu mã sản phẩm.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await getProductById(id);
        setProduct(data);
        setSelectedImage(data.images?.[0] ?? "");
      } catch (error_) {
        const message =
          error_ instanceof Error
            ? error_.message
            : "Không thể tải chi tiết sản phẩm.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadProduct();
  }, [id]);

  const priceLabel = useMemo(() => {
    if (!product) return "";
    return formatVnd(product.price);
  }, [product]);

  const saleLabel = useMemo(() => {
    if (!product || !product.isSale || product.salePrice == null) return null;
    return formatVnd(product.salePrice);
  }, [product]);

  if (isLoading) {
    return (
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-container-max px-margin-mobile py-20 text-center text-on-surface-variant md:px-margin-desktop">
          Đang tải chi tiết sản phẩm...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-container-max rounded-3xl bg-rose-50 px-margin-mobile py-20 text-center text-rose-700 md:px-margin-desktop">
          {error}
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-container-max px-margin-mobile py-20 text-center text-on-surface-variant md:px-margin-desktop">
          Không tìm thấy sản phẩm.
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16">
      <section className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-margin-mobile md:grid-cols-12 md:px-margin-desktop lg:gap-16">
        <div className="flex flex-col gap-4 md:col-span-7 md:flex-row">
          <div className="no-scrollbar flex shrink-0 gap-3 overflow-x-auto md:flex-col md:overflow-visible">
            {product.images.map((image) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border md:h-24 md:w-24 ${
                  selectedImage === image
                    ? "border-primary"
                    : "border-surface-container"
                } shadow-sm transition-shadow`}
              >
                <img
                  src={image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>

          <div className="relative aspect-square grow overflow-hidden rounded-xl border border-outline-variant/10 bg-surface-container shadow-lg">
            <img
              className="h-full w-full object-cover"
              src={
                selectedImage ||
                product.images[0] ||
                "https://via.placeholder.com/720"
              }
              alt={product.name}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 md:col-span-5 lg:gap-8">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-on-surface-variant">
                {product.brand}
              </p>
              <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-on-surface text-balance sm:text-4xl md:text-[2.75rem]">
                {product.name}
              </h1>
            </div>

            <div className="flex flex-wrap items-baseline gap-3">
              {saleLabel ? (
                <>
                  <span className="price-vnd text-2xl font-bold text-on-surface sm:text-3xl">
                    {saleLabel}
                  </span>
                  <span className="price-vnd text-base text-on-surface-variant line-through">
                    {priceLabel}
                  </span>
                </>
              ) : (
                <span className="price-vnd text-2xl font-bold text-on-surface sm:text-3xl">
                  {priceLabel}
                </span>
              )}
              {product.discountPercent ? (
                <span className="rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white">
                  -{product.discountPercent}%
                </span>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2">
              {product.isNewProduct ? (
                <span className="rounded-full bg-tertiary px-3 py-1 text-xs font-bold text-white">
                  Mới
                </span>
              ) : null}
              {product.isSale ? (
                <span className="rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white">
                  Giảm giá
                </span>
              ) : null}
            </div>
          </div>

          <div className="rounded-3xl bg-surface-container p-5 sm:p-6">
            <h2 className="mb-3 text-sm font-bold text-on-surface-variant">
              Mô tả
            </h2>
            <p className="text-sm leading-relaxed text-on-surface-variant sm:text-base">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-surface-container p-5 sm:p-6">
              <p className="mb-3 text-sm font-bold text-on-surface-variant">
                Kích cỡ
              </p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="rounded-lg border border-outline-variant py-2.5 text-center text-sm text-on-surface"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-surface-container p-5 sm:p-6">
              <p className="mb-3 text-sm font-bold text-on-surface-variant">
                Tồn kho
              </p>
              <p
                className={`text-base font-semibold leading-relaxed sm:text-lg ${product.stock > 0 ? "text-emerald-600" : "text-rose-600"}`}
              >
                {product.stock > 0
                  ? `Còn hàng (${product.stock})`
                  : "Hết hàng"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              className="btn btn-primary btn-pill w-full sm:w-auto sm:min-w-[11rem]"
            >
              Thêm vào giỏ
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-pill w-full sm:w-auto sm:min-w-[9rem]"
            >
              Mua ngay
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetailPage;
