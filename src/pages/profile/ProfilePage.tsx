import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout, updateUserProfile } from "../../store/authSlice";
import { resetCartState } from "../../store/cartSlice";
import { getMyOrders } from "../../services/orderApi";
import type { Order } from "../../types/order.type";
import { formatVnd } from "../../utils/formatCurrency";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { token, user, isLoading: authLoading } = useAppSelector((state) => state.auth);
  
  const [newName, setNewName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updateMsg, setUpdateMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (user?.name) {
      setNewName(user.name);
    }

    const loadOrders = async () => {
      setOrdersLoading(true);
      setOrdersError(null);
      try {
        const res = await getMyOrders();
        setOrders(res.data);
      } catch (err: any) {
        setOrdersError(err.response?.data?.message || err.message || "Không thể tải danh sách đơn hàng.");
      } finally {
        setOrdersLoading(false);
      }
    };

    void loadOrders();
  }, [token, navigate, user]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetCartState());
    navigate("/login");
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateMsg(null);

    if (!newName.trim() || newName.trim().length < 3) {
      setUpdateMsg({ type: "error", text: "Tên phải có ít nhất 3 ký tự." });
      return;
    }

    try {
      const resultAction = await dispatch(updateUserProfile(newName.trim()));
      if (updateUserProfile.fulfilled.match(resultAction)) {
        setUpdateMsg({ type: "success", text: "Cập nhật thông tin cá nhân thành công!" });
        setIsEditing(false);
      } else {
        setUpdateMsg({
          type: "error",
          text: (resultAction.payload as string) || "Cập nhật thất bại. Vui lòng thử lại.",
        });
      }
    } catch (err: any) {
      setUpdateMsg({ type: "error", text: err.message || "Có lỗi xảy ra." });
    }
  };

  if (!token || !user) return null;

  const getStatusBadgeClass = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "processing":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "shipped":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Đang chờ";
      case "processing":
        return "Đang xử lý";
      case "shipped":
        return "Đang giao hàng";
      case "delivered":
        return "Đã giao hàng";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  return (
    <main className="mx-auto max-w-container-max px-margin-mobile pb-20 pt-28 md:px-margin-desktop md:pt-32">
      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 items-start">
        {/* Left Card: Profile Details */}
        <aside className="lg:col-span-4 rounded-3xl border border-outline-variant/20 bg-surface-container p-6 shadow-sm text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white uppercase shadow-md">
            {user.name
              ? user.name.split(" ").map((s) => s[0]).join("").slice(0, 2)
              : user.email.charAt(0)}
          </div>
          
          <h2 className="font-display text-xl font-bold text-on-surface">{user.name}</h2>
          <p className="text-sm text-on-surface-variant mb-6">{user.email}</p>
          <span className="inline-block rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold text-primary uppercase mb-8">
            {user.role} Account
          </span>

          <div className="space-y-3 pt-6 border-t border-outline-variant/30">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="btn btn-secondary w-full btn-pill cursor-pointer"
              >
                Chỉnh sửa tên
              </button>
            ) : (
              <form onSubmit={handleUpdateProfile} className="space-y-3 text-left">
                <div>
                  <label className="form-label">Họ và tên mới</label>
                  <input
                    type="text"
                    required
                    className="form-input bg-surface-container-lowest"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                {updateMsg && (
                  <p className={`text-xs font-semibold ${updateMsg.type === "success" ? "text-emerald-600" : "text-rose-600"}`}>
                    {updateMsg.text}
                  </p>
                )}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="btn btn-primary flex-1 btn-pill text-xs cursor-pointer"
                  >
                    {authLoading ? "Lưu..." : "Lưu"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setNewName(user.name);
                      setUpdateMsg(null);
                    }}
                    className="btn btn-secondary flex-1 btn-pill text-xs cursor-pointer"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-secondary w-full btn-pill text-error hover:bg-rose-50 border-rose-200/50 cursor-pointer"
            >
              Đăng xuất
            </button>
          </div>
        </aside>

        {/* Right Area: Order History */}
        <section className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm md:p-8">
            <h2 className="font-display text-xl font-bold text-on-surface mb-6">
              Lịch sử mua hàng
            </h2>

            {ordersLoading ? (
              <div className="py-12 text-center text-on-surface-variant font-medium">
                Đang tải lịch sử đơn hàng...
              </div>
            ) : ordersError ? (
              <div className="py-12 text-center text-rose-600 font-semibold bg-rose-50 rounded-2xl border border-rose-200">
                {ordersError}
              </div>
            ) : orders.length === 0 ? (
              <div className="py-16 text-center text-on-surface-variant">
                <span className="material-symbols-outlined text-5xl text-outline-variant mb-3">
                  shopping_cart
                </span>
                <p className="font-medium text-base mb-1">Chưa có đơn hàng nào</p>
                <p className="text-sm text-on-surface-variant mb-6">
                  Bạn chưa thực hiện bất kỳ đơn hàng nào tại cửa hàng.
                </p>
                <Link to="/shop" className="btn btn-primary btn-pill">
                  Mua sắm ngay
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="rounded-2xl border border-outline-variant/35 bg-surface-container-lowest p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Order Head */}
                    <div className="flex flex-col gap-2 border-b border-outline-variant/30 pb-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <span className="block text-xs font-semibold text-on-surface-variant">
                          Mã đơn hàng
                        </span>
                        <span className="font-mono text-sm font-bold text-primary">
                          #{order._id}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-block rounded-full border px-2.5 py-0.5 text-xs font-bold leading-normal uppercase">
                          {order.paymentMethod}
                        </span>
                        <span
                          className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-bold leading-normal uppercase ${getStatusBadgeClass(
                            order.status
                          )}`}
                        >
                          {getStatusText(order.status)}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="py-4 space-y-3">
                      {order.items?.map((item: any, idx) => {
                        // Sometimes product can be ID string or fully populated product object. Let's handle both
                        const isPopulated = typeof item.product === "object";
                        const productName = isPopulated ? item.product.name : `Sản phẩm #${item.product}`;
                        const brand = isPopulated ? item.product.brand : "Sneaker Vault";

                        return (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="min-w-0 flex-1">
                              <h4 className="line-clamp-1 text-sm font-bold text-on-surface">
                                {productName}
                              </h4>
                              <p className="text-xs text-on-surface-variant">
                                Size: {item.size} | Thương hiệu: {brand} | Số lượng: {item.quantity}
                              </p>
                            </div>
                            <span className="price-vnd text-sm font-bold text-on-surface whitespace-nowrap">
                              {formatVnd(item.price * item.quantity)}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Order Foot */}
                    <div className="flex flex-col gap-3 border-t border-outline-variant/30 pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <span className="block text-xs text-on-surface-variant">Giao tới:</span>
                        <span className="text-xs font-medium text-on-surface line-clamp-1">{order.shippingAddress}</span>
                      </div>
                      <div className="text-right sm:shrink-0">
                        <span className="block text-xs text-on-surface-variant">Tổng tiền</span>
                        <span className="price-vnd text-base font-bold text-primary sm:text-lg">
                          {formatVnd(order.totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
