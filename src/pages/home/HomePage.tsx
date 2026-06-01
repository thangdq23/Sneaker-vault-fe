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
  } = useHomeProducts();

  return (
    <main>
      <HomeHero />
      <HomeSaleSection
        products={saleProducts}
        isLoading={isLoading}
        error={error}
      />
      <HomeNewArrivalsSection />
      <HomeAllProductsSection />
    </main>
  );
};

export default HomePage;
