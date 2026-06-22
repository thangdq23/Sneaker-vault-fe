import React, { useState, useEffect, useRef } from "react";
import { useToast } from "../../contexts/ToastContext";
import {
  getBanners,
  addBanner,
  updateBanner,
  deleteBanner,
  type BannerItem,
} from "../../utils/bannerHelper";
import { uploadProductImages } from "../../services/productApi";

const BannersPage = (): React.JSX.Element => {
  const { showToast } = useToast();
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerItem | null>(null);

  // Form states
  const [link, setLink] = useState("/shop");
  const [alt, setAlt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadBanners = () => {
    setBanners(getBanners());
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const resetForm = () => {
    setLink("/shop");
    setAlt("");
    setImageUrl("");
    setSelectedFile(null);
    setEditingBanner(null);
    setIsFormOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleStartAdd = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const handleStartEdit = (banner: BannerItem) => {
    setEditingBanner(banner);
    setLink(banner.link);
    setAlt(banner.alt);
    setImageUrl(banner.image);
    setSelectedFile(null);
    setIsFormOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // Create preview local url
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    let finalImageUrl = imageUrl;

    try {
      setUploadProgress(true);

      // If there's a new file selected, upload it first
      if (selectedFile) {
        showToast("Đang tải ảnh lên máy chủ...", "info");
        const urls = await uploadProductImages([selectedFile]);
        if (urls && urls.length > 0) {
          finalImageUrl = urls[0];
        } else {
          throw new Error("Không nhận được URL ảnh từ máy chủ.");
        }
      }

      if (!finalImageUrl) {
        showToast("Vui lòng tải lên ảnh hoặc nhập URL ảnh.", "error");
        setUploadProgress(false);
        return;
      }

      if (editingBanner) {
        // Update existing banner
        const updated: BannerItem = {
          ...editingBanner,
          image: finalImageUrl,
          link: link.trim(),
          alt: alt.trim() || "Sneaker Vault Banner",
        };
        const success = updateBanner(updated);
        if (success) {
          showToast("Cập nhật banner thành công!", "success");
          resetForm();
          loadBanners();
        } else {
          showToast("Không tìm thấy banner để cập nhật.", "error");
        }
      } else {
        // Create new banner
        addBanner({
          image: finalImageUrl,
          link: link.trim(),
          alt: alt.trim() || "Sneaker Vault Banner",
        });
        showToast("Thêm banner thành công!", "success");
        resetForm();
        loadBanners();
      }
    } catch (err: any) {
      showToast(err.message || "Đã xảy ra lỗi khi lưu banner.", "error");
    } finally {
      setUploadProgress(false);
    }
  };

  const handleDeleteBanner = (id: string, altText: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa banner "${altText}"?`)) {
      const success = deleteBanner(id);
      if (success) {
        showToast("Xóa banner thành công!", "success");
        loadBanners();
        if (editingBanner?.id === id) {
          resetForm();
        }
      } else {
        showToast("Không thể xóa banner.", "error");
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-on-background">
            Quản lý banner
          </h1>
          <p className="text-sm text-secondary">
            Xem, thêm mới, sửa và xóa các slide banner hiển thị trên trang chủ cửa hàng.
          </p>
        </div>
        {!isFormOpen && (
          <button
            onClick={handleStartAdd}
            className="btn btn-primary flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Thêm banner mới
          </button>
        )}
      </div>

      {/* Form Card (Inline Add/Edit) */}
      {isFormOpen && (
        <div className="bg-white p-6 rounded-3xl border border-outline-variant/15 shadow-sm max-w-2xl animate-fade-in-up">
          <h3 className="font-display text-lg font-bold text-on-background mb-4">
            {editingBanner ? "Chỉnh sửa banner" : "Thêm banner mới"}
          </h3>
          <form onSubmit={handleSaveBanner} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* File Select */}
              <div className="space-y-2">
                <label className="form-label font-semibold text-on-background text-sm">
                  Tải lên ảnh banner *
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant/30 rounded-xl text-sm font-semibold cursor-pointer smooth-transition"
                    disabled={uploadProgress}
                  >
                    Chọn ảnh...
                  </button>
                  <span className="text-xs text-secondary truncate max-w-[200px]">
                    {selectedFile ? selectedFile.name : "Chưa chọn file"}
                  </span>
                </div>
                <div className="text-[10px] text-secondary/70">
                  Tỷ lệ tối ưu: ~ 16:9 hoặc 21:9 (ví dụ: 1920x800) để hiển thị đẹp nhất.
                </div>
              </div>

              {/* Image URL fallback */}
              <div className="space-y-2">
                <label className="form-label font-semibold text-on-background text-sm">
                  Hoặc nhập URL ảnh
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setSelectedFile(null); // Clear file selection if typing URL
                  }}
                  placeholder="https://example.com/banner.jpg"
                  className="sv-form-input text-sm"
                  disabled={uploadProgress}
                />
              </div>

              {/* Redirect Link */}
              <div className="space-y-2">
                <label className="form-label font-semibold text-on-background text-sm">
                  Đường dẫn liên kết (Link)
                </label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Ví dụ: /shop, /shop?brand=Nike..."
                  className="sv-form-input text-sm"
                  disabled={uploadProgress}
                  required
                />
              </div>

              {/* Alt Text */}
              <div className="space-y-2">
                <label className="form-label font-semibold text-on-background text-sm">
                  Văn bản thay thế (Alt / Mô tả)
                </label>
                <input
                  type="text"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  placeholder="Ví dụ: Giảm giá Nike Air Jordan 2026..."
                  className="sv-form-input text-sm"
                  disabled={uploadProgress}
                  required
                />
              </div>
            </div>

            {/* Preview Banner Image */}
            {imageUrl && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-secondary">
                  Xem trước ảnh:
                </span>
                <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden border border-outline-variant/30 bg-surface-container-low">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-3 border-t border-outline-variant/10">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2.5 rounded-xl border border-outline-variant/30 text-sm font-semibold text-secondary hover:bg-surface-container-low cursor-pointer transition-colors"
                disabled={uploadProgress}
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="btn btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
                disabled={uploadProgress}
              >
                {uploadProgress && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                {uploadProgress ? "Đang lưu..." : "Lưu banner"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Banners Grid list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center text-secondary rounded-3xl border border-outline-variant/15">
            Chưa có banner nào. Hãy thêm banner mới để hiển thị trên trang chủ.
          </div>
        ) : (
          banners.map((banner) => (
            <div
              key={banner.id}
              className="bg-white rounded-3xl border border-outline-variant/15 shadow-sm overflow-hidden flex flex-col group hover:shadow-md smooth-transition"
            >
              {/* Image Preview Container */}
              <div className="aspect-[21/9] w-full bg-surface-container-low overflow-hidden relative border-b border-outline-variant/10">
                <img
                  src={banner.image}
                  alt={banner.alt}
                  className="w-full h-full object-cover group-hover:scale-102 smooth-transition"
                />
                
                {/* Overlay actions on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-all duration-300">
                  <button
                    onClick={() => handleStartEdit(banner)}
                    className="p-3 bg-white hover:bg-primary hover:text-white text-on-surface rounded-full shadow-lg transition-colors cursor-pointer flex items-center justify-center"
                    title="Chỉnh sửa"
                  >
                    <span className="material-symbols-outlined text-xl">edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteBanner(banner.id, banner.alt)}
                    className="p-3 bg-white hover:bg-rose-600 hover:text-white text-rose-600 rounded-full shadow-lg transition-colors cursor-pointer flex items-center justify-center"
                    title="Xóa"
                  >
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>

                {/* Default indicator */}
                {banner.id.startsWith("default-") && (
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-black/60 text-white text-[10px] font-bold rounded-full backdrop-blur-xs">
                    Mặc định
                  </span>
                )}
              </div>

              {/* Content Detail */}
              <div className="p-5 flex-grow flex flex-col justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-on-background text-base truncate">
                    {banner.alt}
                  </h4>
                  <p className="text-xs text-secondary flex items-center gap-1 font-mono">
                    <span className="material-symbols-outlined text-xs">link</span>
                    <span className="truncate">{banner.link}</span>
                  </p>
                </div>
                
                {/* Secondary Action row for mobile/accessible click */}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-outline-variant/5">
                  <span className="text-[10px] text-secondary font-mono truncate">
                    ID: {banner.id}
                  </span>
                  <div className="flex items-center gap-3 md:hidden">
                    <button
                      onClick={() => handleStartEdit(banner)}
                      className="text-primary font-bold hover:underline cursor-pointer"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteBanner(banner.id, banner.alt)}
                      className="text-rose-600 font-bold hover:underline cursor-pointer"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BannersPage;
