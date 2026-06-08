import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../contexts/ToastContext";
import { createProduct } from "../../services/productApi";
import type { Product } from "../../types/product.type";
import ProductForm from "../../components/admin/ProductForm";

const CreateProductPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSave = async (productData: Partial<Product>) => {
    try {
      await createProduct(productData);
      showToast("Thêm sản phẩm mới thành công!", "success");
      navigate("/admin/products");
    } catch (err: any) {
      showToast(
        err.response?.data?.message || err.message || "Không thể thêm sản phẩm.",
        "error"
      );
    }
  };

  const handleCancel = () => {
    navigate("/admin/products");
  };

  return (
    <div className="space-y-6 animate-fade-in-up font-body">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs text-secondary/70">
          <button
            onClick={() => navigate("/admin")}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Tổng quan
          </button>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <button
            onClick={() => navigate("/admin/products")}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Sản phẩm
          </button>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <span className="text-secondary">Thêm mới</span>
        </div>

        <div className="flex items-center gap-3 mt-1">
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-surface-container-low rounded-xl text-secondary hover:text-primary transition-all cursor-pointer flex items-center justify-center border border-outline-variant/30 bg-white"
            title="Quay lại"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
          </button>
          <div>
            <h1 className="font-display text-2xl font-bold text-on-background">Thêm sản phẩm mới</h1>
            <p className="text-sm text-secondary">Tạo một mẫu giày mới để hiển thị bán trên website.</p>
          </div>
        </div>
      </div>

      <ProductForm product={null} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
};

export default CreateProductPage;
