import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../contexts/ToastContext";
import { getProductById, updateProduct } from "../../services/productApi";
import type { Product } from "../../types/product.type";
import ProductForm from "../../components/admin/ProductForm";

const EditProductPage = (): React.JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err: any) {
        showToast(
          err.response?.data?.message || err.message || "Không thể tải thông tin sản phẩm.",
          "error"
        );
        navigate("/admin/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate, showToast]);

  const handleSave = async (productData: Partial<Product>) => {
    if (!id) return;
    try {
      await updateProduct(id, productData);
      showToast("Cập nhật thông tin sản phẩm thành công!", "success");
      navigate("/admin/products");
    } catch (err: any) {
      showToast(
        err.response?.data?.message || err.message || "Không thể cập nhật sản phẩm.",
        "error"
      );
    }
  };

  const handleCancel = () => {
    navigate("/admin/products");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
        <p className="text-secondary text-sm font-semibold">Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

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
          <span className="text-secondary">Chỉnh sửa</span>
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
            <h1 className="font-display text-2xl font-bold text-on-background">Chỉnh sửa sản phẩm</h1>
            <p className="text-sm text-secondary">
              Thay đổi thông tin, giá bán, tồn kho hoặc hình ảnh của sản phẩm {product?.name ? `"${product.name}"` : ""}.
            </p>
          </div>
        </div>
      </div>

      <ProductForm product={product} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
};

export default EditProductPage;
