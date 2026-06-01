import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/productApi";
import type { Product } from "../../types/product.type";
import HomeProductGrid from "./HomeProductGrid";
import HomeProductsStatus from "./HomeProductsStatus";
import Pagination from "../common/Pagination";

const HomeNewArrivalsSection = (): React.JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNewArrivals = async (currentPage: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getProducts({
        isNewProduct: true,
        sort: "createdAt",
        order: "desc",
        page: currentPage,
        limit: 10,
      });
      setProducts(res.products);
      setTotalPages(res.totalPages);
    } catch (err: any) {
      setError(err.message || "Không thể tải sản phẩm mới.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchNewArrivals(page);
  }, [page]);

  return (
    <section className="bg-background py-14" id="new-arrivals-section">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="mb-8">
          <h2 className="section-title text-primary">Hàng mới về</h2>
          <p className="section-desc">
            Khám phá những mẫu sneaker vừa mới ra mắt, sẵn sàng cho mọi phong
            cách.
          </p>
        </div>

        <HomeProductsStatus
          isLoading={isLoading}
          error={error}
          isEmpty={products.length === 0}
          emptyMessage="Chưa có sản phẩm mới."
        >
          <HomeProductGrid products={products} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => {
              setPage(p);
              const element = document.getElementById("new-arrivals-section");
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

export default HomeNewArrivalsSection;
