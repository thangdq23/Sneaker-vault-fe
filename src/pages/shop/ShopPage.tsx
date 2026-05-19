import { useEffect, useState } from "react";
import ProductCard from "../../components/product/ProductCard";
import { getProducts } from "../../services/productApi";
import type { Product } from "../../types/product.type";

const ShopPage = (): React.JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error_) {
        const message =
          error_ instanceof Error
            ? error_.message
            : "Unable to load shop products.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadProducts();
  }, []);

  return (
    <main className="pt-28 pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="flex flex-col md:flex-row gap-gutter">
        <aside className="w-full md:w-72 shrink-0 space-y-10">
          <section>
            <h3 className="font-label-md text-label-md uppercase tracking-wider mb-4">
              Search
            </h3>
            <div className="relative">
              <input
                aria-label="Search products"
                className="w-full bg-surface-container border-none rounded-lg px-4 py-3 font-body-md focus:ring-1 focus:ring-primary/20 transition-all"
                placeholder="Find a model..."
                type="text"
              />
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                search
              </span>
            </div>
          </section>
          <section>
            <h3 className="font-label-md text-label-md uppercase tracking-wider mb-4">
              Gender
            </h3>
            <div className="space-y-3">
              {["Men's Performance", "Women's Lifestyle", "Unisex"].map(
                (label) => (
                  <label
                    key={label}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      className="rounded-sm border-outline text-primary focus:ring-0"
                      type="checkbox"
                    />
                    <span className="text-body-md group-hover:text-primary transition-colors">
                      {label}
                    </span>
                  </label>
                ),
              )}
            </div>
          </section>
          <section>
            <h3 className="font-label-md text-label-md uppercase tracking-wider mb-4">
              Brands
            </h3>
            <div className="space-y-3">
              {[
                "Nike Archive",
                "Adidas Originals",
                "New Balance",
                "Asics Tiger",
              ].map((brand, index) => (
                <label
                  key={brand}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    className="rounded-sm border-outline text-primary focus:ring-0"
                    type="checkbox"
                    defaultChecked={index === 0}
                  />
                  <span className="text-body-md group-hover:text-primary transition-colors">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </section>
          <section>
            <h3 className="font-label-md text-label-md uppercase tracking-wider mb-4">
              Size (UK)
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {["7", "8", "8.5", "9", "10", "11", "12"].map((size) => (
                <button
                  key={size}
                  type="button"
                  className="py-3 border border-outline-variant/30 rounded-lg font-label-md hover:bg-on-surface hover:text-surface transition-all"
                >
                  {size}
                </button>
              ))}
            </div>
          </section>
          <section>
            <h3 className="font-label-md text-label-md uppercase tracking-wider mb-4">
              Color Palette
            </h3>
            <div className="flex flex-wrap gap-3">
              <span className="w-8 h-8 rounded-full bg-on-surface ring-2 ring-offset-2 ring-primary"></span>
              <span className="w-8 h-8 rounded-full bg-surface-container-highest border border-outline-variant"></span>
              <span className="w-8 h-8 rounded-full bg-[#1A4B84]"></span>
              <span className="w-8 h-8 rounded-full bg-[#D12D2D]"></span>
              <span className="w-8 h-8 rounded-full bg-[#E6B100]"></span>
              <span className="w-8 h-8 rounded-full bg-[#2D7A4D]"></span>
            </div>
          </section>
          <section>
            <h3 className="font-label-md text-label-md uppercase tracking-wider mb-4">
              Price Range
            </h3>
            <input
              className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
              type="range"
            />
            <div className="flex justify-between mt-4 text-label-sm font-label-sm text-on-surface-variant">
              <span>£50</span>
              <span>£500+</span>
            </div>
          </section>
        </aside>

        <div className="grow">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
                Shop All Sneakers
              </p>
              <p className="text-secondary max-w-xl mt-3">
                Tìm kiếm và lựa chọn sneaker mới nhất với nhiều lựa chọn phong
                cách.
              </p>
            </div>
            <div className="text-sm text-on-surface-variant">
              {products.length} products
            </div>
          </div>

          {isLoading ? (
            <div className="rounded-3xl bg-white p-12 text-center text-on-surface-variant">
              Loading products...
            </div>
          ) : error ? (
            <div className="rounded-3xl bg-rose-50 text-rose-700 p-8 text-center">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {products.map((product) => (
                <ProductCard
                  key={product._id ?? product.id ?? product.name}
                  product={product}
                />
              ))}
            </div>
          )}

          <div className="mt-16 flex justify-center">
            <button className="px-12 py-4 bg-primary text-on-primary rounded-full text-sm font-bold uppercase tracking-[0.15em] hover:bg-tertiary smooth-transition">
              Load More
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
