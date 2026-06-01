import type { Product } from "../../types/product.type";
import HomeProductGrid from "./HomeProductGrid";
import HomeProductsStatus from "./HomeProductsStatus";

interface HomeAllProductsSectionProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const HomeAllProductsSection = ({
  products,
  isLoading,
  error,
}: HomeAllProductsSectionProps): React.JSX.Element => {
  return (
    <section className="bg-surface-alt py-14">
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
        </HomeProductsStatus>
      </div>
    </section>
  );
};

export default HomeAllProductsSection;
