import SaleProductSlider from "../product/SaleProductSlider";
import type { Product } from "../../types/product.type";
import HomeProductsStatus from "./HomeProductsStatus";

interface HomeSaleSectionProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const HomeSaleSection = ({
  products,
  isLoading,
  error,
}: HomeSaleSectionProps): React.JSX.Element => {
  return (
    <section className="bg-surface-alt pb-20">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="mb-8">
          <h2 className="section-title text-primary">Ưu đãi nổi bật</h2>
          <p className="section-desc">
            Tổng hợp các mẫu giảm giá tốt nhất, giá sốc cho mùa này.
          </p>
        </div>

        <HomeProductsStatus
          isLoading={isLoading}
          error={error}
          isEmpty={products.length === 0}
          emptyMessage="Chưa có sản phẩm giảm giá."
        >
          <SaleProductSlider products={products} />
        </HomeProductsStatus>
      </div>
    </section>
  );
};

export default HomeSaleSection;
