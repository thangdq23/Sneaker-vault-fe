import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/productApi";
import type { Product } from "../../types/product.type";
import HomeProductGrid from "./HomeProductGrid";
import HomeProductsStatus from "./HomeProductsStatus";
import Pagination from "../common/Pagination";

const HomeAllProductsSection = (): React.JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllProducts = async (currentPage: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getProducts({
        page: currentPage,
        limit: 10,
      });
      setProducts(res.products);
      setTotalPages(res.totalPages);
    } catch (err: any) {
      setError(err.message || "Không thể tải sản phẩm.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchAllProducts(page);
  }, [page]);

  return (
    <section className="bg-surface-alt py-14" id="all-products-section">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="mb-8">
          <h2 className="section-title text-primary">Tất cả sản phẩm</h2>
          <p className="section-desc">
            Duyệt toàn bộ bộ sưu tập sneaker của chúng tôi với nhiều phong
            cách khác nhau.
          </p>
        </div>

        <HomeProductsStatus
          isLoading={isLoading}
          error={error}
          isEmpty={products.length === 0}
          emptyMessage="Chưa có sản phẩm."
        >
          <HomeProductGrid products={products} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => {
              setPage(p);
              const element = document.getElementById("all-products-section");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            disabled={isLoading}
          />
        </HomeProductsStatus>
      </div>
    </section>
  );
};

export default HomeAllProductsSection;
