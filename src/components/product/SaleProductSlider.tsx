import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCard from "./ProductCard";
import type { Product } from "../../types/product.type";
import "swiper/css";
import "swiper/css/navigation";

interface SaleProductSliderProps {
  products: Product[];
}

const SaleProductSlider = ({
  products,
}: SaleProductSliderProps): React.JSX.Element => {
  return (
    <div className="relative overflow-hidden">
      <Swiper
        modules={[Navigation]}
        navigation
        watchOverflow
        spaceBetween={24}
        slidesPerView={1.1}
        breakpoints={{
          640: {
            slidesPerView: 2.05,
          },
          768: {
            slidesPerView: 3.05,
          },
          1024: {
            slidesPerView: 4.05,
          },
          1280: {
            slidesPerView: 4.8,
          },
        }}
        className="pb-6"
      >
        {products.map((product) => (
          <SwiperSlide
            key={product._id ?? product.id ?? product.name}
            className="h-auto"
          >
            <div className="h-full">
              <ProductCard product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SaleProductSlider;
