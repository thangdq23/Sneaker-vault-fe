import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-black/5 bg-white pb-16 pt-20 md:pt-24">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="mb-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-primary"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded bg-primary text-xs text-white">
                SV
              </span>
              <span>SNEAKER VAULT</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-secondary">
              Nâng tầm văn hóa sneaker toàn cầu với bộ sưu tập phiên bản giới
              hạn và những mẫu kinh điển được tuyển chọn kỹ lưỡng.
            </p>
            <div className="flex gap-3">
              <a
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/5 text-primary smooth-transition hover:scale-110 hover:bg-primary hover:text-white"
                href="#"
                aria-label="Mạng xã hội"
              >
                <span className="material-symbols-outlined text-xl">public</span>
              </a>
              <a
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/5 text-primary smooth-transition hover:scale-110 hover:bg-primary hover:text-white"
                href="#"
                aria-label="Chia sẻ"
              >
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
              <a
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/5 text-primary smooth-transition hover:scale-110 hover:bg-primary hover:text-white"
                href="#"
                aria-label="Website"
              >
                <span className="material-symbols-outlined text-xl">
                  language
                </span>
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
              Liên kết nhanh
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Về chúng tôi", href: "#" },
                { label: "Hướng dẫn chọn size", href: "#" },
                { label: "Đổi trả hàng", href: "#" },
                { label: "Hệ thống cửa hàng", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    className="inline-block text-sm leading-relaxed text-secondary smooth-transition hover:translate-x-1 hover:text-primary"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
              Danh mục
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                "Sneaker nam",
                "Sneaker nữ",
                "Phiên bản giới hạn",
                "Lịch phát hành",
              ].map((label) => (
                <li key={label}>
                  <Link
                    to="/shop"
                    className="inline-block text-sm leading-relaxed text-secondary smooth-transition hover:translate-x-1 hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
              Liên hệ
            </h4>
            <div className="flex flex-col gap-4 text-sm leading-relaxed text-secondary">
              <p className="flex cursor-pointer items-start gap-3 group">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-alt material-symbols-outlined text-base group-hover:bg-primary group-hover:text-white smooth-transition">
                  mail
                </span>
                <span className="break-all pt-1">support@sneakervault.com</span>
              </p>
              <p className="flex cursor-pointer items-start gap-3 group">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-alt material-symbols-outlined text-base group-hover:bg-primary group-hover:text-white smooth-transition">
                  call
                </span>
                <span className="pt-1">1900 1234</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-alt material-symbols-outlined text-base">
                  schedule
                </span>
                <span className="pt-1">Thứ 2 – Thứ 6: 9:00 – 18:00</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-black/5 pt-8 text-center md:flex-row md:text-left">
          <p className="text-xs leading-relaxed text-secondary/70">
            © 2024 SNEAKER VAULT. Bảo lưu mọi quyền.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:justify-end">
            <a
              className="text-xs text-secondary/70 smooth-transition hover:text-primary"
              href="#"
            >
              Chính sách bảo mật
            </a>
            <a
              className="text-xs text-secondary/70 smooth-transition hover:text-primary"
              href="#"
            >
              Điều khoản dịch vụ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
