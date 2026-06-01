import { Link } from "react-router-dom";
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
        <div className="mb-8 pt-8">
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
          {products.length > 0 && (
            <div className="mt-8 flex justify-center">
              <Link
                to="/shop?sale=true"
                className="btn btn-secondary btn-pill px-8"
              >
                Xem tất cả
              </Link>
            </div>
          )}
        </HomeProductsStatus>
      </div>
    </section>
  );
};

export default HomeSaleSection;
