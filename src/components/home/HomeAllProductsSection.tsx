import { Link } from "react-router-dom";
import type { Product } from "../../types/product.type";
import HomeProductGrid from "./HomeProductGrid";
import HomeProductsStatus from "./HomeProductsStatus";

interface HomeAllProductsSectionProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  showViewMore: boolean;
}

const HomeAllProductsSection = ({
  products,
  isLoading,
  error,
  showViewMore,
}: HomeAllProductsSectionProps): React.JSX.Element => {
  return (
    <section className="bg-surface-alt py-14">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="section-title text-primary">Tất cả sản phẩm</h2>
            <p className="section-desc">
              Duyệt toàn bộ bộ sưu tập sneaker của chúng tôi với nhiều phong
              cách khác nhau.
            </p>
          </div>
          <Link
            to="/shop"
            className="btn btn-secondary btn-pill shrink-0 self-start sm:self-auto"
          >
            Xem thêm
          </Link>
        </div>

        <HomeProductsStatus
          isLoading={isLoading}
          error={error}
          isEmpty={products.length === 0}
          emptyMessage="Chưa có sản phẩm."
        >
          <HomeProductGrid products={products} showViewMore={showViewMore} />
        </HomeProductsStatus>
      </div>
    </section>
  );
};

export default HomeAllProductsSection;
