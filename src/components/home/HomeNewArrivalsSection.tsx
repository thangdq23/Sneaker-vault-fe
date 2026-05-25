import type { Product } from "../../types/product.type";
import HomeProductGrid from "./HomeProductGrid";
import HomeProductsStatus from "./HomeProductsStatus";

interface HomeNewArrivalsSectionProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  showViewMore: boolean;
}

const HomeNewArrivalsSection = ({
  products,
  isLoading,
  error,
  showViewMore,
}: HomeNewArrivalsSectionProps): React.JSX.Element => {
  return (
    <section className="bg-background py-14">
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
          <HomeProductGrid products={products} showViewMore={showViewMore} />
        </HomeProductsStatus>
      </div>
    </section>
  );
};

export default HomeNewArrivalsSection;
