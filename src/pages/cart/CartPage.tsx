import { Link } from "react-router-dom";

const CartPage = () => {
  return (
    <main className="mx-auto max-w-container-max px-margin-mobile pb-20 pt-28 md:px-margin-desktop md:pt-32">
      <header className="mb-10">
        <h1 className="section-title text-on-surface">Giỏ hàng của bạn</h1>
        <p className="section-desc">2 sản phẩm trong giỏ</p>
      </header>
      <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8 lg:space-y-6">
          <div className="hidden border-b border-outline-variant/30 pb-3 text-xs font-semibold text-on-surface-variant md:grid md:grid-cols-6 md:px-4">
            <div className="col-span-3">Chi tiết sản phẩm</div>
            <div className="text-center">Số lượng</div>
            <div className="text-right">Đơn giá</div>
            <div className="text-right">Thành tiền</div>
          </div>

          {[
            {
              name: "NEBULA FLIGHT V1",
              variant: "Size: US 10.5 | Màu: Onyx",
              price: "5.880.000 ₫",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRLrL5s6TWsui86Bc8qVprdGAPDmx5SLQitquAy1fVRkGA1yUeGpm-4wUzK4fLRxsVlYt7071iUU3Hg8o0-V91xYYnC8dFsxiTXaRvJFRz0t9csH7LtJWVABGnOf-xme7mbFr4h5ZNUYzRTdrgeUMfxdnrNuvCTai1pSOxqpcJkp0E4yC39-yfzm94sYI-P0xO355FVE9EE5Ahr6p_xte2j4wNxUpAi9zTGNyC0gHi5U1aj1aNwXg4DA5CSUQKh5aqPwfJMS1x5yC2",
            },
            {
              name: "SOLAR WAVE HI",
              variant: "Size: US 9.0 | Màu: Ember",
              price: "4.440.000 ₫",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkxa2nSQpcc9H-cC1Z5yLnQemeM_IM-IFVfShBtN5bJ6IfigZjfb9S9W4FzTdaTHGkI8lCRyGtUMGpYF_GvlhEWJUhD9s8fDePL1mK61vx9SFlp5w-0Y8vyhHJL7tDbpY7bi1ZZFw2F3a9KzyIwVMlRL3-5G4JVSxmm2TbtCwKUFNo1nnmLTWtDR3ItSzP-t18coh_QqY_Oa3kEGBRtBZAQ2v9q0M42N_bd00zzw0UHYrHi1KPLMcUSwY2xqfs7PnnhaclZxMoKqlF",
            },
          ].map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center gap-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-md md:grid md:grid-cols-6 md:p-6"
            >
              <div className="col-span-3 flex w-full items-center gap-4 sm:gap-6">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-outline-variant/10 bg-surface-container md:h-28 md:w-28">
                  <img
                    className="h-full w-full object-cover"
                    alt={item.name}
                    src={item.img}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 text-base font-bold leading-snug text-on-surface sm:text-lg">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-on-surface-variant sm:text-sm">
                    {item.variant}
                  </p>
                  <button
                    type="button"
                    className="mt-3 flex items-center gap-1 text-xs font-medium text-error hover:underline sm:text-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      delete
                    </span>
                    Xóa
                  </button>
                </div>
              </div>
              <div className="flex w-full items-center justify-center gap-4 rounded-full bg-surface-container px-4 py-2 md:w-auto">
                <button
                  type="button"
                  className="material-symbols-outlined text-on-surface-variant hover:text-on-surface"
                >
                  remove
                </button>
                <span className="w-6 text-center text-base font-bold">1</span>
                <button
                  type="button"
                  className="material-symbols-outlined text-on-surface-variant hover:text-on-surface"
                >
                  add
                </button>
              </div>
              <div className="w-full text-right md:w-auto">
                <span className="mb-0.5 block text-xs text-on-surface-variant md:hidden">
                  Đơn giá
                </span>
                <span className="price-vnd text-base font-semibold text-on-surface">
                  {item.price}
                </span>
              </div>
              <div className="w-full text-right md:w-auto">
                <span className="mb-0.5 block text-xs text-on-surface-variant md:hidden">
                  Thành tiền
                </span>
                <span className="price-vnd text-base font-bold text-on-surface sm:text-lg">
                  {item.price}
                </span>
              </div>
            </div>
          ))}

          <div className="hidden flex-col items-center justify-center py-20 text-center">
            <span className="material-symbols-outlined mb-4 text-[64px] text-outline-variant">
              shopping_cart_off
            </span>
            <h2 className="text-xl font-bold text-on-surface">Giỏ hàng trống</h2>
            <p className="section-desc mx-auto mt-2">
              Bạn chưa thêm sản phẩm nào vào giỏ hàng.
            </p>
            <Link to="/shop" className="btn btn-primary btn-pill mt-6">
              Mua sắm ngay
            </Link>
          </div>
        </div>

        <aside className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="rounded-xl border border-outline-variant/20 bg-surface-container p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 text-lg font-bold text-on-surface sm:text-xl">
              Tóm tắt đơn hàng
            </h2>
            <div className="mb-6 space-y-3 text-sm sm:text-base">
              <div className="flex justify-between gap-4">
                <span className="text-on-surface-variant">Tạm tính</span>
                <span className="price-vnd font-semibold text-on-surface">
                  10.320.000 ₫
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-on-surface-variant">Phí vận chuyển</span>
                <span className="font-semibold text-tertiary">Miễn phí</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-on-surface-variant">Thuế ước tính</span>
                <span className="price-vnd font-semibold text-on-surface">
                  825.600 ₫
                </span>
              </div>
              <div className="flex justify-between gap-4 border-t border-outline-variant/30 pt-4">
                <span className="font-bold text-on-surface">Tổng cộng</span>
                <span className="price-vnd text-lg font-bold text-on-surface">
                  11.145.600 ₫
                </span>
              </div>
            </div>
            <div className="mb-6">
              <label className="form-label">Nhập mã giảm giá</label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  className="form-input min-w-0 flex-1 bg-surface-container-lowest"
                  placeholder="CODE20"
                  type="text"
                />
                <button
                  type="button"
                  className="btn btn-secondary shrink-0 sm:px-6"
                >
                  Áp dụng
                </button>
              </div>
            </div>
            <Link
              to="/checkout"
              className="btn btn-primary w-full text-center shadow-lg"
            >
              Tiến hành thanh toán
            </Link>
            <div className="mt-5 flex flex-col gap-3 text-xs leading-relaxed text-on-surface-variant sm:text-sm">
              <p className="flex items-start gap-2">
                <span className="material-symbols-outlined shrink-0 text-[20px]">
                  lock
                </span>
                Thanh toán an toàn qua Stripe
              </p>
              <p className="flex items-start gap-2">
                <span className="material-symbols-outlined shrink-0 text-[20px]">
                  local_shipping
                </span>
                Miễn phí vận chuyển tiêu chuẩn cho mọi đơn
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default CartPage;
