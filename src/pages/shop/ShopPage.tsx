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
            : "Không thể tải sản phẩm cửa hàng.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadProducts();
  }, []);

  return (
    <main className="mx-auto max-w-container-max px-margin-mobile pb-16 pt-28 md:px-margin-desktop">
      <div className="flex flex-col gap-gutter lg:flex-row">
        <aside className="w-full shrink-0 space-y-8 lg:w-72">
          <section>
            <h3 className="mb-3 text-sm font-bold text-on-surface">Tìm kiếm</h3>
            <div className="relative">
              <input
                aria-label="Tìm kiếm sản phẩm"
                className="form-input pr-10"
                placeholder="Tìm mẫu giày..."
                type="text"
              />
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                search
              </span>
            </div>
          </section>
          <section>
            <h3 className="mb-3 text-sm font-bold text-on-surface">Giới tính</h3>
            <div className="space-y-2.5">
              {["Nam — Hiệu năng", "Nữ — Phong cách", "Unisex"].map((label) => (
                <label
                  key={label}
                  className="group flex cursor-pointer items-start gap-3"
                >
                  <input
                    className="mt-1 rounded-sm border-outline text-primary focus:ring-0"
                    type="checkbox"
                  />
                  <span className="text-sm leading-relaxed group-hover:text-primary">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </section>
          <section>
            <h3 className="mb-3 text-sm font-bold text-on-surface">
              Thương hiệu
            </h3>
            <div className="space-y-2.5">
              {[
                "Nike Archive",
                "Adidas Originals",
                "New Balance",
                "Asics Tiger",
              ].map((brand, index) => (
                <label
                  key={brand}
                  className="group flex cursor-pointer items-start gap-3"
                >
                  <input
                    className="mt-1 rounded-sm border-outline text-primary focus:ring-0"
                    type="checkbox"
                    defaultChecked={index === 0}
                  />
                  <span className="text-sm leading-relaxed group-hover:text-primary">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </section>
          <section>
            <h3 className="mb-3 text-sm font-bold text-on-surface">Size (UK)</h3>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-3 lg:grid-cols-3">
              {["7", "8", "8.5", "9", "10", "11", "12"].map((size) => (
                <button
                  key={size}
                  type="button"
                  className="rounded-lg border border-outline-variant/30 py-2.5 text-sm font-medium hover:bg-on-surface hover:text-surface"
                >
                  {size}
                </button>
              ))}
            </div>
          </section>
          <section>
            <h3 className="mb-3 text-sm font-bold text-on-surface">Bảng màu</h3>
            <div className="flex flex-wrap gap-3">
              <span className="h-8 w-8 rounded-full bg-on-surface ring-2 ring-primary ring-offset-2" />
              <span className="h-8 w-8 rounded-full border border-outline-variant bg-surface-container-highest" />
              <span className="h-8 w-8 rounded-full bg-[#1A4B84]" />
              <span className="h-8 w-8 rounded-full bg-[#D12D2D]" />
              <span className="h-8 w-8 rounded-full bg-[#E6B100]" />
              <span className="h-8 w-8 rounded-full bg-[#2D7A4D]" />
            </div>
          </section>
          <section>
            <h3 className="mb-3 text-sm font-bold text-on-surface">Khoảng giá</h3>
            <input
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-surface-container-highest accent-primary"
              type="range"
            />
            <div className="mt-3 flex justify-between text-xs text-on-surface-variant sm:text-sm">
              <span>500.000 ₫</span>
              <span>5.000.000+ ₫</span>
            </div>
          </section>
        </aside>

        <div className="min-w-0 grow">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="section-title text-primary">Cửa hàng sneaker</h1>
              <p className="section-desc">
                Tìm kiếm và lựa chọn sneaker mới nhất với nhiều lựa chọn phong
                cách.
              </p>
            </div>
            <p className="shrink-0 text-sm text-on-surface-variant">
              {products.length} sản phẩm
            </p>
          </div>

          {isLoading ? (
            <div className="rounded-3xl bg-white p-12 text-center text-on-surface-variant">
              Đang tải sản phẩm...
            </div>
          ) : error ? (
            <div className="rounded-3xl bg-rose-50 p-8 text-center text-rose-700">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-gutter lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product._id ?? product.id ?? product.name}
                  product={product}
                />
              ))}
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <button type="button" className="btn btn-primary btn-pill">
              Xem thêm
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
