import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/product/ProductCard";
import { getProducts } from "../../services/productApi";
import type { Product } from "../../types/product.type";

const HomePage = (): React.JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const newProducts = useMemo(
    () => products.filter((product) => product.isNewProduct).slice(0, 15),
    [products],
  );

  const saleProducts = useMemo(
    () => products.filter((product) => product.isSale).slice(0, 15),
    [products],
  );

  const allProducts = useMemo(() => products, [products]);
  const allProductsPreview = useMemo(
    () => allProducts.slice(0, 15),
    [allProducts],
  );
  const hasMoreNewProducts = useMemo(
    () => products.filter((product) => product.isNewProduct).length > 15,
    [products],
  );
  const hasMoreAllProducts = allProducts.length > 15;

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error_) {
        const message =
          error_ instanceof Error ? error_.message : "Cannot load products.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadProducts();
  }, []);

  return (
    <main>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 bg-background">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
          <span className="font-display font-black text-[30vw] leading-none text-faded-bg uppercase tracking-tighter opacity-60 transform translate-y-12">
            VAULT
          </span>
        </div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-16 relative z-10 py-12">
          <div className="order-2 lg:order-1 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-tertiary"></span>
              <span className="text-tertiary font-bold text-[10px] uppercase tracking-[0.4em]">
                Premium Streetwear Collection
              </span>
            </div>
            <h1 className="font-display text-7xl md:text-[7rem] font-bold text-primary mb-8 leading-[0.85] tracking-tighter">
              ELEVATE
              <br />
              THE STEP
            </h1>
            <p className="text-secondary text-lg mb-12 max-w-sm font-light leading-relaxed">
              Limited Edition Drops. Experience the fusion of high-fashion
              aesthetics and technical performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center bg-primary text-on-primary px-12 py-5 font-bold text-[10px] uppercase tracking-[0.25em] smooth-transition glow-hover border border-primary rounded-sm shadow-xl"
              >
                Shop Now
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center bg-transparent text-primary px-12 py-5 font-bold text-[10px] uppercase tracking-[0.25em] smooth-transition border border-black/10 hover:bg-black/5 rounded-sm"
              >
                Explore Archive
              </Link>
            </div>
          </div>
          <div
            className="order-1 lg:order-2 flex justify-center lg:justify-end relative animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative group perspective-1000">
              <div className="absolute -inset-10 bg-linear-to-tr from-tertiary/10 to-transparent rounded-full blur-[100px] opacity-40 group-hover:opacity-70 smooth-transition"></div>
              <img
                alt="Premium Sneaker"
                className="w-full max-w-xl relative z-10 floating-shadow smooth-transition group-hover:-translate-y-6 group-hover:rotate-2"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2_Do6tMPHvRMra5nYhv6l2eHUTo66nZ1k2wt4h7VmrWeMSWO8ikV1LNagsdPzRdxxVtGA1V2X2wlxE7-IqEFnVoTqSSXUbVBB8VRR4_HXg_FcIdqOr-rGsea5lUDALhys46thrIlhtXP81MqA-47LEfTGJ7qHU49H6JU99_Qoygz7-nkIEmic-oYXhleHdc5ArYKKrLkXRby7lv7Dojyq1xmNSbtgx6-Vg_SzmhHhnHgama0QjzTS7J8ya9vVabnzaPAyAsPPgIW_"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 bg-surface-alt">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
                Sale Picks
              </p>
              <p className="text-secondary max-w-xl mt-3">
                Tổng hợp các mẫu giảm giá tốt nhất, giá sốc cho mùa này.
              </p>
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
          ) : saleProducts.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center text-on-surface-variant">
              No sale products available.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {saleProducts.map((product) => (
                <ProductCard
                  key={product._id ?? product.id ?? product.name}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-14 bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
                New Arrival
              </p>
              <p className="text-secondary max-w-xl mt-3">
                Khám phá những mẫu sneaker vừa mới ra mắt, sẵn sàng cho mọi
                phong cách.
              </p>
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
          ) : newProducts.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center text-on-surface-variant">
              No new products available.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {newProducts.map((product) => (
                  <ProductCard
                    key={product._id ?? product.id ?? product.name}
                    product={product}
                  />
                ))}
              </div>
              {hasMoreNewProducts ? (
                <div className="mt-8 flex justify-center">
                  <Link
                    to="/shop"
                    className="px-8 py-4 bg-primary text-on-primary rounded-full text-sm font-bold uppercase tracking-[0.15em] hover:bg-tertiary smooth-transition"
                  >
                    Xem thêm
                  </Link>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      <section className="py-14 bg-surface-alt">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
                All Products
              </p>
              <p className="text-secondary max-w-xl mt-3">
                Duyệt toàn bộ bộ sưu tập sneaker của chúng tôi với nhiều phong
                cách khác nhau.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-outline-variant text-sm font-semibold text-on-surface hover:bg-surface-container transition"
            >
              Xem thêm
            </Link>
          </div>

          {isLoading ? (
            <div className="rounded-3xl bg-white p-12 text-center text-on-surface-variant">
              Loading products...
            </div>
          ) : error ? (
            <div className="rounded-3xl bg-rose-50 text-rose-700 p-8 text-center">
              {error}
            </div>
          ) : allProducts.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center text-on-surface-variant">
              No products available.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {allProductsPreview.map((product) => (
                  <ProductCard
                    key={product._id ?? product.id ?? product.name}
                    product={product}
                  />
                ))}
              </div>
              {hasMoreAllProducts ? (
                <div className="mt-8 flex justify-center">
                  <Link
                    to="/shop"
                    className="px-8 py-4 bg-primary text-on-primary rounded-full text-sm font-bold uppercase tracking-[0.15em] hover:bg-tertiary smooth-transition"
                  >
                    Xem thêm
                  </Link>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
