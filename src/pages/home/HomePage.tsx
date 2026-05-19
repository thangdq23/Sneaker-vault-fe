import { useEffect, useRef, useState, type PointerEvent } from "react";

const saleProducts = [
  {
    title: "Air Jordan 1 Retro",
    price: "$190.00",
    badge: "Limited",
    badgeColor: "bg-primary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCWCtB-43CVyHePc8WJJOBzM1nqILFYYHlVxRgAsXSKKMOK-nAE2yYliFyYbq86zx7w7oerzUc9HpBFfDvR1IkaSer94vALUshGy9Q-exJ7-lXv4Dh0j2eANvlvrCYlyb07SAASmjXJSJVEQxxVpRIlrovZWzK8AkXSnGd3gbrosPMJf7IyRv5of4Ng8u7B7xIxiVI-If7ylqRj7MKSPZHsOoeTcrZj2WnRZIecqCKwBi5dTM0QVyWYtPnLGYBI9pcNNG2UZTT7huYu",
  },
  {
    title: "Nike Dunk High SE",
    price: "$160.00",
    badge: "New Arrival",
    badgeColor: "bg-tertiary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuALRuCzVScNqCVfPwDW2zcmrF2CkCZzuKCrEpIFoscb6oDDlKa8NzxyaW9hgt_MZDWj1HSECiAUobaMW-7Ty7OYpUJ0fIoA0nICErJsA54MNhtOmqFrBn9UawB1WfC1vt3yzzDyPoRa9hF2Nagr-0H44-JxDZcJ7W8Gypkm8BFn5Nl2U9K5ubUKLPACuvE1OxEAi53AEx2VrtsxrsCSiS35iJ-VfG2VrOqi-iKBgCQmyoythHw3qqv4tVZcViJ9Q-R6oCqI2-dIikAO",
  },
  {
    title: "Adidas Yeezy Boost",
    price: "$220.00",
    badge: "",
    badgeColor: "",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAil9vIeOYaE2K5eYWB211L2T-eQZmXoMN2S00Hsd14sNCLNuhDbRLN6MYcCsV31ImLdAZfBzC-4bd8EoBgKlvu7UH9JKMJbG5Q6aAfhpJUkNbpVrp9eqM4eggd4ukRjjVeDZ1Qf63n-Lmt6xSKQvWkxgMxfEHMAdvWaD-QBVyIIQJCZuL0V-uBqtsiYxwttrCN-UrFWK1DLm9Zbb4ykJDBkh3wD3tMckR-ghAuxNs1o8n9Kb5ITblwzVS14mmA2PhLjE2NyKTIwAz2",
  },
  {
    title: "Nike ZoomX Vaporfly",
    price: "$250.00",
    badge: "In Stock",
    badgeColor: "bg-[#22c55e]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC0Yh-elP3DdFg6PM8JbUy531zBpKwqzUKCxq789PHMZVRj728fPRNGD6_Gq-F9ecmb87U_yh6eUHImkAjMKEx4LKgj1BBKGwgIy38GQvNcmJMN1fIY8O_Qm4QCdrl9vDXwvI1ec7cBtwFFakrtVnHtogD9kAoN6Yx9Papd3SXRibaktuv6cS9KMNqkQ7xR_MEtig9g41XigtgpvxQTxKCpfFqFQVRlRhGftlfzF0CvhO1ZUVkH9phP8nHUm25mr-oJ9XArGp3sfXw3",
  },
  {
    title: "Adidas Yeezy Boost",
    price: "$220.00",
    badge: "",
    badgeColor: "",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAil9vIeOYaE2K5eYWB211L2T-eQZmXoMN2S00Hsd14sNCLNuhDbRLN6MYcCsV31ImLdAZfBzC-4bd8EoBgKlvu7UH9JKMJbG5Q6aAfhpJUkNbpVrp9eqM4eggd4ukRjjVeDZ1Qf63n-Lmt6xSKQvWkxgMxfEHMAdvWaD-QBVyIIQJCZuL0V-uBqtsiYxwttrCN-UrFWK1DLm9Zbb4ykJDBkh3wD3tMckR-ghAuxNs1o8n9Kb5ITblwzVS14mmA2PhLjE2NyKTIwAz2",
  },
  {
    title: "Nike Dunk High SE",
    price: "$160.00",
    badge: "New Arrival",
    badgeColor: "bg-tertiary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuALRuCzVScNqCVfPwDW2zcmrF2CkCZzuKCrEpIFoscb6oDDlKa8NzxyaW9hgt_MZDWj1HSECiAUobaMW-7Ty7OYpUJ0fIoA0nICErJsA54MNhtOmqFrBn9UawB1WfC1vt3yzzDyPoRa9hF2Nagr-0H44-JxDZcJ7W8Gypkm8BFn5Nl2U9K5ubUKLPACuvE1OxEAi53AEx2VrtsxrsCSiS35iJ-VfG2VrOqi-iKBgCQmyoythHw3qqv4tVZcViJ9Q-R6oCqI2-dIikAO",
  },
];

