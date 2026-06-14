import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getOrderById, updateOrderStatus, cancelOrder } from "../../services/orderApi";
import type { Order } from "../../types/order.type";
import { formatVnd } from "../../utils/formatCurrency";
import { useToast } from "../../contexts/ToastContext";
import CancelOrderModal from "../../components/admin/CancelOrderModal";

const OrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  // Modals
  const [showCancelModal, setShowCancelModal] = useState(false);

  const fetchOrderDetails = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getOrderById(id);
      setOrder(data);
    } catch (err: any) {
      showToast(
        err.response?.data?.message || err.message || "Không thể tải chi tiết đơn hàng.",
        "error"
      );
      navigate("/admin/orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const handleUpdateStatus = async (newStatus: string) => {
    if (!id) return;
    setUpdating(true);
    try {
      const res = await updateOrderStatus(id, { status: newStatus });
      showToast(res.message || "Cập nhật trạng thái đơn hàng thành công!", "success");
      // Reload order details to refresh UI state
      await fetchOrderDetails();
    } catch (err: any) {
      showToast(
        err.response?.data?.message || err.message || "Cập nhật trạng thái thất bại.",
        "error"
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelOrder = async (reason: string, note: string) => {
    if (!id) return;
    setUpdating(true);
    try {
      const res = await cancelOrder(id, { cancelReason: reason, cancelNote: note });
      showToast(res.message || "Hủy đơn hàng thành công và đã hoàn lại tồn kho.", "success");
      setShowCancelModal(false);
      await fetchOrderDetails();
    } catch (err: any) {
      showToast(
        err.response?.data?.message || err.message || "Hủy đơn hàng thất bại.",
        "error"
      );
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return {
          label: "Chờ xử lý",
          classes: "bg-amber-100 text-amber-800 border-amber-200",
        };
      case "confirmed":
      case "processing":
        return {
          label: "Đã xác nhận",
          classes: "bg-blue-100 text-blue-800 border-blue-200",
        };
      case "shipping":
      case "shipped":
        return {
          label: "Đang giao",
          classes: "bg-purple-100 text-purple-800 border-purple-200",
        };
      case "delivered":
        return {
          label: "Hoàn thành",
          classes: "bg-emerald-100 text-emerald-800 border-emerald-200",
        };
      case "cancelled":
        return {
          label: "Đã hủy",
          classes: "bg-rose-100 text-rose-800 border-rose-200",
        };
      default:
        return {
          label: status,
          classes: "bg-gray-100 text-gray-800 border-gray-200",
        };
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse text-on-surface">
        <div className="flex items-center gap-3">
          <div className="h-8 bg-gray-200 rounded w-8"></div>
          <div className="h-6 bg-gray-200 rounded w-48"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-40 bg-gray-200 rounded-2xl col-span-2"></div>
          <div className="h-40 bg-gray-200 rounded-2xl"></div>
        </div>
        <div className="h-60 bg-gray-200 rounded-2xl"></div>
      </div>
    );
  }

  if (!order) return null;

  const badge = getStatusBadge(order.status);
  const isUserObject = typeof order.user === "object";
  const customerName = isUserObject ? (order.user as any).name : "Khách vãng lai";
  const customerEmail = isUserObject ? (order.user as any).email : "N/A";

  return (
    <div className="space-y-6 animate-fade-in-up text-on-surface">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/orders"
            className="flex items-center justify-center h-10 w-10 rounded-full border border-outline-variant/30 bg-white hover:bg-surface-container-low transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold text-on-background">Đơn hàng {order.orderCode}</h1>
              <span className={`inline-block border px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${badge.classes}`}>
                {badge.label}
              </span>
            </div>
            <p className="text-xs text-secondary mt-0.5">
              Ngày đặt: {new Date(order.createdAt).toLocaleString("vi-VN")}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {order.status === "pending" && (
            <>
              <button
                disabled={updating}
                onClick={() => handleUpdateStatus("confirmed")}
                className="btn btn-primary btn-pill text-xs px-4 py-2 cursor-pointer shadow-sm"
              >
                Xác nhận đơn
              </button>
              <button
                disabled={updating}
                onClick={() => setShowCancelModal(true)}
                className="btn btn-secondary btn-pill text-xs px-4 py-2 text-rose-600 hover:bg-rose-50 border-rose-200/50 cursor-pointer"
              >
                Hủy đơn
              </button>
            </>
          )}

          {(order.status === "confirmed" || order.status === "processing") && (
            <>
              <button
                disabled={updating}
                onClick={() => handleUpdateStatus("shipping")}
                className="btn btn-primary btn-pill text-xs px-4 py-2 cursor-pointer shadow-sm"
              >
                Bắt đầu giao hàng
              </button>
              <button
                disabled={updating}
                onClick={() => setShowCancelModal(true)}
                className="btn btn-secondary btn-pill text-xs px-4 py-2 text-rose-600 hover:bg-rose-50 border-rose-200/50 cursor-pointer"
              >
                Hủy đơn
              </button>
            </>
          )}

          {(order.status === "shipping" || order.status === "shipped") && (
            <button
              disabled={updating}
              onClick={() => handleUpdateStatus("delivered")}
              className="btn btn-primary btn-pill text-xs px-4 py-2 cursor-pointer shadow-sm"
            >
              Đánh dấu hoàn thành
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-outline-variant/20 shadow-sm p-6 md:p-8 space-y-6">
            <h2 className="font-display text-lg font-bold text-on-surface pb-3 border-b border-outline-variant/20">
              Danh sách sản phẩm ({order.items?.length || 0})
            </h2>

            <div className="divide-y divide-outline-variant/20">
              {order.items?.map((item: any, idx) => {
                const isPopulated = item.product && typeof item.product === "object";
                const productName = isPopulated 
                  ? item.product.name 
                  : item.product 
                    ? `Sản phẩm ID: ${item.product}` 
                    : "Sản phẩm đã bị xóa khỏi hệ thống";
                const brand = isPopulated ? item.product.brand : "Sneaker Vault";
                const sku = isPopulated ? item.product.sku : "N/A";
                const image = isPopulated && item.product.images?.length > 0 ? item.product.images[0] : null;

                return (
                  <div key={idx} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-alt flex items-center justify-center">
                      {image ? (
                        <img
                          src={image}
                          alt={productName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="material-symbols-outlined text-outline text-2xl">image</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <h4 className="line-clamp-2 text-sm font-bold text-on-surface">
                        {productName}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-secondary font-medium">
                        <span>Size: <strong className="text-on-surface">{item.size}</strong></span>
                        <span>Số lượng: <strong className="text-on-surface">{item.quantity}</strong></span>
                        <span>Thương hiệu: <strong className="text-on-surface">{brand}</strong></span>
                      </div>
                      <p className="text-[10px] font-mono font-bold text-outline uppercase">
                        SKU: {sku}
                      </p>
                    </div>
                    <div className="text-right space-y-1 shrink-0">
                      <span className="text-sm font-bold text-on-surface block">
                        {formatVnd(item.price * item.quantity)}
                      </span>
                      <span className="text-xs text-secondary block">
                        Đơn giá: {formatVnd(item.price)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-outline-variant/20 pt-6 space-y-3 text-sm font-medium">
              <div className="flex justify-between">
                <span className="text-secondary">Tạm tính:</span>
                <span className="text-on-surface">{formatVnd(order.totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Phí vận chuyển:</span>
                <span className="text-on-surface text-emerald-600 font-semibold">Miễn phí</span>
              </div>
              <div className="flex justify-between text-base border-t border-outline-variant/20 pt-4 font-bold">
                <span>Tổng tiền:</span>
                <span className="text-primary text-lg">{formatVnd(order.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white rounded-3xl border border-outline-variant/20 shadow-sm p-6 space-y-4">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-outline border-b border-outline-variant/20 pb-2">
              Thông tin khách hàng
            </h2>
            <div className="space-y-3 text-xs leading-relaxed font-body">
              <div>
                <span className="block text-secondary font-semibold">Họ tên:</span>
                <span className="font-bold text-on-surface">{customerName}</span>
              </div>
              <div>
                <span className="block text-secondary font-semibold">Địa chỉ Email:</span>
                <span className="font-semibold text-on-surface">{customerEmail}</span>
              </div>
              <div>
                <span className="block text-secondary font-semibold">Số điện thoại liên hệ:</span>
                <span className="font-semibold text-on-surface">{order.phone}</span>
              </div>
              <div>
                <span className="block text-secondary font-semibold">Địa chỉ giao nhận hàng:</span>
                <span className="font-medium text-on-surface text-balance">{order.shippingAddress}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-outline-variant/20 shadow-sm p-6 space-y-4">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-outline border-b border-outline-variant/20 pb-2">
              Thông tin thanh toán
            </h2>
            <div className="space-y-3 text-xs leading-relaxed font-body">
              <div>
                <span className="block text-secondary font-semibold">Mã đơn hàng:</span>
                <span className="font-mono font-bold text-primary">{order.orderCode}</span>
              </div>
              <div>
                <span className="block text-secondary font-semibold">Phương thức thanh toán:</span>
                <span className="font-bold text-on-surface uppercase">{order.paymentMethod === "cod" ? "COD (Giao hàng thu tiền)" : "Thẻ tín dụng"}</span>
              </div>
              <div>
                <span className="block text-secondary font-semibold">Trạng thái thanh toán:</span>
                <span className={`font-bold uppercase tracking-wider ${order.paymentStatus === "paid" ? "text-emerald-600" : "text-amber-600"}`}>
                  {order.paymentStatus === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
                </span>
              </div>
            </div>
          </div>

          {/* Cancelled Info Card */}
          {order.status === "cancelled" && (
            <div className="bg-rose-50 rounded-3xl border border-rose-100 shadow-sm p-6 space-y-4 text-rose-950 font-body">
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-rose-800 border-b border-rose-200/50 pb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">cancel</span>
                Thông tin hủy đơn
              </h2>
              <div className="space-y-3 text-xs leading-relaxed">
                <div>
                  <span className="block text-rose-800/80 font-semibold">Lý do hủy:</span>
                  <span className="font-bold text-rose-950">{order.cancelReason || "Không xác định"}</span>
                </div>
                {order.cancelNote && (
                  <div>
                    <span className="block text-rose-800/80 font-semibold">Ghi chú bổ sung:</span>
                    <span className="font-medium text-rose-950 whitespace-pre-wrap">{order.cancelNote}</span>
                  </div>
                )}
                {order.cancelledAt && (
                  <div>
                    <span className="block text-rose-800/80 font-semibold">Thời gian hủy:</span>
                    <span className="font-medium text-rose-950">
                      {new Date(order.cancelledAt).toLocaleString("vi-VN")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      <CancelOrderModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelOrder}
        orderCode={order.orderCode}
        isSubmitting={updating}
      />
    </div>
  );
};

export default OrderDetailsPage;
