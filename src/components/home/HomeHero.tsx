import { Link } from "react-router-dom";

const HERO_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB2_Do6tMPHvRMra5nYhv6l2eHUTo66nZ1k2wt4h7VmrWeMSWO8ikV1LNagsdPzRdxxVtGA1V2X2wlxE7-IqEFnVoTqSSXUbVBB8VRR4_HXg_FcIdqOr-rGsea5lUDALhys46thrIlhtXP81MqA-47LEfTGJ7qHU49H6JU99_Qoygz7-nkIEmic-oYXhleHdc5ArYKKrLkXRby7lv7Dojyq1xmNSbtgx6-Vg_SzmhHhnHgama0QjzTS7J8ya9vVabnzaPAyAsPPgIW_";

const HomeHero = (): React.JSX.Element => {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-background pt-20 md:min-h-[90vh]">
      <div className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center overflow-hidden">
        <span className="translate-y-12 font-display text-[28vw] font-black uppercase leading-none tracking-tighter text-faded-bg opacity-60">
          VAULT
        </span>
      </div>
      <div className="relative z-10 mx-auto grid w-full max-w-container-max grid-cols-1 items-center gap-12 px-margin-mobile py-10 md:px-margin-desktop lg:grid-cols-2 lg:gap-16 lg:py-12">
        <div className="order-2 animate-fade-in-up lg:order-1">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-tertiary" />
            <span className="text-xs font-semibold leading-snug text-tertiary sm:text-sm">
              Bộ sưu tập streetwear cao cấp
            </span>
          </div>
          <h1 className="mb-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-primary sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Nâng tầm
            <br />
            bước đi
          </h1>
          <p className="mb-10 max-w-md text-base leading-relaxed text-secondary sm:text-lg">
            Phiên bản giới hạn. Trải nghiệm sự giao thoa giữa thẩm mỹ thời trang
            cao cấp và hiệu năng kỹ thuật.
          </p>
          <div className="flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-4">
            <Link to="/shop" className="btn btn-primary min-w-[9rem] shadow-xl">
              Mua ngay
            </Link>
            <Link
              to="/shop"
              className="btn btn-secondary min-w-[9rem] sm:max-w-[14rem]"
            >
              Khám phá bộ sưu tập
            </Link>
          </div>
        </div>
        <div
          className="relative order-1 flex animate-fade-in-up justify-center lg:order-2 lg:justify-end"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="group perspective-1000 relative">
            <div className="absolute -inset-10 rounded-full bg-linear-to-tr from-tertiary/10 to-transparent opacity-40 blur-[100px] smooth-transition group-hover:opacity-70" />
            <img
              alt="Giày sneaker cao cấp"
              className="relative z-10 w-full max-w-xl floating-shadow smooth-transition group-hover:-translate-y-6 group-hover:rotate-2"
              src={HERO_IMAGE_URL}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