const newProducts = [
  {
    title: "Nike Air Max 90",
    price: "$145.00",
    badge: "New",
    badgeColor: "bg-primary",
    image:
      "https://images.unsplash.com/photo-1519741499243-5db450b29f98?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Puma RS-X",
    price: "$135.00",
    badge: "Hot",
    badgeColor: "bg-tertiary",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "New Balance 550",
    price: "$120.00",
    badge: "New",
    badgeColor: "bg-primary",
    image:
      "https://images.unsplash.com/photo-1528701800489-20db15f3f3b4?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Converse Chuck 70",
    price: "$95.00",
    badge: "Retro",
    badgeColor: "bg-[#22c55e]",
    image:
      "https://images.unsplash.com/photo-1528701800489-20db15f3f3b4?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Reebok Classic",
    price: "$110.00",
    badge: "Trending",
    badgeColor: "bg-primary",
    image:
      "https://images.unsplash.com/photo-1519741499243-5db450b29f98?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Vans Old Skool",
    price: "$90.00",
    badge: "Icon",
    badgeColor: "bg-tertiary",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Fila Disruptor",
    price: "$100.00",
    badge: "New",
    badgeColor: "bg-primary",
    image:
      "https://images.unsplash.com/photo-1528701800489-20db15f3f3b4?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Saucony Jazz",
    price: "$105.00",
    badge: "Limited",
    badgeColor: "bg-[#22c55e]",
    image:
      "https://images.unsplash.com/photo-1519741499243-5db450b29f98?auto=format&fit=crop&w=800&q=80",
  },
];

const allProducts = [
  ...newProducts,
  {
    title: "Jordan Retro 4",
    price: "$205.00",
    badge: "",
    badgeColor: "",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Adidas Forum",
    price: "$130.00",
    badge: "",
    badgeColor: "",
    image:
      "https://images.unsplash.com/photo-1528701800489-20db15f3f3b4?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Nike Air Force 1",
    price: "$125.00",
    badge: "",
    badgeColor: "",
    image:
      "https://images.unsplash.com/photo-1519741499243-5db450b29f98?auto=format&fit=crop&w=800&q=80",
  },
];

