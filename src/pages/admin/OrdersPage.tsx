import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listAllOrders, cancelOrder } from "../../services/orderApi";
import type { Order } from "../../types/order.type";
import { formatVnd } from "../../utils/formatCurrency";
import { useToast } from "../../contexts/ToastContext";
import CancelOrderModal from "../../components/admin/CancelOrderModal";

const OrdersPage = (): React.JSX.Element => {
  const { showToast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);
  const [cancelOrderCode, setCancelOrderCode] = useState<string>("");
  const [isCancelling, setIsCancelling] = useState(false);

  const handleConfirmCancel = async (reason: string, note: string) => {
    if (!cancelOrderId) return;
    setIsCancelling(true);
    try {
      const res = await cancelOrder(cancelOrderId, {
        cancelReason: reason,
        cancelNote: note,
      });
      showToast(
        res.message || "Hủy đơn hàng thành công và đã hoàn lại tồn kho.",
        "success",
      );
      setCancelOrderId(null);
      await fetchOrdersData();
    } catch (err: any) {
      showToast(
        err.response?.data?.message || err.message || "Hủy đơn hàng thất bại.",
        "error",
      );
    } finally {
      setIsCancelling(false);
    }
  };

  const fetchOrdersData = async () => {
    setLoading(true);
    try {
      const res = await listAllOrders({
        page,
        limit,
        status: statusFilter,
        search: search.trim() || undefined,
      });
      setOrders(res.data);
      setTotalPages(res.meta.totalPages || 1);
      setTotalOrders(res.meta.total || 0);
    } catch (err: any) {
      showToast(
        err.response?.data?.message ||
          err.message ||
          "Không thể tải danh sách đơn hàng.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdersData();
  }, [page, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchOrdersData();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return {
          label: "🟡 Chờ xử lý",
          classes: "bg-amber-50 text-amber-700 border-amber-200",
        };
      case "confirmed":
      case "processing":
        return {
          label: "🔵 Đã xác nhận",
          classes: "bg-blue-50 text-blue-700 border-blue-200",
        };
      case "shipping":
      case "shipped":
        return {
          label: "🟣 Đang giao",
          classes: "bg-purple-50 text-purple-700 border-purple-200",
        };
      case "delivered":
        return {
          label: "🟢 Hoàn thành",
          classes: "bg-emerald-50 text-emerald-700 border-emerald-200",
        };
      case "cancelled":
        return {
          label: "🔴 Đã hủy",
          classes: "bg-rose-50 text-rose-700 border-rose-200",
        };
      default:
        return {
          label: status,
          classes: "bg-gray-50 text-gray-700 border-gray-200",
        };
    }
  };

  const renderSkeletonRow = (index: number) => (
    <tr key={`skeleton-${index}`} className="animate-pulse">
      <td className="py-4 px-6">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </td>
      <td className="py-4 px-6">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-28"></div>
          <div className="h-3 bg-gray-200 rounded w-36"></div>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </td>
      <td className="py-4 px-6">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </td>
      <td className="py-4 px-6">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </td>
      <td className="py-4 px-6">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </td>
      <td className="py-4 px-6">
        <div className="h-6 bg-gray-200 rounded-full w-24 mx-auto"></div>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6 animate-fade-in-up text-on-surface">
      <div>
        <h1 className="font-display text-2xl font-bold text-on-background">
          Quản lý đơn hàng
        </h1>
        <p className="text-sm text-secondary">
          Xem, lọc và cập nhật tiến trình xử lý đơn hàng của Sneaker Vault.
        </p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center bg-surface-container-low px-4 py-2 rounded-full w-full md:w-96 border border-outline-variant/30"
        >
          <span className="material-symbols-outlined text-outline text-lg">
            search
          </span>
          <input
            className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder-on-surface-variant/50 ml-2 outline-none"
            placeholder="Tìm mã đơn, tên khách, số điện thoại..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setPage(1);
                setTimeout(() => fetchOrdersData());
              }}
              className="material-symbols-outlined text-outline hover:text-primary text-sm cursor-pointer ml-1"
            >
              close
            </button>
          )}
        </form>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto font-body">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="bg-surface-container-low text-sm rounded-xl px-4 py-2 border border-outline-variant/30 text-on-surface focus:outline-none cursor-pointer"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">🟡 Chờ xử lý</option>
            <option value="confirmed">🔵 Đã xác nhận</option>
            <option value="shipping">🟣 Đang giao</option>
            <option value="delivered">🟢 Hoàn thành</option>
            <option value="cancelled">🔴 Đã hủy</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-xs font-semibold text-secondary uppercase bg-surface-container-low/50">
                <th className="py-3.5 px-6">Mã đơn</th>
                <th className="py-3.5 px-6">Khách hàng</th>
                <th className="py-3.5 px-6">Số điện thoại</th>
                <th className="py-3.5 px-6">Ngày mua</th>
                <th className="py-3.5 px-6">Tổng tiền</th>
                <th className="py-3.5 px-6">Thanh toán</th>
                <th className="py-3.5 px-6">Trạng thái</th>
                <th className="py-3.5 px-6 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-sm">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => renderSkeletonRow(i))
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-12 text-center text-secondary font-medium"
                  >
                    Không tìm thấy đơn hàng nào.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const badge = getStatusBadge(order.status);
                  const isUserObject = typeof order.user === "object";
                  const customerName = isUserObject
                    ? (order.user as any).name
                    : "Khách vãng lai";
                  const customerEmail = isUserObject
                    ? (order.user as any).email
                    : "";

                  return (
                    <tr
                      key={order._id}
                      className="hover:bg-surface-container-low/20 transition-colors"
                    >
                      <td className="py-4 px-6 font-mono font-bold text-primary">
                        {order.orderCode}
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-on-background">
                            {customerName}
                          </p>
                          <p className="text-xs text-secondary">
                            {customerEmail}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-secondary">
                        {order.phone}
                      </td>
                      <td className="py-4 px-6 text-secondary">
                        {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="py-4 px-6 font-semibold text-on-background">
                        {formatVnd(order.totalAmount)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-xs">
                          <p className="font-semibold uppercase text-primary">
                            {order.paymentMethod}
                          </p>
                          <p
                            className={`text-[10px] ${order.paymentStatus === "paid" ? "text-emerald-600" : "text-amber-600"}`}
                          >
                            {order.paymentStatus === "paid"
                              ? "Đã thanh toán"
                              : "Chưa thanh toán"}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-block border px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${badge.classes}`}
                        >
                          {badge.label}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-1.5">
                          <Link
                            to={`/admin/orders/${order._id}`}
                            className="p-1.5 hover:bg-surface-container-low rounded-lg text-secondary hover:text-primary transition-colors cursor-pointer flex items-center"
                            title="Chi tiết đơn"
                          >
                            <span className="material-symbols-outlined text-lg">
                              visibility
                            </span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-outline-variant/20 px-6 py-4 bg-surface-container-lowest">
            <p className="text-xs text-secondary font-medium">
              Hiển thị{" "}
              <span className="font-bold text-primary">{orders.length}</span>{" "}
              trên <span className="font-bold text-primary">{totalOrders}</span>{" "}
              đơn hàng
            </p>
            <div className="flex gap-2">
              <button
                disabled={page === 1 || loading}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="btn btn-secondary btn-pill text-xs min-h-0 py-1.5 px-3 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Trước
              </button>
              <div className="flex items-center gap-1.5 text-xs font-bold text-secondary">
                Trang {page} / {totalPages}
              </div>
              <button
                disabled={page === totalPages || loading}
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="btn btn-secondary btn-pill text-xs min-h-0 py-1.5 px-3 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Cancel Confirmation Modal */}
      <CancelOrderModal
        isOpen={cancelOrderId !== null}
        onClose={() => setCancelOrderId(null)}
        onConfirm={handleConfirmCancel}
        orderCode={cancelOrderCode}
        isSubmitting={isCancelling}
      />
    </div>
  );
};

export default OrdersPage;
