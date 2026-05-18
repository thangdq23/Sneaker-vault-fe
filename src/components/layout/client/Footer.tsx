const Footer = () => {
  return (
    <footer className="bg-white pt-32 pb-16 border-t border-black/5">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="flex flex-col gap-10">
            <a
              className="font-display text-2xl font-bold tracking-tight text-primary flex items-center gap-2"
              href="#"
            >
              <span className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white text-xs">
                SV
              </span>
              <span>SNEAKER VAULT</span>
            </a>
            <p className="text-secondary text-sm leading-relaxed max-w-xs font-light">
              Elevating the global sneaker culture through a premium curation of
              limited editions and classNameic essentials.
            </p>
            <div className="flex gap-3">
              <a
                className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:scale-110 smooth-transition"
                href="#"
              >
                <span className="material-symbols-outlined text-xl">
                  public
                </span>
              </a>
              <a
                className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:scale-110 smooth-transition"
                href="#"
              >
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
              <a
                className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:scale-110 smooth-transition"
                href="#"
              >
                <span className="material-symbols-outlined text-xl">
                  language
                </span>
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h4 className="font-display font-bold text-[10px] uppercase tracking-[0.4em] text-primary">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-5">
              <li>
                <a
                  className="text-sm text-secondary hover:text-primary hover:translate-x-2 inline-block smooth-transition font-light"
                  href="#"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  className="text-sm text-secondary hover:text-primary hover:translate-x-2 inline-block smooth-transition font-light"
                  href="#"
                >
                  Size Guide
                </a>
              </li>
              <li>
                <a
                  className="text-sm text-secondary hover:text-primary hover:translate-x-2 inline-block smooth-transition font-light"
                  href="#"
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  className="text-sm text-secondary hover:text-primary hover:translate-x-2 inline-block smooth-transition font-light"
                  href="#"
                >
                  Store Locator
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-8">
            <h4 className="font-display font-bold text-[10px] uppercase tracking-[0.4em] text-primary">
              Categories
            </h4>
            <ul className="flex flex-col gap-5">
              <li>
                <a
                  className="text-sm text-secondary hover:text-primary hover:translate-x-2 inline-block smooth-transition font-light"
                  href="#"
                >
                  Men's Sneakers
                </a>
              </li>
              <li>
                <a
                  className="text-sm text-secondary hover:text-primary hover:translate-x-2 inline-block smooth-transition font-light"
                  href="#"
                >
                  Women's Sneakers
                </a>
              </li>
              <li>
                <a
                  className="text-sm text-secondary hover:text-primary hover:translate-x-2 inline-block smooth-transition font-light"
                  href="#"
                >
                  Limited Edition
                </a>
              </li>
              <li>
                <a
                  className="text-sm text-secondary hover:text-primary hover:translate-x-2 inline-block smooth-transition font-light"
                  href="#"
                >
                  Release Calendar
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-8">
            <h4 className="font-display font-bold text-[10px] uppercase tracking-[0.4em] text-primary">
              Contact
            </h4>
            <div className="flex flex-col gap-6 text-sm text-secondary font-light">
              <p className="flex items-center gap-4 group cursor-pointer">
                <span className="w-8 h-8 rounded-lg bg-surface-alt flex items-center justify-center material-symbols-outlined text-base group-hover:bg-primary group-hover:text-white smooth-transition">
                  mail
                </span>
                support@sneakervault.com
              </p>
              <p className="flex items-center gap-4 group cursor-pointer">
                <span className="w-8 h-8 rounded-lg bg-surface-alt flex items-center justify-center material-symbols-outlined text-base group-hover:bg-primary group-hover:text-white smooth-transition">
                  call
                </span>
                +1 (555) 012-3456
              </p>
              <p className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-lg bg-surface-alt flex items-center justify-center material-symbols-outlined text-base">
                  schedule
                </span>
                Mon - Fri: 9AM - 6PM EST
              </p>
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary/40">
            © 2024 SNEAKER VAULT. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-10">
            <a
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary/40 hover:text-primary smooth-transition"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary/40 hover:text-primary smooth-transition"
              href="#"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
