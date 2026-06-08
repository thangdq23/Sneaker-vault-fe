import React, { useState, useEffect, useCallback } from "react";
import { useToast } from "../../contexts/ToastContext";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../services/productApi";
import type { Product } from "../../types/product.type";
import ProductFilterBar from "../../components/admin/ProductFilterBar";
import ProductListTable from "../../components/admin/ProductListTable";
import ProductModal from "../../components/admin/ProductModal";
import Pagination from "../../components/common/Pagination";

const ProductsPage = (): React.JSX.Element => {
  const { showToast } = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortValue, setSortValue] = useState("createdAt-desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); 
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const [sort, order] = sortValue.split("-");

      const response = await getProducts({
        search: debouncedSearch || undefined,
        sort,
        order,
        page,
        limit,
      });

      setProducts(response.products);
      setTotalPages(response.totalPages || 1);
    } catch (error: any) {
      showToast(error.message || "Lấy danh sách sản phẩm thất bại.", "error");
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, sortValue, page, showToast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await deleteProduct(id);
        showToast("Xóa sản phẩm thành công!", "success");
        if (products.length === 1 && page > 1) {
          setPage((prev) => prev - 1);
        } else {
          fetchProducts();
        }
      } catch (error: any) {
        showToast(error.response?.data?.message || "Không thể xóa sản phẩm.", "error");
      }
    }
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSave = async (productData: Partial<Product>) => {
    if (editingProduct) {
      const id = editingProduct._id || editingProduct.id;
      if (id) {
        await updateProduct(id, productData);
        showToast("Cập nhật thông tin sản phẩm thành công!", "success");
      }
    } else {
      await createProduct(productData);
      showToast("Thêm sản phẩm mới thành công!", "success");
    }
    fetchProducts();
  };

  return (
    <div className="space-y-6 animate-fade-in-up font-body">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-on-background">Quản lý sản phẩm</h1>
          <p className="text-sm text-secondary">Xem, thêm mới, sửa đổi thông tin các mẫu giày trong cửa hàng.</p>
        </div>
        <button
          onClick={handleAddClick}
          className="btn btn-primary self-start sm:self-auto flex items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">add</span>
          Thêm sản phẩm
        </button>
      </div>

      <ProductFilterBar
        search={search}
        onSearchChange={setSearch}
        sortValue={sortValue}
        onSortChange={(sortVal) => {
          setSortValue(sortVal);
          setPage(1); // Reset page
        }}
      />

      {/* Main Table grid */}
      <ProductListTable
        products={products}
        isLoading={isLoading}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />

      {!isLoading && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={editingProduct}
        onSave={handleSave}
      />
    </div>
  );
};

export default ProductsPage;
