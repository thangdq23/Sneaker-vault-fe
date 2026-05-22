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
        .slice(0, 2)
    : user?.email
      ? user.email.charAt(0).toUpperCase()
      : "U";

  return (
    <nav className="fixed top-0 z-[100] w-full glass border-b border-black/5">
      <div className="mx-auto flex w-full max-w-container-max items-center justify-between gap-3 px-margin-mobile py-3 md:gap-4 md:px-margin-desktop md:py-4">
        <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-6 lg:gap-10">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2 font-display text-lg font-bold tracking-tight text-primary md:text-xl"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded bg-primary text-xs text-white">
              SV
            </span>
            <span className="hidden truncate sm:inline">SNEAKER VAULT</span>
          </Link>

          <div className="hidden min-w-0 items-center gap-4 overflow-x-auto no-scrollbar lg:flex lg:gap-6 xl:gap-8">
            <Link to="/" className="nav-link nav-link-vi text-primary">
              Trang chủ
            </Link>
            <Link
              to="/shop"
              className="nav-link nav-link-vi text-secondary hover:text-primary"
            >
              Cửa hàng
            </Link>
            <a
              href="#"
              className="nav-link nav-link-vi text-secondary hover:text-primary"
            >
              Thương hiệu
            </a>
            <a
              href="#"
              className="nav-link nav-link-vi text-secondary hover:text-primary"
            >
              Giới thiệu
            </a>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:gap-3">
          <button
            type="button"
            aria-label="Tìm kiếm"
            className="material-symbols-outlined rounded-full p-2 hover:bg-black/5 smooth-transition"
          >
            search
          </button>

          <button
            type="button"
            aria-label="Giỏ hàng"
            onClick={handleCart}
            className="material-symbols-outlined rounded-full p-2 hover:bg-black/5 smooth-transition"
          >
            shopping_bag
          </button>

          {!token ? (
            <>
              <Link
                to="/login"
                className="hidden items-center justify-center whitespace-nowrap rounded-md border border-outline-variant/30 px-3 py-2 text-sm font-medium hover:bg-surface-container md:inline-flex lg:px-4"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="hidden items-center justify-center whitespace-nowrap rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:opacity-95 md:inline-flex lg:px-4"
              >
                Đăng ký
              </Link>
            </>
          ) : (
            <button
              type="button"
              onClick={handleAvatarClick}
              title={user?.email ?? "Tài khoản"}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-white"
            >
              {initials}
            </button>
          )}

          <button
            type="button"
            aria-label="Mở menu"
            className="material-symbols-outlined rounded-full p-2 lg:hidden"
          >
            menu
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
