import React from "react";

const ProductsPage = (): React.JSX.Element => {
  const products = [
    { id: 1, name: "Nike Air Force 1 '07", code: "NK-AF1-07", price: "2,900,000 ₫", stock: 42, category: "Nike", rating: 4.8 },
    { id: 2, name: "Adidas Ultraboost Light", code: "AD-UBL-23", price: "4,500,000 ₫", stock: 15, category: "Adidas", rating: 4.9 },
    { id: 3, name: "Jordan 1 Retro High OG", code: "JD-J1-RETRO", price: "5,200,000 ₫", stock: 8, category: "Jordan", rating: 4.7 },
    { id: 4, name: "New Balance 550 White Blue", code: "NB-550-WBL", price: "3,100,000 ₫", stock: 24, category: "New Balance", rating: 4.6 },
    { id: 5, name: "Puma Suede Classic Plus", code: "PM-SUE-CL", price: "1,950,000 ₫", stock: 30, category: "Puma", rating: 4.5 },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-on-background">Quản lý sản phẩm</h1>
          <p className="text-sm text-secondary">Xem, thêm mới, sửa đổi thông tin các mẫu giày trong cửa hàng.</p>
        </div>
        <button className="btn btn-primary self-start sm:self-auto flex items-center gap-2 cursor-pointer">
          <span className="material-symbols-outlined text-base">add</span>
          Thêm sản phẩm
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-full w-full md:w-96 border border-outline-variant/30">
          <span className="material-symbols-outlined text-outline">search</span>
          <input
            className="bg-transparent border-none focus:ring-0 text-body-sm w-full placeholder-on-surface-variant/50 ml-2"
            placeholder="Tìm kiếm theo tên hoặc mã sản phẩm..."
            type="text"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select className="bg-surface-container-low text-sm rounded-xl px-4 py-2 border border-outline-variant/30 text-on-surface focus:outline-none cursor-pointer">
            <option>Tất cả danh mục</option>
            <option>Nike</option>
            <option>Adidas</option>
            <option>Jordan</option>
            <option>New Balance</option>
          </select>
          <select className="bg-surface-container-low text-sm rounded-xl px-4 py-2 border border-outline-variant/30 text-on-surface focus:outline-none cursor-pointer">
            <option>Trạng thái kho</option>
            <option>Còn hàng</option>
            <option>Sắp hết hàng (&lt; 10)</option>
            <option>Hết hàng</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-xs font-semibold text-secondary uppercase bg-surface-container-low/50">
                <th className="py-3.5 px-6">Tên sản phẩm</th>
                <th className="py-3.5 px-6">Mã SKU</th>
                <th className="py-3.5 px-6">Thương hiệu</th>
                <th className="py-3.5 px-6">Đơn giá</th>
                <th className="py-3.5 px-6">Tồn kho</th>
                <th className="py-3.5 px-6 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-sm">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-surface-container-low/20 transition-colors">
                  <td className="py-4 px-6 font-medium text-on-background">{product.name}</td>
                  <td className="py-4 px-6 font-mono text-secondary">{product.code}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-container-high text-on-surface-variant">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-medium text-on-background price-vnd">{product.price}</td>
                  <td className="py-4 px-6 font-medium">
                    <span className={product.stock <= 10 ? "text-amber-600" : "text-emerald-600"}>
                      {product.stock} đôi
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 hover:bg-surface-container-low rounded-lg text-secondary hover:text-primary transition-colors cursor-pointer" title="Chỉnh sửa">
                        <span className="material-symbols-outlined text-base">edit</span>
                      </button>
                      <button className="p-1.5 hover:bg-rose-50 rounded-lg text-secondary hover:text-rose-600 transition-colors cursor-pointer" title="Xóa">
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