const HomePage = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const [isPointerActive, setIsPointerActive] = useState(false);

  const scrollByCard = (direction: 1 | -1) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const card = slider.querySelector<HTMLDivElement>(".sale-card");
    const step = card ? card.offsetWidth + 24 : slider.clientWidth * 0.9;
    slider.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const handlePrev = () => scrollByCard(-1);
  const handleNext = () => scrollByCard(1);

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const slider = sliderRef.current;
    if (!slider) return;
    isDragging.current = true;
    setIsPointerActive(true);
    dragStartX.current = e.clientX;
    dragStartScroll.current = slider.scrollLeft;
    slider.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const slider = sliderRef.current;
    if (!slider || !isDragging.current) return;
    const delta = e.clientX - dragStartX.current;
    slider.scrollLeft = dragStartScroll.current - delta;
  };

  const stopDragging = () => {
    isDragging.current = false;
    setIsPointerActive(false);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const interval = window.setInterval(() => {
      if (isPointerActive || isDragging.current) return;
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const card = slider.querySelector<HTMLDivElement>(".sale-card");
        const step = card ? card.offsetWidth + 24 : slider.clientWidth * 0.9;
        slider.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 3800);
    return () => window.clearInterval(interval);
  }, [isPointerActive]);

  return (
    <main>
      {/* <!-- Hero Section --> */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 bg-background">
        {/* <!-- Faded Typography Background --> */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
          <span className="font-display font-black text-[30vw] leading-none text-faded-bg uppercase tracking-tighter opacity-60 transform translate-y-12">
            VAULT
          </span>
        </div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-16 relative z-10 py-12">
          <div className="order-2 lg:order-1 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-tertiary"></span>
              <span className="text-tertiary font-bold text-[10px] uppercase tracking-[0.4em]">
                Premium Streetwear Collection
              </span>
            </div>
            <h1 className="font-display text-7xl md:text-[7rem] font-bold text-primary mb-8 leading-[0.85] tracking-tighter">
              ELEVATE
              <br />
              THE STEP
            </h1>
            <p className="text-secondary text-lg mb-12 max-w-sm font-light leading-relaxed">
              Limited Edition Drops. Experience the fusion of high-fashion
              aesthetics and technical performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button className="bg-primary text-on-primary px-12 py-5 font-bold text-[10px] uppercase tracking-[0.25em] smooth-transition glow-hover border border-primary rounded-sm shadow-xl">
                Shop Now
              </button>
              <button className="bg-transparent text-primary px-12 py-5 font-bold text-[10px] uppercase tracking-[0.25em] smooth-transition border border-black/10 hover:bg-black/5 rounded-sm">
                Explore Archive
              </button>
            </div>
          </div>
          <div
            className="order-1 lg:order-2 flex justify-center lg:justify-end relative animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative group perspective-1000">
              <div className="absolute -inset-10 bg-linear-to-tr from-tertiary/10 to-transparent rounded-full blur-[100px] opacity-40 group-hover:opacity-70 smooth-transition"></div>
              <img
                alt="Premium Sneaker"
                className="w-full max-w-xl relative z-10 floating-shadow smooth-transition group-hover:-translate-y-6 group-hover:rotate-2"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2_Do6tMPHvRMra5nYhv6l2eHUTo66nZ1k2wt4h7VmrWeMSWO8ikV1LNagsdPzRdxxVtGA1V2X2wlxE7-IqEFnVoTqSSXUbVBB8VRR4_HXg_FcIdqOr-rGsea5lUDALhys46thrIlhtXP81MqA-47LEfTGJ7qHU49H6JU99_Qoygz7-nkIEmic-oYXhleHdc5ArYKKrLkXRby7lv7Dojyq1xmNSbtgx6-Vg_SzmhHhnHgama0QjzTS7J8ya9vVabnzaPAyAsPPgIW_"
              />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- sale --> */}
      <section className="py-14 bg-surface-alt">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-5 gap-12">
            <div className="text-center lg:text-left">
              <p className="font-display text-2xl md:text-4xl font-bold text-red-600 tracking-tight">
                Siêu Sale
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                className="w-11 h-11 rounded-full bg-white text-primary shadow-lg border border-slate-200 hover:bg-slate-50 smooth-transition"
                aria-label="Trượt sang trái"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-11 h-11 rounded-full bg-white text-primary shadow-lg border border-slate-200 hover:bg-slate-50 smooth-transition"
                aria-label="Trượt sang phải"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <div
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto scroll-smooth pt-4 pb-2 no-scrollbar"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={stopDragging}
              onPointerLeave={stopDragging}
            >
              {saleProducts.map((product, index) => (
                <div
                  key={`${product.title}-${index}`}
                  className="sale-card group relative flex-none w-[80%] sm:w-[42%] md:w-[30%] lg:w-[18%] bg-white overflow-hidden rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-2 smooth-transition"
                >
                  <div className="aspect-4/5 overflow-hidden bg-[#f0f0f0] relative">
                    <img
                      alt={product.title}
                      className="w-full h-full object-cover smooth-transition group-hover:scale-105"
                      src={product.image}
                    />
                    {product.badge ? (
                      <div className="absolute top-5 left-5 flex flex-col gap-2">
                        <span
                          className={`${product.badgeColor} text-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-sm`}
                        >
                          {product.badge}
                        </span>
                      </div>
                    ) : null}
                    <div className="absolute top-5 right-5 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 smooth-transition">
                      <button className="bg-white/95 backdrop-blur text-primary p-2.5 rounded-full hover:bg-primary hover:text-white smooth-transition shadow-lg">
                        <span className="material-symbols-outlined text-base">
                          favorite
                        </span>
                      </button>
                    </div>
                    <div className="absolute inset-x-5 bottom-5 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 smooth-transition">
                      <button className="w-full bg-primary text-white py-4 text-[10px] font-bold uppercase tracking-[0.15em] rounded-lg flex items-center justify-center gap-2 shadow-xl hover:bg-tertiary">
                        <span className="material-symbols-outlined text-sm">
                          shopping_bag
                        </span>
                        Add to Bag
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-lg mb-1.5 text-primary">
                      {product.title}
                    </h3>
                    <p className="text-tertiary font-bold text-sm">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
                Sản phẩm mới
              </p>
              <p className="text-secondary max-w-xl mt-3">
                Khám phá các mẫu sneaker mới nhất vừa ra mắt, được tuyển chọn
                dành cho phong cách streetwear hiện đại.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {newProducts.map((product, index) => (
              <div
                key={`${product.title}-${index}`}
                className="group relative bg-white overflow-hidden rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-2 smooth-transition"
              >
                <div className="aspect-4/5 overflow-hidden bg-[#f0f0f0] relative">
                  <img
                    alt={product.title}
                    src={product.image}
                    className="w-full h-full object-cover smooth-transition group-hover:scale-105"
                  />
                  {product.badge ? (
                    <span
                      className={`${product.badgeColor} absolute top-4 left-4 text-white px-3 py-1 text-[9px] font-bold uppercase tracking-[0.12em] rounded-sm`}
                    >
                      {product.badge}
                    </span>
                  ) : null}
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-base text-primary mb-1.5">
                    {product.title}
                  </h3>
                  <p className="text-tertiary font-semibold text-sm">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="self-center bg-primary text-on-primary px-8 py-4 rounded-full text-sm font-bold uppercase tracking-[0.15em] hover:bg-tertiary smooth-transition">
            Xem thêm
          </button>
        </div>
      </section>

      <section className="pb-20 bg-surface-alt">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
                Tất cả sản phẩm
              </p>
              <p className="text-secondary max-w-xl mt-3">
                Duyệt toàn bộ bộ sưu tập sneaker của chúng tôi với nhiều phong
                cách từ đơn giản đến năng động.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {allProducts.map((product, index) => (
              <div
                key={`${product.title}-${index}`}
                className="group relative bg-white overflow-hidden rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-2 smooth-transition"
              >
                <div className="aspect-4/5 overflow-hidden bg-[#f0f0f0] relative">
                  <img
                    alt={product.title}
                    src={product.image}
                    className="w-full h-full object-cover smooth-transition group-hover:scale-105"
                  />
                  {product.badge ? (
                    <span
                      className={`${product.badgeColor} absolute top-4 left-4 text-white px-3 py-1 text-[9px] font-bold uppercase tracking-[0.12em] rounded-sm`}
                    >
                      {product.badge}
                    </span>
                  ) : null}
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-base text-primary mb-1.5">
                    {product.title}
                  </h3>
                  <p className="text-tertiary font-semibold text-sm">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button className="bg-primary text-on-primary px-10 py-4 rounded-full text-sm font-bold uppercase tracking-[0.15em] hover:bg-tertiary smooth-transition">
              Xem thêm
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
