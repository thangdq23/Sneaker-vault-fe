import ProductCard from "../product/ProductCard";
import type { Product } from "../../types/product.type";

interface HomeProductGridProps {
  products: Product[];
}

const getProductKey = (product: Product): string =>
  product._id ?? product.id ?? product.name;

const HomeProductGrid = ({
  products,
}: HomeProductGridProps): React.JSX.Element => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
      {products.slice(0, 10).map((product, idx) => {
        let visibilityClass = "block";
        if (idx >= 4 && idx < 6) {
          visibilityClass = "hidden sm:block";
        } else if (idx >= 6 && idx < 10) {
          visibilityClass = "hidden lg:block";
        } else if (idx >= 10) {
          visibilityClass = "hidden";
        }

        return (
          <div key={getProductKey(product)} className={visibilityClass}>
            <ProductCard product={product} />
          </div>
        );
      })}
    </div>
  );
};

export default HomeProductGrid;
