import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/productApi";
import type { Product } from "../../types/product.type";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const ProductDetailPage = (): React.JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError("Product ID is missing.");
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
            : "Cannot load product details.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadProduct();
  }, [id]);

  const priceLabel = useMemo(() => {
    if (!product) return "";
    return currencyFormatter.format(product.price);
  }, [product]);

  const saleLabel = useMemo(() => {
    if (!product || !product.isSale || product.salePrice == null) return null;
    return currencyFormatter.format(product.salePrice);
  }, [product]);

  if (isLoading) {
    return (
      <main className="pt-24 pb-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 text-center text-on-surface-variant">
          Loading product details...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="pt-24 pb-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 rounded-3xl bg-rose-50 text-rose-700 text-center">
          {error}
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="pt-24 pb-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 text-center text-on-surface-variant">
          Product not found.
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16">
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter lg:gap-16">
        <div className="md:col-span-7 flex flex-col md:flex-row gap-4">
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible no-scrollbar shrink-0">
            {product.images.map((image) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border ${
                  selectedImage === image
                    ? "border-primary"
                    : "border-surface-container"
                } transition-shadow shadow-sm`}
              >
                <img
                  src={image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <div className="grow aspect-square bg-surface-container rounded-xl overflow-hidden shadow-lg border border-outline-variant/10 relative">
            <img
              className="w-full h-full object-cover"
              src={
                selectedImage ||
                product.images[0] ||
                "https://via.placeholder.com/720"
              }
              alt={product.name}
            />
          </div>
        </div>

        <div className="md:col-span-5 flex flex-col space-y-8">
          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              <p className="text-sm uppercase tracking-[0.3em] text-on-surface-variant">
                {product.brand}
              </p>
              <h1 className="font-display text-4xl md:text-[3rem] font-bold text-on-surface tracking-tight">
                {product.name}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {saleLabel ? (
                <>
                  <span className="text-3xl font-bold text-on-surface">
                    {saleLabel}
                  </span>
                  <span className="text-base text-on-surface-variant line-through">
                    {priceLabel}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-on-surface">
                  {priceLabel}
                </span>
              )}
              {product.discountPercent ? (
                <span className="text-sm uppercase tracking-[0.2em] text-white bg-rose-600 rounded-full px-3 py-1">
                  -{product.discountPercent}%
                </span>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2">
              {product.isNewProduct ? (
                <span className="bg-tertiary text-white px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.24em]">
                  NEW
                </span>
              ) : null}
              {product.isSale ? (
                <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.24em]">
                  SALE
                </span>
              ) : null}
            </div>
          </div>

          <div className="rounded-3xl bg-surface-container p-6">
            <h2 className="font-label-md text-label-md uppercase tracking-[0.3em] text-on-surface-variant mb-3">
              Description
            </h2>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-surface-container p-6">
              <p className="font-label-md text-label-md uppercase tracking-[0.3em] text-on-surface-variant mb-3">
                Sizes
              </p>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="py-3 rounded-lg border border-outline-variant text-center text-sm text-on-surface"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-surface-container p-6">
              <p className="font-label-md text-label-md uppercase tracking-[0.3em] text-on-surface-variant mb-3">
                Stock
              </p>
              <p
                className={`text-lg font-semibold ${product.stock > 0 ? "text-emerald-600" : "text-rose-600"}`}
              >
                {product.stock > 0
                  ? `In stock (${product.stock})`
                  : "Out of stock"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button className="w-full sm:w-auto px-8 py-4 bg-primary text-on-primary rounded-full font-semibold uppercase tracking-[0.2em] hover:bg-tertiary transition">
              Add to Cart
            </button>
            <button className="w-full sm:w-auto px-8 py-4 border border-outline-variant rounded-full font-semibold uppercase tracking-[0.2em] hover:bg-surface-container transition">
              Buy Now
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetailPage;
