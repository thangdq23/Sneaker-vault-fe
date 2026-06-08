import React, { useState, useEffect } from "react";
import type { Product } from "../../types/product.type";
import { BRANDS } from "../../utils/constants";
import { uploadProductImages } from "../../services/productApi";

interface ProductFormProps {
  product: Product | null;
  onSave: (productData: Partial<Product>) => Promise<void>;
  onCancel: () => void;
}

const ProductForm = ({
  product,
  onSave,
  onCancel,
}: ProductFormProps): React.JSX.Element => {
  const AVAILABLE_SIZES = Array.from({ length: 11 }, (_, i) => 35 + i); // 35 to 45

  interface ImageItem {
    id: string;
    url: string;
    file?: File;
    isExisting: boolean;
  }

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const [imagesList, setImagesList] = useState<ImageItem[]>([]);
  const [thumbnailId, setThumbnailId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState("");

  const [isSale, setIsSale] = useState(false);
  const [salePrice, setSalePrice] = useState(0);
  const [isNewProduct, setIsNewProduct] = useState(true);

  const [sizes, setSizes] = useState<{ size: number; stock: number }[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    if (product) {
      setName(product.name || "");
      setSku(product.sku || "");
      setBrand(product.brand || "");
      setPrice(product.price || 0);
      setDescription(product.description || "");

      const initialImages = (product.images || []).map((url, idx) => ({
        id: `existing-${idx}-${url}`,
        url,
        isExisting: true,
      }));
      setImagesList(initialImages);
      if (initialImages.length > 0) {
        setThumbnailId(initialImages[0].id);
      } else {
        setThumbnailId(null);
      }

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
      setImagesList([]);
      setThumbnailId(null);
      setIsSale(false);
      setSalePrice(0);
      setIsNewProduct(true);
      setSizes([]);
    }
  }, [product]);

  useEffect(() => {
    return () => {
      imagesList.forEach((item) => {
        if (!item.isExisting && item.url) {
          URL.revokeObjectURL(item.url);
        }
      });
    };
  }, [imagesList]);

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

  const processFiles = (files: FileList) => {
    const validFiles: ImageItem[] = [];
    const maxSizeBytes = 5 * 1024 * 1024; // 5MB limit

    Array.from(files).forEach((file, index) => {
      if (!file.type.startsWith("image/")) {
        setError("Chỉ chấp nhận các tệp tin hình ảnh.");
        return;
      }
      if (file.size > maxSizeBytes) {
        setError(`Ảnh "${file.name}" vượt quá dung lượng giới hạn 5MB.`);
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      validFiles.push({
        id: `new-${Date.now()}-${index}-${file.name}`,
        url: objectUrl,
        file,
        isExisting: false,
      });
    });

    if (validFiles.length > 0) {
      setImagesList((prev) => {
        const updated = [...prev, ...validFiles];
        if (!thumbnailId && updated.length > 0) {
          setThumbnailId(updated[0].id);
        }
        return updated;
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const handleDeleteImage = (idToDelete: string) => {
    setImagesList((prev) => {
      const itemToDelete = prev.find((item) => item.id === idToDelete);
      if (itemToDelete && !itemToDelete.isExisting && itemToDelete.url) {
        URL.revokeObjectURL(itemToDelete.url);
      }
      const filtered = prev.filter((item) => item.id !== idToDelete);

      if (thumbnailId === idToDelete) {
        if (filtered.length > 0) {
          setThumbnailId(filtered[0].id);
        } else {
          setThumbnailId(null);
        }
      }
      return filtered;
    });
  };

  const handleSetThumbnail = (id: string) => {
    setThumbnailId(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) return setError("Tên sản phẩm không được để trống.");
    if (!brand) return setError("Vui lòng chọn thương hiệu.");
    if (price <= 0) return setError("Giá sản phẩm phải lớn hơn 0.");

    if (sizes.length === 0) {
      return setError(
        "Vui lòng chọn và điền tồn kho cho ít nhất một kích cỡ (size).",
      );
    }

    if (imagesList.length === 0) {
      return setError("Vui lòng tải lên ít nhất một ảnh sản phẩm.");
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

    try {
      setLoading(true);

      const newFiles = imagesList
        .filter((item) => !item.isExisting && item.file)
        .map((item) => item.file as File);

      let uploadedUrls: string[] = [];
      if (newFiles.length > 0) {
        setUploadProgressText("Đang tải ảnh lên Cloudinary...");
        uploadedUrls = await uploadProductImages(newFiles);
      }

      let newFileIndex = 0;
      const combinedUrls = imagesList.map((item) => {
        if (item.isExisting) {
          return item.url;
        } else {
          const url = uploadedUrls[newFileIndex];
          newFileIndex++;
          return url;
        }
      });

      const thumbItemIndex = imagesList.findIndex(
        (item) => item.id === thumbnailId,
      );
      let finalUrls = combinedUrls;
      if (thumbItemIndex !== -1) {
        const thumbnailUrl = combinedUrls[thumbItemIndex];
        const restUrls = combinedUrls.filter(
          (_, idx) => idx !== thumbItemIndex,
        );
        finalUrls = [thumbnailUrl, ...restUrls];
      }

      setUploadProgressText("Đang lưu thông tin sản phẩm...");

      const productPayload: Partial<Product> = {
        name: name.trim(),
        brand: brand.trim(),
        price: Number(price),
        stock: calculatedTotalStock,
        description: description.trim(),
        images: finalUrls,
        isSale,
        salePrice: isSale ? Number(salePrice) : undefined,
        isNewProduct,
        sizes: sizes.map((s) => ({ size: Number(s.size), stock: s.stock })),
      };

      if (sku.trim()) {
        productPayload.sku = sku.trim().toUpperCase();
      }

      await onSave(productPayload);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Đã xảy ra lỗi khi lưu sản phẩm.",
      );
      setLoading(false);
      setUploadProgressText("");
    }
  };

  return (
    <div className="bg-white rounded-3xl w-full shadow-sm border border-outline-variant/15 flex flex-col font-body overflow-hidden">
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {error && (
          <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl text-sm font-semibold border border-rose-100 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="form-label font-semibold text-on-background">
              Tên sản phẩm *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên giày..."
              className="form-input text-sm mt-1.5"
              type="text"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="form-label font-semibold text-on-background">
              Giá gốc (₫) *
            </label>
            <input
              value={price === 0 ? "" : price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Nhập giá bán gốc..."
              className="form-input text-sm mt-1.5"
              type="number"
              min="0"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="form-label font-semibold text-on-background">
              Thương hiệu *
            </label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="form-input text-sm select-none cursor-pointer mt-1.5"
              required
              disabled={loading}
            >
              <option value="">Chọn thương hiệu</option>
              {BRANDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 space-y-3">
            <label className="form-label font-bold text-on-background">
              Kích cỡ & Số lượng tồn kho *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {AVAILABLE_SIZES.map((size) => {
                const sizeInfo = sizes.find((s) => Number(s.size) === size);
                const isChecked = !!sizeInfo;
                const stockValue = sizeInfo ? sizeInfo.stock : 0;

                return (
                  <div
                    key={size}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
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
                        disabled={loading}
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
                        className="w-12 px-1 py-0.5 text-center bg-white border border-outline-variant/50 rounded-lg text-sm focus:outline-none focus:border-primary font-mono"
                        required
                        disabled={loading}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="form-label font-bold text-on-background">
            Ảnh sản phẩm *
          </label>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer bg-surface hover:bg-surface-container-low/30 ${
              isDragging
                ? "border-primary bg-primary/[0.02] scale-[0.99] shadow-inner"
                : "border-outline-variant/40 hover:border-outline-variant/80"
            } ${loading ? "opacity-50 pointer-events-none" : ""}`}
            onClick={() =>
              !loading && document.getElementById("file-upload-input")?.click()
            }
          >
            <input
              id="file-upload-input"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={loading}
            />
            <span className="material-symbols-outlined text-4xl text-secondary animate-bounce">
              cloud_upload
            </span>
            <div className="flex flex-col items-center text-center">
              <button
                type="button"
                className="text-sm font-semibold text-primary hover:underline cursor-pointer"
                disabled={loading}
              >
                Chọn ảnh
              </button>
              <span className="text-xs text-secondary mt-1">
                hoặc kéo thả ảnh vào đây
              </span>
              <span className="text-[10px] text-secondary/60 mt-1">
                Chấp nhận JPG, PNG, WEBP (Tối đa 5MB/ảnh)
              </span>
            </div>
          </div>

          {imagesList.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-3">
              {imagesList.map((item) => {
                const isThumbnail = item.id === thumbnailId;
                return (
                  <div
                    key={item.id}
                    className={`relative aspect-square rounded-xl overflow-hidden border bg-surface-container-low group shadow-sm transition-all duration-300 ${
                      isThumbnail
                        ? "border-primary ring-2 ring-primary/20 scale-[0.98]"
                        : "border-outline-variant/30 hover:border-outline-variant/80"
                    }`}
                  >
                    <img
                      src={item.url}
                      alt="Preview"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {isThumbnail ? (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded-full shadow-sm flex items-center gap-1 z-10">
                        <span className="material-symbols-outlined text-[10px]">
                          star
                        </span>
                        Ảnh chính
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSetThumbnail(item.id);
                        }}
                        disabled={loading}
                        className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 hover:bg-primary text-white text-[10px] font-bold rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-10 disabled:opacity-0"
                      >
                        Chọn làm ảnh chính
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteImage(item.id);
                      }}
                      disabled={loading}
                      className="absolute top-2 right-2 p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all cursor-pointer flex items-center justify-center z-10 disabled:opacity-0"
                      title="Xóa ảnh"
                    >
                      <span className="material-symbols-outlined text-xs">
                        close
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <label className="form-label font-semibold text-on-background">
            Mô tả sản phẩm
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nhập mô tả sản phẩm chi tiết..."
            className="form-input text-sm h-32 resize-none mt-1.5"
            disabled={loading}
          />
        </div>

        <div className="flex flex-wrap items-center gap-6 pt-2">
          <label className="flex items-center gap-2 text-sm text-secondary font-semibold cursor-pointer">
            <input
              checked={isNewProduct}
              onChange={(e) => setIsNewProduct(e.target.checked)}
              className="rounded text-primary focus:ring-primary h-4 w-4"
              type="checkbox"
              disabled={loading}
            />
            Sản phẩm mới (New Arrival)
          </label>

          <label className="flex items-center gap-2 text-sm text-secondary font-semibold cursor-pointer">
            <input
              checked={isSale}
              onChange={(e) => setIsSale(e.target.checked)}
              className="rounded text-primary focus:ring-primary h-4 w-4"
              type="checkbox"
              disabled={loading}
            />
            Đang giảm giá (On Sale)
          </label>
        </div>

        {isSale && (
          <div className="animate-fade-in-up">
            <label className="form-label font-semibold text-on-background">
              Giá khuyến mãi (₫) *
            </label>
            <input
              value={salePrice === 0 ? "" : salePrice}
              onChange={(e) => setSalePrice(Number(e.target.value))}
              placeholder="Nhập giá đã giảm..."
              className="form-input text-sm border-tertiary/30 focus:shadow-[0_0_0_1px_#ab3600] mt-1.5"
              type="number"
              min="0"
              required
              disabled={loading}
            />
          </div>
        )}

        <div className="pt-6 border-t border-outline-variant/20 flex justify-end gap-3">
          <button
            onClick={onCancel}
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
            {uploadProgressText || "Lưu sản phẩm"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
