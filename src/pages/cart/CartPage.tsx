import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../contexts/ToastContext";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchCartItems,
  updateCartItemQty,
  removeCartItemById,
  clearCartItems,
} from "../../store/cartSlice";
import { formatVnd } from "../../utils/formatCurrency";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.auth);
  const { cart, isLoading, error } = useAppSelector((state) => state.cart);
  const { showToast } = useToast();

  useEffect(() => {
    if (!token) {
      navigate("/login?redirect=/cart");
      return;
    }
    void dispatch(fetchCartItems());
  }, [token, navigate, dispatch]);

  const handleQtyDecrement = (itemId: string, currentQty: number) => {
    if (currentQty <= 1) return;
    void dispatch(updateCartItemQty({ itemId, quantity: currentQty - 1 }));
  };

  const handleQtyIncrement = (
    itemId: string,
    currentQty: number,
    maxStock: number,
  ) => {
    if (currentQty >= maxStock) {
      alert(`Chỉ còn ${maxStock} sản phẩm trong kho.`);
      return;
    }
    void dispatch(updateCartItemQty({ itemId, quantity: currentQty + 1 }));
  };

  const [itemToRemove, setItemToRemove] = useState<string | null>(null);

  const handleRemove = (itemId: string) => {
    setItemToRemove(itemId);
  };

  const confirmRemove = async () => {
    if (itemToRemove) {
      try {
        await dispatch(removeCartItemById(itemToRemove)).unwrap();
        showToast("Đã xóa sản phẩm khỏi giỏ hàng", "success");
      } catch {
        showToast("Không thể xóa sản phẩm", "error");
      } finally {
        setItemToRemove(null);
      }
    }
  };

  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClear = () => {
    setShowClearConfirm(true);
  };

  const confirmClear = async () => {
    try {
      await dispatch(clearCartItems()).unwrap();
      showToast("Đã xóa toàn bộ giỏ hàng", "success");
    } catch {
      showToast("Không thể xóa giỏ hàng", "error");
    } finally {
      setShowClearConfirm(false);
    }
  };

  if (!token) {
    return null;
  }

  const items = cart?.items ?? [];
  const totalPrice = cart?.totalPrice ?? 0;

  return (
    <main className="mx-auto max-w-container-max px-margin-mobile pb-20 pt-28 md:px-margin-desktop md:pt-32">
      <header className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="section-title text-on-surface">Giỏ hàng của bạn</h1>
          <p className="section-desc">{items.length} sản phẩm trong giỏ</p>
        </div>
        {items.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="btn btn-secondary text-red-500! hover:bg-rose-50 border-outline-variant/30 btn-pill self-start sm:self-auto"
          >
            Làm trống giỏ hàng
          </button>
        )}
      </header>

      {isLoading && items.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center text-on-surface-variant shadow-sm border border-outline-variant/20">
          Đang tải giỏ hàng...
        </div>
      ) : error && items.length === 0 ? (
        <div className="rounded-3xl bg-rose-50 p-8 text-center text-rose-700">
          Có lỗi xảy ra: {error}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-3xl bg-white border border-outline-variant/10 shadow-sm">
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
      ) : (
        <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8 lg:space-y-6">
            <div className="hidden border-b border-outline-variant/30 pb-3 text-xs font-semibold text-on-surface-variant md:grid md:grid-cols-6 md:px-4">
              <div className="col-span-3">Chi tiết sản phẩm</div>
              <div className="text-center">Số lượng</div>
              <div className="text-right">Đơn giá</div>
              <div className="text-right">Thành tiền</div>
            </div>

            {items.map((item) => {
              const product = item.product;
              const hasSale = product?.isSale && product?.salePrice != null;
              const price = hasSale
                ? product.salePrice!
                : (product?.price ?? 0);
              const itemTotal = price * item.quantity;
              const img =
                product?.images?.[0] ??
                "https://via.placeholder.com/150?text=Sneaker";
              const sizeInfo = product?.sizes?.find(
                (s) =>
                  s.size === item.size || Number(s.size) === Number(item.size),
              );
              const stock = sizeInfo ? sizeInfo.stock : (product?.stock ?? 10);

              return (
                <div
                  key={item._id}
                  className="flex flex-col items-center gap-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-md md:grid md:grid-cols-6 md:p-6"
                >
                  <div className="col-span-3 flex w-full items-center gap-4 sm:gap-6">
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-outline-variant/10 bg-surface-container md:h-28 md:w-28">
                      <img
                        className="h-full w-full object-cover"
                        alt={product?.name ?? "Giày"}
                        src={img}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-base font-bold leading-snug text-on-surface sm:text-lg">
                        {product?.name ?? "Sản phẩm Sneaker"}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-on-surface-variant sm:text-sm">
                        Size: {item.size} | Thương hiệu:{" "}
                        {product?.brand ?? "Sneaker Vault"}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleRemove(item._id)}
                        className="mt-3 flex items-center gap-1 text-xs font-medium text-error hover:underline sm:text-sm cursor-pointer text-red-600"
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
                      onClick={() =>
                        handleQtyDecrement(item._id, item.quantity)
                      }
                      disabled={item.quantity <= 1}
                      className="material-symbols-outlined text-on-surface-variant hover:text-on-surface cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      remove
                    </button>
                    <span className="w-6 text-center text-base font-bold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleQtyIncrement(item._id, item.quantity, stock)
                      }
                      className="material-symbols-outlined text-on-surface-variant hover:text-on-surface cursor-pointer"
                    >
                      add
                    </button>
                  </div>
                  <div className="w-full text-right md:w-auto">
                    <span className="mb-0.5 block text-xs text-on-surface-variant md:hidden">
                      Đơn giá
                    </span>
                    <span className="price-vnd text-base font-semibold text-on-surface">
                      {formatVnd(price)}
                    </span>
                  </div>
                  <div className="w-full text-right md:w-auto">
                    <span className="mb-0.5 block text-xs text-on-surface-variant md:hidden">
                      Thành tiền
                    </span>
                    <span className="price-vnd text-base font-bold text-on-surface sm:text-lg">
                      {formatVnd(itemTotal)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-24 w-full">
            <div className="rounded-xl border border-outline-variant/20 bg-surface-container p-6 shadow-sm sm:p-8">
              <h2 className="mb-6 text-lg font-bold text-on-surface sm:text-xl">
                Tóm tắt đơn hàng
              </h2>
              <div className="mb-6 space-y-3 text-sm sm:text-base">
                <div className="flex justify-between gap-4">
                  <span className="text-on-surface-variant">Tạm tính</span>
                  <span className="price-vnd font-semibold text-on-surface">
                    {formatVnd(totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-on-surface-variant">
                    Phí vận chuyển
                  </span>
                  <span className="font-semibold text-tertiary">Miễn phí</span>
                </div>
                <div className="flex justify-between gap-4 border-t border-outline-variant/30 pt-4">
                  <span className="font-bold text-on-surface">Tổng cộng</span>
                  <span className="price-vnd text-lg font-bold text-on-surface text-red-600">
                    {formatVnd(totalPrice)}
                  </span>
                </div>
              </div>
              <div className="mb-6">
                <label className="form-label">Nhập mã giảm giá</label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    className="sv-form-input min-w-0 flex-1 bg-surface-container-lowest"
                    placeholder="SNEAKERNEW"
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
                  Thanh toán an toàn bảo mật
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
      )}

      {showClearConfirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-outline-variant/20 animate-scale-up">
            <h3 className="font-display text-lg font-bold text-on-surface mb-2">
              Xóa toàn bộ giỏ hàng
            </h3>
            <p className="text-sm text-secondary mb-6">
              Bạn có chắc chắn muốn xóa toàn bộ sản phẩm khỏi giỏ hàng của mình? Hành động này không thể hoàn tác.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="btn btn-secondary flex-1 btn-pill text-sm cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={confirmClear}
                className="btn btn-primary flex-1 btn-pill bg-red-600 hover:bg-red-700 border-none text-white text-sm cursor-pointer"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {itemToRemove && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-outline-variant/20 animate-scale-up">
            <h3 className="font-display text-lg font-bold text-on-surface mb-2">
              Xóa sản phẩm khỏi giỏ
            </h3>
            <p className="text-sm text-secondary mb-6">
              Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setItemToRemove(null)}
                className="btn btn-secondary flex-1 btn-pill text-sm cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={confirmRemove}
                className="btn btn-primary flex-1 btn-pill bg-red-600 hover:bg-red-700 border-none text-white text-sm cursor-pointer"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CartPage;
