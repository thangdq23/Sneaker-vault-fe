import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { clearCartItems } from "../../store/cartSlice";
import { verifyVnpayPayment } from "../../services/orderApi";
import { formatVnd } from "../../utils/formatCurrency";

const errorMap: Record<string, string> = {
  "07": "Trừ tiền thành công nhưng giao dịch bị nghi ngờ. Giao dịch này sẽ được rà soát bởi ngân hàng.",
  "09": "Giao dịch không thành công do Thẻ/Tài khoản của bạn chưa đăng ký dịch vụ Internet Banking.",
  "10": "Giao dịch không thành công do bạn xác thực thông tin thẻ/tài khoản không đúng quá 3 lần.",
  "11": "Đã hết hạn chờ thanh toán. Vui lòng thực hiện lại giao dịch mới.",
  "12": "Giao dịch không thành công do thẻ hoặc tài khoản của bạn đang bị khóa.",
  "24": "Giao dịch đã bị hủy bởi quý khách hàng.",
  "51": "Tài khoản của bạn không đủ số dư để thực hiện giao dịch.",
  "65": "Tài khoản của bạn đã vượt quá hạn mức giao dịch cho phép trong ngày.",
  "75": "Hệ thống ngân hàng thanh toán hiện đang bảo trì. Vui lòng thử lại sau.",
  "79": "Giao dịch thất bại do nhập sai mật khẩu thanh toán quá số lần quy định.",
  "99": "Giao dịch thất bại do lỗi không xác định từ hệ thống VNPAY.",
};

const VnPayReturnPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const responseCode = searchParams.get("vnp_ResponseCode");
  const transactionNo = searchParams.get("vnp_TransactionNo");
  const amount = searchParams.get("vnp_Amount");
  const orderCode = searchParams.get("vnp_TxnRef");
  const payDate = searchParams.get("vnp_PayDate");

  useEffect(() => {
    const checkPayment = async () => {
      try {
        const queryParams: Record<string, string> = {};
        searchParams.forEach((value, key) => {
          queryParams[key] = value;
        });

        const result = await verifyVnpayPayment(queryParams);
        if (result.success) {
          setSuccess(true);
          setOrder(result.order);
          void dispatch(clearCartItems());
        } else {
          setSuccess(false);
          setOrder(result.order);
          const code = result.code || responseCode || "99";
          setErrorMsg(errorMap[code] || "Thanh toán thất bại. Vui lòng liên hệ hỗ trợ.");
        }
      } catch (err: any) {
        setSuccess(false);
        setErrorMsg(err.response?.data?.message || "Lỗi xác thực chữ ký số giao dịch.");
      } finally {
        setLoading(false);
      }
    };

    void checkPayment();
  }, [searchParams, dispatch, responseCode]);

  // Format payDate YYYYMMDDHHmmss to DD/MM/YYYY HH:mm:ss
  const formatPayDate = (dateStr: string | null) => {
    if (!dateStr || dateStr.length !== 14) return "";
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    const hour = dateStr.slice(8, 10);
    const minute = dateStr.slice(10, 12);
    const second = dateStr.slice(12, 14);
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-md px-margin-mobile pb-20 pt-32 text-center md:px-6">
        <div className="rounded-3xl border border-outline-variant/20 bg-surface-container p-8 shadow-xl flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <h1 className="font-display text-xl font-bold text-on-surface mb-2">
            Đang xác thực giao dịch...
          </h1>
          <p className="text-xs text-on-surface-variant font-body">
            Vui lòng không đóng trình duyệt hoặc tải lại trang trong quá trình kiểm tra.
          </p>
        </div>
      </main>
    );
  }

  if (success && order) {
    return (
      <main className="mx-auto max-w-md px-margin-mobile pb-20 pt-32 text-center md:px-6">
        <div className="rounded-3xl border border-outline-variant/20 bg-surface-container p-8 shadow-xl">
          <span className="material-symbols-outlined text-6xl text-emerald-600 mb-4 animate-bounce">
            check_circle
          </span>
          <h1 className="font-display text-2xl font-bold text-on-surface mb-2">
            Thanh toán thành công!
          </h1>
          <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
            Cảm ơn bạn đã mua sắm tại Sneaker Vault. Đơn hàng đã được xác nhận thanh toán.
          </p>
          <div className="space-y-3 mb-8 text-left text-sm border-t border-outline-variant/30 pt-6 font-body">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Mã đơn hàng:</span>
              <span className="font-mono font-bold text-primary">
                {order.orderCode}
              </span>
            </div>
            {transactionNo && (
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Mã giao dịch VNPAY:</span>
                <span className="font-mono text-on-surface">{transactionNo}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Tổng thanh toán:</span>
              <span className="font-bold text-primary">
                {formatVnd(order.totalAmount)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Phương thức:</span>
              <span className="font-semibold text-on-surface uppercase">
                VNPAY Gateway
              </span>
            </div>
            {payDate && (
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Thời gian thanh toán:</span>
                <span className="font-semibold text-on-surface">
                  {formatPayDate(payDate)}
                </span>
              </div>
            )}
            <div className="flex flex-col gap-1 border-t border-outline-variant/30 pt-3 text-xs leading-relaxed">
              <span className="text-on-surface-variant">Địa chỉ nhận hàng:</span>
              <span className="font-medium text-on-surface">{order.shippingAddress}</span>
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
    <main className="mx-auto max-w-md px-margin-mobile pb-20 pt-32 text-center md:px-6">
      <div className="rounded-3xl border border-outline-variant/20 bg-surface-container p-8 shadow-xl">
        <span className="material-symbols-outlined text-6xl text-rose-600 mb-4 animate-pulse">
          error
        </span>
        <h1 className="font-display text-2xl font-bold text-on-surface mb-2">
          Thanh toán thất bại
        </h1>
        <p className="text-sm text-rose-600 mb-6 font-body font-semibold">
          {errorMsg}
        </p>
        <div className="space-y-3 mb-8 text-left text-sm border-t border-outline-variant/30 pt-6 font-body">
          {orderCode && (
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Mã đơn hàng:</span>
              <span className="font-mono font-bold text-on-surface">
                {orderCode}
              </span>
            </div>
          )}
          {amount && (
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Số tiền giao dịch:</span>
              <span className="font-bold text-on-surface">
                {formatVnd(Number(amount) / 100)}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <Link to="/checkout" className="btn btn-primary btn-pill w-full">
            Quay lại trang thanh toán
          </Link>
          <Link to="/" className="btn btn-secondary btn-pill w-full">
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </main>
  );
};

export default VnPayReturnPage;
