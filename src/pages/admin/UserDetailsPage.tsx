import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { getUserById, blockUser, unblockUser } from "../../services/userApi";
import type { UserProfile } from "../../types/user.type";
import { formatVnd } from "../../utils/formatCurrency";
import { useToast } from "../../contexts/ToastContext";

const UserDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Confirm Modal State
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const fetchUserDetails = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getUserById(id);
      setUser(data.user);
      setOrders(data.orders || []);
      setTotalOrders(data.totalOrders || 0);
      setTotalSpent(data.totalSpent || 0);
    } catch (err: any) {
      showToast(
        err.response?.data?.message || err.message || "Không thể tải chi tiết người dùng.",
        "error"
      );
      navigate("/admin/users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  const handleToggleBlock = async () => {
    if (!user || !id) return;
    setUpdating(true);
    try {
      if (user.isActive !== false) {
        await blockUser(id);
        showToast("Đã khóa tài khoản người dùng thành công.", "success");
      } else {
        await unblockUser(id);
        showToast("Đã mở khóa tài khoản người dùng thành công.", "success");
      }
      setShowConfirmModal(false);
      await fetchUserDetails();
    } catch (err: any) {
      showToast(
        err.response?.data?.message || err.message || "Cập nhật trạng thái người dùng thất bại.",
        "error"
      );
    } finally {
      setUpdating(false);
    }
  };

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "confirmed":
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipping":
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "cancelled":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getOrderStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xử lý";
      case "confirmed":
      case "processing":
        return "Đã xác nhận";
      case "shipping":
      case "shipped":
        return "Đang giao";
      case "delivered":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse text-on-surface">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
          <div className="h-6 bg-gray-200 rounded w-48"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 bg-gray-200 rounded-2xl"></div>
          <div className="h-32 bg-gray-200 rounded-2xl"></div>
          <div className="h-32 bg-gray-200 rounded-2xl"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 h-80 bg-gray-200 rounded-2xl"></div>
          <div className="lg:col-span-4 h-80 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const isSelf = user._id === currentUser?._id;
  const defaultAddress = user.addresses?.find((addr) => addr.isDefault) || user.addresses?.[0];
  const latestOrder = orders.length > 0 ? orders[0] : null;

  return (
    <div className="space-y-6 animate-fade-in-up text-on-surface">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/users"
            className="flex items-center justify-center h-10 w-10 rounded-full border border-outline-variant/30 bg-white hover:bg-surface-container-low transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold text-on-background">{user.name}</h1>
              <span className={`inline-flex items-center border px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                user.isActive !== false
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                  : "bg-rose-50 text-rose-700 border-rose-100"
              }`}>
                {user.isActive !== false ? "🟢 Hoạt động" : "🔴 Đã khóa"}
              </span>
            </div>
            <p className="text-xs text-secondary mt-0.5">
              Thành viên từ: {user.createdAt ? new Date(user.createdAt).toLocaleDateString("vi-VN") : "N/A"}
            </p>
          </div>
        </div>
        
        {!isSelf && (
          <button
            disabled={updating}
            onClick={() => setShowConfirmModal(true)}
            className={`btn btn-pill text-xs px-4 py-2.5 cursor-pointer shadow-sm ${
              user.isActive !== false
                ? "btn-secondary text-rose-600 hover:bg-rose-50 border-rose-200/50"
                : "btn-primary bg-emerald-600 hover:bg-emerald-700 border-none text-white"
            }`}
          >
            <span className="material-symbols-outlined text-sm mr-1.5 leading-none align-middle">
              {user.isActive !== false ? "lock" : "lock_open"}
            </span>
            {user.isActive !== false ? "Khóa tài khoản" : "Mở khóa tài khoản"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <span className="material-symbols-outlined text-2xl">shopping_cart</span>
          </div>
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-outline">Tổng số đơn hàng</span>
            <span className="text-2xl font-display font-extrabold text-on-background mt-0.5 block">{totalOrders} đơn</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <span className="material-symbols-outlined text-2xl">payments</span>
          </div>
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-outline">Tổng chi tiêu</span>
            <span className="text-2xl font-display font-extrabold text-emerald-600 mt-0.5 block">{formatVnd(totalSpent)}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
            <span className="material-symbols-outlined text-2xl">schedule</span>
          </div>
          <div className="min-w-0 flex-1">
            <span className="block text-xs font-bold uppercase tracking-wider text-outline">Đơn hàng gần nhất</span>
            {latestOrder ? (
              <Link
                to={`/admin/orders/${latestOrder._id}`}
                className="text-base font-mono font-bold text-primary hover:underline mt-1 block truncate"
              >
                {latestOrder.orderCode}
              </Link>
            ) : (
              <span className="text-sm font-semibold text-secondary mt-1 block">Chưa mua hàng</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-outline-variant/20 shadow-sm p-6 md:p-8 space-y-6">
            <h2 className="font-display text-lg font-bold text-on-surface pb-3 border-b border-outline-variant/20">
              Lịch sử mua hàng ({orders.length})
            </h2>

            {orders.length === 0 ? (
              <div className="py-12 text-center text-secondary font-medium">
                Người dùng này chưa thực hiện đơn hàng nào trên hệ thống.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-outline-variant/30 text-xs font-bold text-secondary uppercase bg-surface-container-low/30">
                      <th className="py-3 px-4">Mã đơn</th>
                      <th className="py-3 px-4">Ngày đặt</th>
                      <th className="py-3 px-4">Tổng tiền</th>
                      <th className="py-3 px-4">Thanh toán</th>
                      <th className="py-3 px-4 text-center">Trạng thái</th>
                      <th className="py-3 px-4 text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-surface-container-low/20 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-primary">{order.orderCode}</td>
                        <td className="py-3.5 px-4 text-secondary">
                          {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-on-background">{formatVnd(order.totalAmount)}</td>
                        <td className="py-3.5 px-4">
                          <div className="text-[11px]">
                            <span className="font-bold uppercase block text-primary">{order.paymentMethod}</span>
                            <span className={`font-semibold block ${order.paymentStatus === "paid" ? "text-emerald-600" : "text-amber-600"}`}>
                              {order.paymentStatus === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`inline-block border px-2 py-0.5 rounded-full text-[10px] font-bold uppercase whitespace-nowrap ${getOrderStatusBadge(order.status)}`}>
                            {getOrderStatusText(order.status)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <Link
                            to={`/admin/orders/${order._id}`}
                            className="btn btn-secondary btn-pill text-[10px] py-1 px-3.5 inline-block font-bold cursor-pointer"
                          >
                            Xem đơn hàng
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-outline-variant/20 shadow-sm p-6 space-y-6">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-outline border-b border-outline-variant/20 pb-2">
              Thông tin chi tiết
            </h2>

            <div className="flex flex-col items-center text-center pb-4 border-b border-outline-variant/20">
              <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-primary/20 bg-surface-alt flex items-center justify-center mb-3">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-outline text-3xl">person</span>
                )}
              </div>
              <h3 className="font-display text-base font-bold text-on-surface">{user.name}</h3>
              <p className="text-xs text-secondary font-medium mt-0.5 uppercase tracking-wide">
                Vai trò: {user.role === "admin" ? "🔴 Admin" : "🔵 User"}
              </p>
            </div>

            <div className="space-y-4 text-xs font-body leading-relaxed">
              <div>
                <span className="block text-secondary font-semibold">Địa chỉ Email:</span>
                <span className="font-bold text-on-surface font-mono">{user.email}</span>
              </div>
              <div>
                <span className="block text-secondary font-semibold">Số điện thoại:</span>
                <span className="font-bold text-on-surface">{user.phone || "Chưa thiết lập"}</span>
              </div>
              <div>
                <span className="block text-secondary font-semibold">Địa chỉ giao hàng mặc định:</span>
                {defaultAddress ? (
                  <div className="bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 mt-1.5">
                    <p className="font-bold text-on-surface text-[11px]">
                      {defaultAddress.receiverName} - {defaultAddress.phone}
                    </p>
                    <p className="text-secondary mt-1 text-[11px]">
                      {defaultAddress.addressDetail}
                    </p>
                  </div>
                ) : (
                  <span className="font-medium text-secondary italic">Chưa thiết lập địa chỉ mặc định</span>
                )}
              </div>

              {user.addresses && user.addresses.length > 1 && (
                <div>
                  <span className="block text-secondary font-semibold mb-1">Các địa chỉ khác:</span>
                  <div className="space-y-2 max-h-40 overflow-y-auto no-scrollbar">
                    {user.addresses.filter((a) => !a.isDefault).map((addr) => (
                      <div key={addr._id} className="bg-surface-container-low/10 border border-outline-variant/10 rounded-xl p-2.5">
                        <p className="font-semibold text-on-surface text-[10px]">
                          {addr.receiverName} - {addr.phone}
                        </p>
                        <p className="text-[10px] text-secondary mt-0.5">
                          {addr.addressDetail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl animate-fade-in-up font-body">
            <h3 className="font-display text-lg font-bold text-on-surface mb-2">
              Xác nhận {user.isActive !== false ? "khóa" : "mở khóa"} tài khoản
            </h3>
            <p className="text-xs text-secondary mb-6 leading-relaxed">
              Bạn có chắc chắn muốn {user.isActive !== false ? "khóa" : "mở khóa"} tài khoản của người dùng{" "}
              <strong>{user.name}</strong> không?
              {user.isActive !== false && " Khi tài khoản bị khóa, người dùng này sẽ không thể đăng nhập, đặt hàng hoặc cập nhật thông tin trên hệ thống."}
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                disabled={updating}
                onClick={() => setShowConfirmModal(false)}
                className="btn btn-secondary flex-1 btn-pill text-xs cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                disabled={updating}
                onClick={handleToggleBlock}
                className={`btn flex-1 btn-pill text-white text-xs cursor-pointer flex items-center justify-center gap-2 border-none ${
                  user.isActive !== false
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {updating ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                ) : (
                  "Xác nhận"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;
