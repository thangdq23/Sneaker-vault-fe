import { Link } from "react-router-dom";
import ProductCard from "../product/ProductCard";
import type { Product } from "../../types/product.type";

interface HomeProductGridProps {
  products: Product[];
  showViewMore?: boolean;
}

const getProductKey = (product: Product): string =>
  product._id ?? product.id ?? product.name;

const HomeProductGrid = ({
  products,
  showViewMore = false,
}: HomeProductGridProps): React.JSX.Element => {
  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={getProductKey(product)} product={product} />
        ))}
      </div>
      {showViewMore ? (
        <div className="mt-8 flex justify-center">
          <Link to="/shop" className="btn btn-primary btn-pill">
            Xem thêm
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default HomeProductGrid;
