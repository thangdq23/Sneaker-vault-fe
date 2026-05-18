import { Link } from "react-router";

const Header = () => {
  return (
    <nav className="fixed top-0 w-full z-[100] glass border-b border-black/5">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-5 max-w-container-max mx-auto">
        <div className="flex items-center gap-16">
          <Link
            to="/"
            className="font-display text-2xl md:text-2xl font-bold tracking-tight text-primary flex items-center gap-2"
          >
            <span className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white text-xs">
              SV
            </span>

            <span className="hidden sm:inline">SNEAKER VAULT</span>
          </Link>

          <div className="hidden lg:flex gap-10 items-center">
            <Link
              to="/"
              className="nav-link font-medium text-[11px] uppercase tracking-[0.2em] text-primary"
            >
              Home
            </Link>

            <Link
              to="shop"
              className="nav-link font-medium text-[11px] uppercase tracking-[0.2em] text-secondary hover:text-primary smooth-transition"
            >
              Shop
            </Link>

            <a className="nav-link font-medium text-[11px] uppercase tracking-[0.2em] text-secondary hover:text-primary smooth-transition">
              Brands
            </a>

            <a className="nav-link font-medium text-[11px] uppercase tracking-[0.2em] text-secondary hover:text-primary smooth-transition">
              About
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <button className="material-symbols-outlined p-2 hover:bg-black/5 rounded-full smooth-transition">
            search
          </button>

          <button className="material-symbols-outlined p-2 hover:bg-black/5 rounded-full smooth-transition relative">
            favorite
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-tertiary rounded-full"></span>
          </button>

          <button className="material-symbols-outlined p-2 hover:bg-black/5 rounded-full smooth-transition">
            shopping_bag
          </button>

          <button className="material-symbols-outlined p-2 hover:bg-black/5 rounded-full smooth-transition hidden md:block">
            person
          </button>

          <button className="material-symbols-outlined p-2 lg:hidden">
            menu
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
