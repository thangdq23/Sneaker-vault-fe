import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/common/Pagination";
import ProductCard from "../../components/product/ProductCard";
import { getProducts } from "../../services/productApi";
import type { Product } from "../../types/product.type";
import { formatVnd } from "../../utils/formatCurrency";

const ShopPage = (): React.JSX.Element => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState(() => searchParams.get("search") || "");
  const [brand, setBrand] = useState<string>(() => searchParams.get("brand") || "");
  const [maxPrice, setMaxPrice] = useState<number>(10000000);
  const [sort, setSort] = useState(() => searchParams.get("sort") || "createdAt");
  const [order, setOrder] = useState<"asc" | "desc">(() => (searchParams.get("order") as "asc" | "desc") || "desc");
  const [isSaleOnly, setIsSaleOnly] = useState(() => searchParams.get("sale") === "true");
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setBrand(searchParams.get("brand") || "");
    setSort(searchParams.get("sort") || "createdAt");
    setOrder((searchParams.get("order") as "asc" | "desc") || "desc");
    setIsSaleOnly(searchParams.get("sale") === "true");
  }, [searchParams]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchFilteredProducts = async (
    currentPage: number,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getProducts({
        search: search.trim() || undefined,
        brand: brand || undefined,
        maxPrice: maxPrice || undefined,
        isSale: isSaleOnly ? true : undefined,
        "sizes.size": selectedSizes.length > 0 ? selectedSizes : undefined,
        sort,
        order,
        page: currentPage,
        limit: 12,
      });

      setProducts(res.products);
      setTotalPages(res.totalPages);
      setTotalProducts(res.total);
    } catch (err: any) {
      setError(err.message || "Không thể tải sản phẩm.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [
    search,
    brand,
    maxPrice,
    isSaleOnly,
    selectedSizes.join(","),
    sort,
    order,
  ]);

  useEffect(() => {
    void fetchFilteredProducts(page);
  }, [
    page,
    search,
    brand,
    maxPrice,
    isSaleOnly,
    selectedSizes.join(","),
    sort,
    order,
  ]);

  const handleSortChange = (value: string) => {
    if (value === "priceAsc") {
      setSort("price");
      setOrder("asc");
    } else if (value === "priceDesc") {
      setSort("price");
      setOrder("desc");
    } else {
      setSort("createdAt");
      setOrder("desc");
    }
  };

  return (
    <main className="mx-auto max-w-container-max px-margin-mobile pb-16 pt-28 md:px-margin-desktop">
      <div className="flex flex-col gap-gutter lg:flex-row">
        <aside className="w-full shrink-0 space-y-8 lg:w-72">
          <section>
            <h3 className="mb-3 text-sm font-bold text-on-surface">Tìm kiếm</h3>
            <div className="relative">
              <input
                aria-label="Tìm kiếm sản phẩm"
                className="form-input pr-10 bg-surface-container"
                placeholder="Tìm mẫu giày..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <span className="material-symbols-outlined text-gray-400">
                  search
                </span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-bold text-on-surface">
              Khuyến mãi
            </h3>
            <label className="group flex cursor-pointer items-center gap-3">
              <input
                className="rounded border-outline text-primary focus:ring-0 cursor-pointer h-4 w-4"
                type="checkbox"
                checked={isSaleOnly}
                onChange={(e) => setIsSaleOnly(e.target.checked)}
              />
              <span
                className={`text-sm leading-relaxed group-hover:text-primary ${isSaleOnly ? "font-semibold text-primary" : ""}`}
              >
                xem sản phẩm đang giảm giá
              </span>
            </label>
          </section>



          <section>
            <h3 className="mb-3 text-sm font-bold text-on-surface">
              Thương hiệu
            </h3>
            <div className="space-y-2.5">
              {[
                { label: "Tất cả thương hiệu", value: "" },
                { label: "Nike", value: "Nike" },
                { label: "Adidas", value: "Adidas" },
                { label: "Puma", value: "Puma" },
                { label: "Asics", value: "Asics" },
              ].map((item) => (
                <label
                  key={item.label}
                  className="group flex cursor-pointer items-center gap-3"
                >
                  <input
                    className="rounded-full border-outline text-primary focus:ring-0 cursor-pointer h-4 w-4"
                    type="radio"
                    name="brand"
                    checked={brand === item.value}
                    onChange={() => setBrand(item.value)}
                  />
                  <span
                    className={`text-sm leading-relaxed group-hover:text-primary ${brand === item.value ? "font-semibold text-primary" : ""}`}
                  >
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-bold text-on-surface">
              Khoảng giá tối đa
            </h3>
            <input
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-300 accent-gray-600"
              type="range"
              min="500000"
              max="15000000"
              step="50000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <div className="mt-3 flex justify-between text-xs text-on-surface-variant sm:text-sm">
              <span>500.000 ₫</span>
              <span className="font-semibold text-primary">
                {formatVnd(maxPrice)}
              </span>
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-bold text-on-surface">Kích cỡ (Size)</h3>
            <div className="max-h-32 overflow-y-auto pr-1 border border-outline-variant/20 rounded-xl p-2 bg-surface-container/20">
              <div className="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSizes([])}
                  className={`rounded-lg border py-2 text-xs font-semibold smooth-transition cursor-pointer ${
                    selectedSizes.length === 0
                      ? "border-primary bg-primary text-on-primary"
                      : "border-outline-variant bg-surface text-on-surface hover:border-primary"
                  }`}
                >
                  Tất cả
                </button>
                {Array.from({ length: 11 }, (_, i) => 35 + i).map((size) => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() =>
                        setSelectedSizes((prev) =>
                          prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
                        )
                      }
                      className={`rounded-lg border py-2 text-xs font-semibold smooth-transition cursor-pointer ${
                        isSelected
                          ? "border-primary bg-primary text-on-primary"
                          : "border-outline-variant bg-surface text-on-surface hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        </aside>

        <div className="min-w-0 grow">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="section-title text-primary">Cửa hàng sneaker</h1>
              <p className="section-desc">
                Tìm kiếm và lựa chọn sneaker mới nhất với nhiều lựa chọn phong
                cách.
              </p>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6">
              <p className="text-sm text-on-surface-variant whitespace-nowrap">
                {totalProducts} sản phẩm
              </p>
              <select
                aria-label="Sắp xếp sản phẩm"
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-1.5 text-sm font-semibold focus:outline-none cursor-pointer"
              >
                <option value="newest">Mới nhất</option>
                <option value="priceAsc">Giá: Thấp đến Cao</option>
                <option value="priceDesc">Giá: Cao đến Thấp</option>
              </select>
            </div>
          </div>

          {isLoading && products.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center text-on-surface-variant shadow-sm border border-outline-variant/10">
              Đang tải sản phẩm...
            </div>
          ) : error ? (
            <div className="rounded-3xl bg-rose-50 p-8 text-center text-rose-700">
              {error}
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center text-on-surface-variant shadow-sm border border-outline-variant/10">
              Không tìm thấy sản phẩm nào khớp với bộ lọc của bạn.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-gutter lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product._id ?? product.id ?? product.name}
                  product={product}
                />
              ))}
            </div>
          )}

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => {
              setPage(p);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={isLoading}
          />
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
