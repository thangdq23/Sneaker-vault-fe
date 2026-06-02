import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import banner1 from "../../assets/banner-sneaker.png";
import banner2 from "../../assets/banner-sneaker2.png";

const slides = [
  {
    image: banner1,
    link: "/shop",
    alt: "Sneaker Vault Banner 1",
  },
  {
    image: banner2,
    link: "/shop",
    alt: "Sneaker Vault Banner 2",
  },
];

const HomeHero = (): React.JSX.Element => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="mx-auto max-w-container-max px-margin-mobile pt-24 md:px-margin-desktop">
      <div className="group relative overflow-hidden rounded-2xl bg-surface-container shadow-lg md:rounded-3xl h-[180px] sm:h-[320px] md:h-[450px] lg:h-[560px] xl:h-[600px] w-full">
        {slides.map((slide, index) => {
          const isActive = index === current;
          return (
            <Link
              key={index}
              to={slide.link}
              className={`absolute inset-0 block transition-all duration-1000 ease-in-out ${
                isActive
                  ? "opacity-100 translate-x-0 scale-100 z-10"
                  : "opacity-0 translate-x-4 scale-95 z-0 pointer-events-none"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="h-full w-full object-cover transition-transform duration-10000 ease-linear hover:scale-105"
              />
            </Link>
          );
        })}

        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white opacity-0 transition-all hover:bg-black/50 group-hover:opacity-100 focus:outline-hidden md:h-12 md:w-12 cursor-pointer"
          aria-label="Slide trước"
        >
          <span className="material-symbols-outlined text-[24px]">chevron_left</span>
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white opacity-0 transition-all hover:bg-black/50 group-hover:opacity-100 focus:outline-hidden md:h-12 md:w-12 cursor-pointer"
          aria-label="Slide sau"
        >
          <span className="material-symbols-outlined text-[24px]">chevron_right</span>
        </button>

        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrent(index);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === current ? "w-6 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-blue-100/40 bg-linear-to-r from-blue-50/20 via-white/60 to-indigo-50/20 p-4 sm:p-5 shadow-xs">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 border border-slate-100/80 shadow-xs transition hover:shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50/60">
              <svg className="h-5.5 w-5.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Chính hãng 100%</h3>
              <p className="text-xs text-slate-500 mt-0.5">Sản phẩm chuẩn hãng</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 border border-slate-100/80 shadow-xs transition hover:shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50/60">
              <svg className="h-5.5 w-5.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Đổi hàng dễ dàng</h3>
              <p className="text-xs text-slate-500 mt-0.5">Hỗ trợ đổi mẫu đổi size</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 border border-slate-100/80 shadow-xs transition hover:shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50/60">
              <svg className="h-5.5 w-5.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.969 0 1.371 1.24.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.18 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 10.3c-.783-.57-.38-1.81.588-1.81h4.906a1 1 0 00.95-.69l1.519-4.674z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Uy tín hàng đầu</h3>
              <p className="text-xs text-slate-500 mt-0.5">Khách hàng tin chọn</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 border border-slate-100/80 shadow-xs transition hover:shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50/60">
              <svg className="h-5.5 w-5.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v6m-3-3h6" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Bảo hành 12 tháng</h3>
              <p className="text-xs text-slate-500 mt-0.5">An tâm sau mua</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
