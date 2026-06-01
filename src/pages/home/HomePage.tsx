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
      />
      <HomeAllProductsSection
        products={allProductsPreview}
        isLoading={isLoading}
        error={error}
      />
    </main>
  );
};

export default HomePage;
