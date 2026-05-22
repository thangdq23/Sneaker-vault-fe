import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/product/ProductCard";
import SaleProductSlider from "../../components/product/SaleProductSlider";
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
          error_ instanceof Error ? error_.message : "Không thể tải sản phẩm.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadProducts();
  }, []);

  return (
    <main>
      <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-background pt-20 md:min-h-[90vh]">
        <div className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center overflow-hidden">
          <span className="translate-y-12 font-display text-[28vw] font-black uppercase leading-none tracking-tighter text-faded-bg opacity-60">
            VAULT
          </span>
        </div>
        <div className="relative z-10 mx-auto grid w-full max-w-container-max grid-cols-1 items-center gap-12 px-margin-mobile py-10 md:px-margin-desktop lg:grid-cols-2 lg:gap-16 lg:py-12">
          <div className="order-2 animate-fade-in-up lg:order-1">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-tertiary" />
              <span className="text-xs font-semibold leading-snug text-tertiary sm:text-sm">
                Bộ sưu tập streetwear cao cấp
              </span>
            </div>
            <h1 className="mb-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-primary sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Nâng tầm
              <br />
              bước đi
            </h1>
            <p className="mb-10 max-w-md text-base leading-relaxed text-secondary sm:text-lg">
              Phiên bản giới hạn. Trải nghiệm sự giao thoa giữa thẩm mỹ thời
              trang cao cấp và hiệu năng kỹ thuật.
            </p>
            <div className="flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-4">
              <Link to="/shop" className="btn btn-primary min-w-[9rem] shadow-xl">
                Mua ngay
              </Link>
              <Link
                to="/shop"
                className="btn btn-secondary min-w-[9rem] sm:max-w-[14rem]"
              >
                Khám phá bộ sưu tập
              </Link>
            </div>
          </div>
          <div
            className="relative order-1 flex animate-fade-in-up justify-center lg:order-2 lg:justify-end"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="group perspective-1000 relative">
              <div className="absolute -inset-10 rounded-full bg-linear-to-tr from-tertiary/10 to-transparent opacity-40 blur-[100px] smooth-transition group-hover:opacity-70" />
              <img
                alt="Giày sneaker cao cấp"
                className="relative z-10 w-full max-w-xl floating-shadow smooth-transition group-hover:-translate-y-6 group-hover:rotate-2"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2_Do6tMPHvRMra5nYhv6l2eHUTo66nZ1k2wt4h7VmrWeMSWO8ikV1LNagsdPzRdxxVtGA1V2X2wlxE7-IqEFnVoTqSSXUbVBB8VRR4_HXg_FcIdqOr-rGsea5lUDALhys46thrIlhtXP81MqA-47LEfTGJ7qHU49H6JU99_Qoygz7-nkIEmic-oYXhleHdc5ArYKKrLkXRby7lv7Dojyq1xmNSbtgx6-Vg_SzmhHhnHgama0QjzTS7J8ya9vVabnzaPAyAsPPgIW_"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-alt pb-20">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="mb-8">
            <h2 className="section-title text-primary">Ưu đãi nổi bật</h2>
            <p className="section-desc">
              Tổng hợp các mẫu giảm giá tốt nhất, giá sốc cho mùa này.
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
          ) : saleProducts.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center text-on-surface-variant">
              Chưa có sản phẩm giảm giá.
            </div>
          ) : (
            <SaleProductSlider products={saleProducts} />
          )}
        </div>
      </section>

      <section className="bg-background py-14">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="mb-8">
            <h2 className="section-title text-primary">Hàng mới về</h2>
            <p className="section-desc">
              Khám phá những mẫu sneaker vừa mới ra mắt, sẵn sàng cho mọi phong
              cách.
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
          ) : newProducts.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center text-on-surface-variant">
              Chưa có sản phẩm mới.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
                {newProducts.map((product) => (
                  <ProductCard
                    key={product._id ?? product.id ?? product.name}
                    product={product}
                  />
                ))}
              </div>
              {hasMoreNewProducts ? (
                <div className="mt-8 flex justify-center">
                  <Link to="/shop" className="btn btn-primary btn-pill">
                    Xem thêm
                  </Link>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      <section className="bg-surface-alt py-14">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="section-title text-primary">Tất cả sản phẩm</h2>
              <p className="section-desc">
                Duyệt toàn bộ bộ sưu tập sneaker của chúng tôi với nhiều phong
                cách khác nhau.
              </p>
            </div>
            <Link
              to="/shop"
              className="btn btn-secondary btn-pill shrink-0 self-start sm:self-auto"
            >
              Xem thêm
            </Link>
          </div>

          {isLoading ? (
            <div className="rounded-3xl bg-white p-12 text-center text-on-surface-variant">
              Đang tải sản phẩm...
            </div>
          ) : error ? (
            <div className="rounded-3xl bg-rose-50 p-8 text-center text-rose-700">
              {error}
            </div>
          ) : allProducts.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center text-on-surface-variant">
              Chưa có sản phẩm.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
                {allProductsPreview.map((product) => (
                  <ProductCard
                    key={product._id ?? product.id ?? product.name}
                    product={product}
                  />
                ))}
              </div>
              {hasMoreAllProducts ? (
                <div className="mt-8 flex justify-center">
                  <Link to="/shop" className="btn btn-primary btn-pill">
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
