import React from "react";
import type { Product } from "../../types/product.type";

interface ProductListTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onShowSizes: (product: Product) => void;
}

const ProductListTable = ({
  products,
  isLoading,
  onEdit,
  onDelete,
  onShowSizes,
}: ProductListTableProps): React.JSX.Element => {
  const formatPrice = (value: number) => {
    return value.toLocaleString("vi-VN") + " ₫";
  };

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-100 flex items-center gap-1 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          Hết hàng
        </span>
      );
    }
    if (stock <= 10) {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-1 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          Sắp hết
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1 w-fit">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        Còn hàng
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-xs font-semibold text-secondary uppercase bg-surface-container-low/50">
                <th className="py-4 px-6">Sản phẩm</th>
                <th className="py-4 px-6">SKU</th>
                <th className="py-4 px-6">Đơn giá</th>
                <th className="py-4 px-6">Tồn kho</th>
                <th className="py-4 px-6 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <div className="w-12 h-12 bg-zinc-200 rounded-lg"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-zinc-200 rounded w-40"></div>
                      <div className="h-3 bg-zinc-200 rounded w-20"></div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4 bg-zinc-200 rounded w-24"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4 bg-zinc-200 rounded w-20"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-6 bg-zinc-200 rounded-full w-24"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center gap-2">
                      <div className="w-8 h-8 bg-zinc-200 rounded-lg"></div>
                      <div className="w-8 h-8 bg-zinc-200 rounded-lg"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-outline-variant/20 shadow-sm p-12 text-center flex flex-col items-center justify-center">
        <span className="material-symbols-outlined text-zinc-300 text-6xl mb-4">inventory_2</span>
        <h3 className="font-display text-lg font-bold text-on-background mb-1">Không tìm thấy sản phẩm</h3>
        <p className="text-secondary text-sm max-w-sm">
          Thử thay đổi bộ lọc tìm kiếm hoặc thêm sản phẩm mới vào hệ thống của bạn.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/30 text-xs font-semibold text-secondary uppercase bg-surface-container-low/50">
              <th className="py-4 px-6">Sản phẩm</th>
              <th className="py-4 px-6">SKU</th>
              <th className="py-4 px-6">Đơn giá</th>
              <th className="py-4 px-6">Tồn kho</th>
              <th className="py-4 px-6 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20 text-sm">
            {products.map((product) => {
              const productId = product._id || product.id || "";
              const productImage =
                product.images && product.images.length > 0
                  ? product.images[0]
                  : "https://placehold.co/100x100?text=No+Image";

              return (
                <tr key={productId} className="hover:bg-surface-container-low/20 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={productImage}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover border border-outline-variant/20 bg-surface-container-low"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/100x100?text=No+Image";
                        }}
                      />
                      <div>
                        <p className="font-semibold text-on-background leading-snug line-clamp-1">
                          {product.name}
                        </p>
                        <p className="text-xs text-secondary mt-0.5">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono text-secondary text-xs uppercase font-medium">
                    {product.sku || "N/A"}
                  </td>
                  <td className="py-4 px-6 font-body">
                    {product.isSale && product.salePrice ? (
                      <div className="flex flex-col">
                        <span className="font-semibold text-tertiary">
                          {formatPrice(product.salePrice)}
                        </span>
                        <span className="text-xs text-secondary line-through">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    ) : (
                      <span className="font-semibold text-on-background">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {getStockBadge(product.stock)}
                      <button
                        onClick={() => onShowSizes(product)}
                        className="p-1 hover:bg-surface-container-high rounded-lg text-secondary hover:text-primary transition-all cursor-pointer flex items-center"
                        title="Xem chi tiết size"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">info</span>
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="p-2 hover:bg-surface-container-low rounded-xl text-secondary hover:text-primary transition-all cursor-pointer"
                        title="Chỉnh sửa"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-base">edit</span>
                      </button>
                      <button
                        onClick={() => onDelete(productId)}
                        className="p-2 hover:bg-rose-50 rounded-xl text-secondary hover:text-rose-600 transition-all cursor-pointer"
                        title="Xóa"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListTable;
