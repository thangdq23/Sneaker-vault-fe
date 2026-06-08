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
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSale, setIsSale] = useState(false);
  const [salePrice, setSalePrice] = useState(0);
  const [isNewProduct, setIsNewProduct] = useState(true);

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
        setStock(product.stock || 0);
        setDescription(product.description || "");
        setImageUrl(product.images ? product.images.join(", ") : "");
        setIsSale(product.isSale || false);
        setSalePrice(product.salePrice || 0);
        setIsNewProduct(
          product.isNewProduct !== undefined ? product.isNewProduct : true,
        );
      } else {
        setName("");
        setSku("");
        setBrand("");
        setPrice(0);
        setStock(0);
        setDescription("");
        setImageUrl("");
        setIsSale(false);
        setSalePrice(0);
        setIsNewProduct(true);
      }
    }
  }, [isOpen, product]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) return setError("Tên sản phẩm không được để trống.");
    if (!sku.trim()) return setError("Mã SKU không được để trống.");
    if (!brand) return setError("Vui lòng chọn thương hiệu.");
    if (price <= 0) return setError("Giá sản phẩm phải lớn hơn 0.");
    if (stock < 0) return setError("Số lượng tồn kho không được nhỏ hơn 0.");

    if (isSale) {
      if (salePrice <= 0) {
        return setError("Giá khuyến mãi phải lớn hơn 0.");
      }
      if (salePrice >= price) {
        return setError("Giá khuyến mãi phải nhỏ hơn giá gốc.");
      }
    }

    const imagesArray = imageUrl
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url !== "");

    const productPayload: Partial<Product> = {
      name: name.trim(),
      sku: sku.trim().toUpperCase(),
      brand: brand.trim(),
      price: Number(price),
      stock: Number(stock),
      description: description.trim(),
      images: imagesArray,
      isSale,
      salePrice: isSale ? Number(salePrice) : undefined,
      isNewProduct,
      sizes: product?.sizes || [{ size: "40", stock: Number(stock) }],
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
            <div>
              <label className="form-label">Tồn kho (đôi) *</label>
              <input
                value={stock === 0 ? "" : stock}
                onChange={(e) => setStock(Number(e.target.value))}
                placeholder="Nhập số lượng nhập..."
                className="form-input text-sm"
                type="number"
                min="0"
                required
              />
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
