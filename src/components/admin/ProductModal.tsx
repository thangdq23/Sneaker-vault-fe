import React, { useState, useEffect } from "react";
import type { Product } from "../../types/product.type";
import { BRANDS } from "../../utils/constants";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (productData: Partial<Product>) => Promise<void>;
}

const ProductModal = ({
  isOpen,
  onClose,
  product,
  onSave,
}: ProductModalProps): React.JSX.Element | null => {
  const AVAILABLE_SIZES = Array.from({ length: 11 }, (_, i) => 35 + i); // 35 to 45

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSale, setIsSale] = useState(false);
  const [salePrice, setSalePrice] = useState(0);
  const [isNewProduct, setIsNewProduct] = useState(true);

  const [sizes, setSizes] = useState<{ size: number; stock: number }[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      if (product) {
        setName(product.name || "");
        setSku(product.sku || "");
        setBrand(product.brand || "");
        setPrice(product.price || 0);
        setDescription(product.description || "");
        setImageUrl(product.images ? product.images.join(", ") : "");
        setIsSale(product.isSale || false);
        setSalePrice(product.salePrice || 0);
        setIsNewProduct(
          product.isNewProduct !== undefined ? product.isNewProduct : true,
        );

        if (product.sizes) {
          setSizes(
            product.sizes.map((s) => ({
              size: Number(s.size),
              stock: s.stock,
            })),
          );
        } else {
          setSizes([]);
        }
      } else {
        setName("");
        setSku("");
        setBrand("");
        setPrice(0);
        setDescription("");
        setImageUrl("");
        setIsSale(false);
        setSalePrice(0);
        setIsNewProduct(true);
        setSizes([]);
      }
    }
  }, [isOpen, product]);

  if (!isOpen) return null;

  const handleSizeToggle = (size: number, checked: boolean) => {
    if (checked) {
      setSizes((prev) => [...prev, { size, stock: 0 }]);
    } else {
      setSizes((prev) => prev.filter((s) => s.size !== size));
    }
  };

  const handleSizeStockChange = (size: number, value: number) => {
    setSizes((prev) =>
      prev.map((s) =>
        s.size === size ? { ...s, stock: Math.max(0, value) } : s,
      ),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) return setError("Tên sản phẩm không được để trống.");
    if (!sku.trim()) return setError("Mã SKU không được để trống.");
    if (!brand) return setError("Vui lòng chọn thương hiệu.");
    if (price <= 0) return setError("Giá sản phẩm phải lớn hơn 0.");

    if (sizes.length === 0) {
      return setError(
        "Vui lòng chọn và điền tồn kho cho ít nhất một kích cỡ (size).",
      );
    }

    if (isSale) {
      if (salePrice <= 0) {
        return setError("Giá khuyến mãi phải lớn hơn 0.");
      }
      if (salePrice >= price) {
        return setError("Giá khuyến mãi phải nhỏ hơn giá gốc.");
      }
    }

    const calculatedTotalStock = sizes.reduce((sum, s) => sum + s.stock, 0);

    const imagesArray = imageUrl
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url !== "");

    const productPayload: Partial<Product> = {
      name: name.trim(),
      sku: sku.trim().toUpperCase(),
      brand: brand.trim(),
      price: Number(price),
      stock: calculatedTotalStock,
      description: description.trim(),
      images: imagesArray,
      isSale,
      salePrice: isSale ? Number(salePrice) : undefined,
      isNewProduct,
      sizes: sizes.map((s) => ({ size: Number(s.size), stock: s.stock })),
    };

    try {
      setLoading(true);
      await onSave(productPayload);
      onClose();
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Đã xảy ra lỗi khi lưu sản phẩm.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden border border-outline-variant/10 flex flex-col max-h-[90vh] animate-fade-in-up font-body">
        <div className="px-6 py-5 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low">
          <h2 className="font-display text-lg font-bold text-on-background">
            {product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
          </h2>
          <button
            onClick={onClose}
            className="text-secondary hover:text-primary transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-4"
        >
          {error && (
            <div className="p-3.5 bg-rose-50 text-rose-600 rounded-xl text-xs font-semibold border border-rose-100 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">error</span>
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="form-label">Tên sản phẩm *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên giày..."
                className="form-input text-sm"
                type="text"
                required
              />
            </div>
            <div>
              <label className="form-label">Mã SKU *</label>
              <input
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="Ví dụ: NK-AF1-07"
                className="form-input text-sm font-mono uppercase"
                type="text"
                required
              />
            </div>
            <div>
              <label className="form-label">Thương hiệu *</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="form-input text-sm select-none cursor-pointer"
                required
              >
                <option value="">Chọn thương hiệu</option>
                {BRANDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Giá gốc (₫) *</label>
              <input
                value={price === 0 ? "" : price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Nhập giá bán gốc..."
                className="form-input text-sm"
                type="number"
                min="0"
                required
              />
            </div>

            <div className="md:col-span-2 space-y-3">
              <label className="form-label font-bold text-on-background">
                Kích cỡ & Số lượng tồn kho *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {AVAILABLE_SIZES.map((size) => {
                  const sizeInfo = sizes.find((s) => Number(s.size) === size);
                  const isChecked = !!sizeInfo;
                  const stockValue = sizeInfo ? sizeInfo.stock : 0;

                  return (
                    <div
                      key={size}
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                        isChecked
                          ? "border-primary bg-primary/[0.03] shadow-sm"
                          : "border-outline-variant/30 bg-surface hover:border-outline-variant/60"
                      }`}
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-on-background cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            handleSizeToggle(size, e.target.checked)
                          }
                          className="rounded text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                        />
                        Size {size}
                      </label>
                      {isChecked && (
                        <input
                          type="number"
                          min="0"
                          value={stockValue === 0 ? "" : stockValue}
                          onChange={(e) =>
                            handleSizeStockChange(size, Number(e.target.value))
                          }
                          placeholder="SL"
                          className="w-16 px-2 py-1 text-center bg-white border border-outline-variant/50 rounded-lg text-sm focus:outline-none focus:border-primary font-mono"
                          required
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <label className="form-label">
              Đường dẫn hình ảnh (Các URL phân cách bằng dấu phẩy)
            </label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              className="form-input text-sm font-mono"
              type="text"
            />
          </div>

          <div>
            <label className="form-label">Mô tả sản phẩm</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả sản phẩm chi tiết..."
              className="form-input text-sm h-24 resize-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-sm text-secondary font-semibold cursor-pointer">
              <input
                checked={isNewProduct}
                onChange={(e) => setIsNewProduct(e.target.checked)}
                className="rounded text-primary focus:ring-primary h-4 w-4"
                type="checkbox"
              />
              Sản phẩm mới (New Arrival)
            </label>

            <label className="flex items-center gap-2 text-sm text-secondary font-semibold cursor-pointer">
              <input
                checked={isSale}
                onChange={(e) => setIsSale(e.target.checked)}
                className="rounded text-primary focus:ring-primary h-4 w-4"
                type="checkbox"
              />
              Đang giảm giá (On Sale)
            </label>
          </div>

          {isSale && (
            <div className="animate-fade-in-up">
              <label className="form-label">Giá khuyến mãi (₫) *</label>
              <input
                value={salePrice === 0 ? "" : salePrice}
                onChange={(e) => setSalePrice(Number(e.target.value))}
                placeholder="Nhập giá đã giảm..."
                className="form-input text-sm border-tertiary/30 focus:shadow-[0_0_0_1px_#ab3600]"
                type="number"
                min="0"
                required
              />
            </div>
          )}

          <div className="pt-4 border-t border-outline-variant/20 flex justify-end gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl border border-outline-variant/30 text-sm font-semibold text-secondary hover:bg-surface-container-low transition-colors cursor-pointer disabled:opacity-50"
              type="button"
            >
              Hủy
            </button>
            <button
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-50"
              type="submit"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              Lưu thay thế
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
