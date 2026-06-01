import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearCartItems } from "../../store/cartSlice";
import { createOrder } from "../../services/orderApi";
import { formatVnd } from "../../utils/formatCurrency";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.cart);

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      navigate("/login?redirect=/checkout");
      return;
    }
  }, [token, navigate]);

  const items = cart?.items ?? [];
  const totalPrice = cart?.totalPrice ?? 0;

  useEffect(() => {
    // If cart is loaded and has no items, redirect to cart page unless checkout succeeded
    if (cart && items.length === 0 && !isSuccess) {
      navigate("/cart");
    }
  }, [cart, items, navigate, isSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!address.trim() || !city.trim()) {
      setError("Vui lòng điền đầy đủ địa chỉ giao hàng.");
      return;
    }

    if (!phone.trim()) {
      setError("Vui lòng nhập số điện thoại liên hệ.");
      return;
    }

    const shippingAddress = `${fullName ? fullName + " - " : ""}${address}, ${city}${postcode ? " (" + postcode + ")" : ""}`;

    try {
      setIsLoading(true);
      const order = await createOrder({
        shippingAddress,
        phone,
        paymentMethod,
      });

      setCreatedOrder(order);
      setIsSuccess(true);
      void dispatch(clearCartItems());
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Đặt hàng thất bại. Vui lòng thử lại.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) return null;

  if (isSuccess && createdOrder) {
    return (
      <main className="mx-auto max-w-md px-margin-mobile pb-20 pt-32 text-center md:px-6">
        <div className="rounded-3xl border border-outline-variant/20 bg-surface-container p-8 shadow-xl">
          <span className="material-symbols-outlined text-6xl text-emerald-600 mb-4 animate-bounce">
            check_circle
          </span>
          <h1 className="font-display text-2xl font-bold text-on-surface mb-2">
            Đặt hàng thành công!
          </h1>
          <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
            Cảm ơn bạn đã mua sắm tại Sneaker Vault. Mã đơn hàng của bạn là{" "}
            <span className="font-mono font-bold text-primary">
              #{createdOrder._id}
            </span>
            .
          </p>
          <div className="space-y-3 mb-8 text-left text-sm border-t border-outline-variant/30 pt-6">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Tổng thanh toán:</span>
              <span className="font-bold text-primary">
                {formatVnd(createdOrder.totalAmount)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Phương thức:</span>
              <span className="font-semibold text-on-surface uppercase">
                {createdOrder.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Số điện thoại:</span>
              <span className="font-semibold text-on-surface">
                {createdOrder.phone}
              </span>
            </div>
            <div className="flex flex-col gap-1 border-t border-outline-variant/30 pt-3">
              <span className="text-on-surface-variant">
                Địa chỉ nhận hàng:
              </span>
              <span className="font-medium text-on-surface leading-relaxed">
                {createdOrder.shippingAddress}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Link to="/profile" className="btn btn-primary btn-pill w-full">
              Xem lịch sử đơn hàng
            </Link>
            <Link to="/" className="btn btn-secondary btn-pill w-full">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-container-max px-margin-mobile pb-16 pt-28 md:px-margin-desktop md:pt-32">
      <header className="mb-10">
        <h1 className="section-title text-on-surface">Thanh toán</h1>
        <p className="section-desc">
          Hoàn tất thông tin giao hàng và thanh toán để đặt hàng.
        </p>
      </header>

      {error && (
        <div className="mb-8 rounded-xl bg-rose-50 p-4 text-center text-sm font-semibold text-rose-700 border border-rose-200">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12"
      >
        <div className="space-y-10 lg:col-span-7">
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-taupe-300 text-sm font-bold ">
                1
              </span>
              <h2 className="text-lg font-bold leading-snug text-on-surface sm:text-xl">
                Thông tin giao hàng
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="form-label">Họ và tên người nhận</label>
                <input
                  className="form-input"
                  placeholder="Nguyễn Văn A"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="form-label">Địa chỉ nhà, tên đường</label>
                <input
                  className="form-input"
                  placeholder="Số 123 Đường ABC, Phường X, Quận Y"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Tỉnh / Thành phố</label>
                <input
                  className="form-input"
                  placeholder="Hà Nội"
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Mã bưu điện (tùy chọn)</label>
                <input
                  className="form-input"
                  placeholder="100000"
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="form-label">Số điện thoại liên hệ</label>
                <input
                  className="form-input"
                  placeholder="0912345678"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-taupe-300 text-sm font-bold text-on-surface-variant">
                2
              </span>
              <h2 className="text-lg font-bold leading-snug text-on-surface sm:text-xl">
                Phương thức giao hàng
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="relative flex cursor-pointer items-center gap-3 rounded-xl border-2 border-primary bg-surface-container p-5 transition-all">
                <input
                  checked
                  readOnly
                  className="sr-only"
                  name="delivery"
                  type="radio"
                />
                <div className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-on-surface">
                    Giao hàng tiêu chuẩn
                  </span>
                  <span className="block text-sm leading-relaxed text-on-surface-variant">
                    3–5 ngày làm việc
                  </span>
                </div>
                <span className="shrink-0 text-sm font-bold text-on-surface">
                  Miễn phí
                </span>
              </label>
            </div>
          </section>

          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-taupe-300 text-sm font-bold text-on-surface-variant">
                3
              </span>
              <h2 className="text-lg font-bold leading-snug text-on-surface sm:text-xl">
                Phương thức thanh toán
              </h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-5 transition-all ${
                    paymentMethod === "cod"
                      ? "border-black bg-gray-100 text-black"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <span className="material-symbols-outlined">payments</span>
                  <span className="text-xs font-semibold sm:text-sm">
                    Thanh toán khi nhận hàng (COD)
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-5 transition-all ${
                    paymentMethod === "card"
                      ? "border-black bg-gray-100 text-black"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <span className="material-symbols-outlined">credit_card</span>
                  <span className="text-xs font-semibold sm:text-sm">
                    Thẻ tín dụng
                  </span>
                </button>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4 rounded-xl bg-surface-container-low p-5 sm:p-6 transition-all duration-300">
                  <div>
                    <label className="form-label">Số thẻ</label>
                    <div className="relative">
                      <input
                        className="form-input pr-10"
                        placeholder="0000 0000 0000 0000"
                        type="text"
                      />
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                        credit_card
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="form-label">Ngày hết hạn</label>
                      <input
                        className="form-input"
                        placeholder="MM/YY"
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="form-label">CVV</label>
                      <input
                        className="form-input"
                        placeholder="123"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-lg sm:p-8">
            <h2 className="mb-6 text-lg font-bold text-on-surface sm:text-xl">
              Tóm tắt đơn hàng
            </h2>
            <div className="mb-6 space-y-5 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
              {items.map((item) => {
                const product = item.product;
                const hasSale = product?.isSale && product?.salePrice != null;
                const price = hasSale
                  ? product.salePrice!
                  : (product?.price ?? 0);
                const img =
                  product?.images?.[0] ??
                  "https://via.placeholder.com/150?text=Sneaker";

                return (
                  <div key={item._id} className="flex gap-3 sm:gap-4">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-container-highest sm:h-24 sm:w-24">
                      <img
                        className="h-full w-full object-cover"
                        alt={product?.name ?? "Giày"}
                        src={img}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-sm font-bold leading-snug text-on-surface">
                        {product?.name ?? "Sneaker"}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-on-surface-variant sm:text-sm">
                        Size: {item.size} x {item.quantity}
                      </p>
                      <span className="price-vnd mt-1 block text-sm font-bold text-on-surface">
                        {formatVnd(price * item.quantity)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="space-y-3 border-y border-outline-variant/30 py-5 text-sm sm:text-base">
              <div className="flex justify-between gap-4">
                <span className="text-on-surface-variant">Tạm tính</span>
                <span className="price-vnd text-on-surface">
                  {formatVnd(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-on-surface-variant">Phí vận chuyển</span>
                <span className="text-on-surface">Miễn phí</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 py-5">
              <span className="text-lg font-bold text-on-surface">
                Tổng cộng
              </span>
              <span className="price-vnd text-lg font-bold text-on-surface sm:text-xl text-red-600">
                {formatVnd(totalPrice)}
              </span>
            </div>
            <button
              type="submit"
              disabled={isLoading || items.length === 0}
              className="btn btn-primary flex w-full items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? "Đang xử lý..." : "Hoàn tất thanh toán"}
              {!isLoading && (
                <span className="material-symbols-outlined">arrow_forward</span>
              )}
            </button>
            <p className="mt-5 text-center text-xs leading-relaxed text-on-surface-variant sm:text-sm">
              Bằng việc nhấn hoàn tất thanh toán, bạn đồng ý với{" "}
              <a className="underline hover:text-primary" href="#">
                Điều khoản dịch vụ
              </a>
              .
            </p>
          </div>
        </aside>
      </form>
    </main>
  );
};

export default CheckoutPage;
