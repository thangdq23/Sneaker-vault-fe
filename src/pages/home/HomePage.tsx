import HomeAllProductsSection from "../../components/home/HomeAllProductsSection";
import HomeHero from "../../components/home/HomeHero";
import HomeNewArrivalsSection from "../../components/home/HomeNewArrivalsSection";
import HomeSaleSection from "../../components/home/HomeSaleSection";
import { useHomeProducts } from "../../hooks/useHomeProducts";

const HomePage = (): React.JSX.Element => {
  const {
    isLoading,
    error,
    saleProducts,
    newProducts,
    allProductsPreview,
    hasMoreNewProducts,
    hasMoreAllProducts,
    totalProducts,
  } = useHomeProducts();

  return (
    <main>
      <HomeHero />
      <HomeSaleSection
        products={saleProducts}
        isLoading={isLoading}
        error={error}
      />
      <HomeNewArrivalsSection
        products={newProducts}
        isLoading={isLoading}
        error={error}
        showViewMore={hasMoreNewProducts}
      />
      <HomeAllProductsSection
        products={allProductsPreview}
        isLoading={isLoading}
        error={error}
        showViewMore={hasMoreAllProducts && totalProducts > 0}
      />
    </main>
  );
};

export default HomePage;
