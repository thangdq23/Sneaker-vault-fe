import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(
    () => {
      try {
        return JSON.parse(localStorage.getItem("user") ?? "null");
      } catch {
        return null;
      }
    },
  );

  useEffect(() => {
    const onStorage = () => {
      setToken(localStorage.getItem("token"));
      try {
        setUser(JSON.parse(localStorage.getItem("user") ?? "null"));
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleCart = () => {
    navigate("/cart");
  };

  const handleAvatarClick = () => {
    navigate("/profile");
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((s) => s[0])
        .join("")
    : user?.email
      ? user.email.charAt(0).toUpperCase()
      : "U";

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

          <button
            onClick={handleCart}
            className="material-symbols-outlined p-2 hover:bg-black/5 rounded-full smooth-transition"
          >
            shopping_bag
          </button>

          {!token ? (
            <>
              <Link
                to="/login"
                className="hidden md:inline px-3 py-2 rounded-md bg-transparent border border-outline-variant/30 hover:bg-surface-container-low"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hidden md:inline px-3 py-2 rounded-md bg-primary text-white hover:opacity-95 ml-2"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleAvatarClick}
              title={user?.email ?? "User"}
              className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-medium"
            >
              {initials}
            </button>
          )}

          <button className="material-symbols-outlined p-2 lg:hidden">
            menu
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
