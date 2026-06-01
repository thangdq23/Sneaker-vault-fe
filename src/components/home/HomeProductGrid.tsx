import { Link } from "react-router-dom";
import ProductCard from "../product/ProductCard";
import type { Product } from "../../types/product.type";

interface HomeProductGridProps {
  products: Product[];
  viewAllPath?: string;
}

const getProductKey = (product: Product): string =>
  product._id ?? product.id ?? product.name;

const HomeProductGrid = ({
  products,
  viewAllPath = "/shop",
}: HomeProductGridProps): React.JSX.Element => {
  return (
    <>
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
      {products.length > 0 && (
        <div className="mt-10 flex justify-center">
          <Link to={viewAllPath} className="btn btn-secondary btn-pill px-8">
            Xem tất cả
          </Link>
        </div>
      )}
    </>
  );
};

export default HomeProductGrid;
