import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Product } from "../../types/product.type";

interface ProductSizesModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductSizesModal = ({
  isOpen,
  onClose,
  product,
}: ProductSizesModalProps): React.JSX.Element | null => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const availableSizes = Array.from({ length: 11 }, (_, i) => 35 + i); // 35 to 45

  const sizeMap: Record<string | number, number> = {};
  if (product.sizes) {
    product.sizes.forEach((s) => {
      sizeMap[s.size] = s.stock;
    });
  }

  return createPortal(
    <div className="fixed inset-0 bg-zinc-950/50 backdrop-blur-[3px] z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col animate-fade-in-up font-body">
        <div className="px-6 py-5 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low">
          <div>
            <h2 className="font-display text-base font-bold text-on-background">
              Chi tiết tồn kho theo size
            </h2>
            <p className="text-xs text-secondary mt-0.5 line-clamp-1">
              {product.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-secondary hover:text-primary transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {availableSizes.map((size) => {
              const stock = sizeMap[size];
              const isAvailable = stock !== undefined;
              const hasStock = isAvailable && stock > 0;

              return (
                <div
                  key={size}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border transition-all ${
                    hasStock
                      ? "border-emerald-200 bg-emerald-50/30 text-emerald-800"
                      : isAvailable && stock === 0
                        ? "border-rose-200 bg-rose-50/30 text-rose-800"
                        : "border-zinc-100 bg-zinc-50 text-zinc-400"
                  }`}
                >
                  <span className="text-xs font-bold font-display">Size {size}</span>
                  <span className="text-xs mt-1.5 font-medium">
                    {hasStock ? (
                      `${stock} đôi`
                    ) : isAvailable && stock === 0 ? (
                      <span className="font-semibold text-rose-600">Hết hàng</span>
                    ) : (
                      <span className="text-[10px] text-zinc-400">Không bán</span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-outline-variant/20 flex justify-between items-center text-sm">
            <span className="text-secondary font-medium">Tổng tồn kho:</span>
            <span className="font-bold text-primary-fixed bg-zinc-900 text-white px-3 py-1 rounded-full text-xs font-mono">
              {product.stock || 0} đôi
            </span>
          </div>
        </div>

        <div className="px-6 pb-5 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-sm font-semibold transition-colors cursor-pointer"
            type="button"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProductSizesModal;
