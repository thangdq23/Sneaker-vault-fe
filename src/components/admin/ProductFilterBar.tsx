import { getBrands } from "../../utils/brandHelper";

interface ProductFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  brand: string;
  onBrandChange: (value: string) => void;
  stockStatus: string;
  onStockStatusChange: (value: string) => void;
  sortValue: string;
  onSortChange: (value: string) => void;
}

const ProductFilterBar = ({
  search,
  onSearchChange,
  brand,
  onBrandChange,
  stockStatus,
  onStockStatusChange,
  sortValue,
  onSortChange,
}: ProductFilterBarProps): React.JSX.Element => {
  const brands = getBrands();
  return (
    <div className="bg-white p-4 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Search Input */}
      <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-full w-full md:w-96 border border-outline-variant/30 transition-all focus-within:border-primary/50">
        <span className="material-symbols-outlined text-secondary text-base">search</span>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder-secondary/50 ml-2 focus:outline-none"
          placeholder="Tìm kiếm sản phẩm theo tên hoặc SKU..."
          type="text"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="text-secondary hover:text-primary transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        )}
      </div>

      {/* Select Filters */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto font-body">
        {/* Brand Dropdown Filter */}
        <select
          value={brand}
          onChange={(e) => onBrandChange(e.target.value)}
          className="bg-surface-container-low text-sm rounded-xl px-4 py-2.5 border border-outline-variant/30 text-on-surface focus:outline-none cursor-pointer focus:ring-1 focus:ring-primary/30"
        >
          <option value="">Tất cả thương hiệu</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        {/* Stock Status Dropdown Filter */}
        <select
          value={stockStatus}
          onChange={(e) => onStockStatusChange(e.target.value)}
          className="bg-surface-container-low text-sm rounded-xl px-4 py-2.5 border border-outline-variant/30 text-on-surface focus:outline-none cursor-pointer focus:ring-1 focus:ring-primary/30"
        >
          <option value="">Tất cả trạng thái kho</option>
          <option value="inStock">Còn hàng</option>
          <option value="lowStock">Sắp hết</option>
          <option value="outOfStock">Hết hàng</option>
        </select>

        {/* Sort Dropdown Filter */}
        <select
          value={sortValue}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-surface-container-low text-sm rounded-xl px-4 py-2.5 border border-outline-variant/30 text-on-surface focus:outline-none cursor-pointer focus:ring-1 focus:ring-primary/30"
        >
          <option value="createdAt-desc">Mới nhất</option>
          <option value="price-asc">Giá: Thấp đến Cao</option>
          <option value="price-desc">Giá: Cao đến Thấp</option>
          <option value="name-asc">Tên: A đến Z</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilterBar;
