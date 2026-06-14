import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface CancelOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string, note: string) => Promise<void>;
  orderCode: string;
  isSubmitting: boolean;
}

const CancelOrderModal = ({
  isOpen,
  onClose,
  onConfirm,
  orderCode,
  isSubmitting,
}: CancelOrderModalProps) => {
  const [reason, setReason] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setReason("");
      setNote("");
      setError(null);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const reasons = [
    "Khách đổi ý",
    "Không liên lạc được khách",
    "Hết hàng",
    "Sai thông tin giao hàng",
    "Khác",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!reason) {
      setError("Vui lòng chọn một lý do hủy đơn hàng.");
      return;
    }

    if (reason === "Khác" && !note.trim()) {
      setError("Vui lòng nhập ghi chú bổ sung khi chọn lý do Khác.");
      return;
    }

    onConfirm(reason, note);
  };

  return createPortal(
    <div className="fixed inset-0 bg-zinc-950/50 backdrop-blur-[3px] z-[250] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col animate-fade-in-up font-body">
        {/* Header */}
        <div className="px-6 py-5 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low">
          <div>
            <h2 className="font-display text-base font-bold text-on-background">
              Hủy đơn hàng {orderCode}
            </h2>
            <p className="text-xs text-secondary mt-0.5">
              Xác nhận lý do hủy đơn hàng và hoàn lại kho.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-secondary hover:text-primary transition-colors cursor-pointer"
            type="button"
            disabled={isSubmitting}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="p-6 space-y-4">
            <div>
              <label className="text-xs font-bold text-on-surface uppercase tracking-wider block mb-2">
                Lý do hủy <span className="text-rose-500">*</span>
              </label>
              <div className="space-y-2">
                {reasons.map((r) => (
                  <label
                    key={r}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest hover:bg-surface-container-low/30 transition-colors cursor-pointer text-sm font-semibold"
                  >
                    <input
                      type="radio"
                      name="cancelReason"
                      value={r}
                      checked={reason === r}
                      onChange={() => {
                        setReason(r);
                        setError(null);
                      }}
                      className="h-4 w-4 text-primary focus:ring-primary border-outline-variant/50"
                      disabled={isSubmitting}
                    />
                    <span className="text-on-surface">{r}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-on-surface uppercase tracking-wider block mb-2">
                Ghi chú bổ sung {reason === "Khác" && <span className="text-rose-500">*</span>}
              </label>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                  setError(null);
                }}
                placeholder={
                  reason === "Khác"
                    ? "Vui lòng nhập lý do cụ thể..."
                    : "Ghi chú thêm về lý do hủy đơn..."
                }
                className="sv-form-input bg-surface-container-lowest border border-outline-variant/30 text-on-surface resize-none p-3 rounded-2xl w-full text-sm focus:outline-none"
                disabled={isSubmitting}
                required={reason === "Khác"}
              />
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-200/50 rounded-xl p-3 text-xs text-rose-600 font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">error</span>
                {error}
              </div>
            )}

            {/* Warning Banner */}
            <div className="bg-amber-50 rounded-xl p-3 text-xs text-amber-800 font-medium flex gap-2 border border-amber-100/50">
              <span className="material-symbols-outlined text-base text-amber-600 shrink-0">warning</span>
              <p className="leading-relaxed">
                <strong>Cảnh báo:</strong> Hành động này sẽ hủy đơn hàng và tự động hoàn lại số lượng tồn kho. Không thể hoàn tác sau khi xác nhận.
              </p>
            </div>
          </div>

          <div className="px-6 pb-5 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold transition-colors cursor-pointer"
              type="button"
              disabled={isSubmitting}
            >
              Đóng
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Đang xử lý...
                </>
              ) : (
                "Xác nhận hủy"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default CancelOrderModal;
