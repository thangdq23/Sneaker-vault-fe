import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchCartItems } from "../../../store/cartSlice";
import logo from "../../../assets/logo-sv.png";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { token, user } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (token) {
      void dispatch(fetchCartItems());
    }
  }, [token, dispatch]);

  const handleCart = () => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/cart");
    }
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

  const cartCount =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  return (
    <nav className="fixed top-0 z-100 w-full glass border-b border-black/5">
      <div className="mx-auto flex w-full max-w-container-max items-center justify-between gap-3 px-margin-mobile py-3 md:gap-4 md:px-margin-desktop md:py-4">
        <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-6 lg:gap-10">
          <NavLink
            to="/"
            className="flex shrink-0 items-center gap-2 font-display text-lg font-bold tracking-tight text-primary md:text-xl"
          >
            <img
              src={logo}
              alt="Sneaker Vault Logo"
              className="h-8 w-8 object-contain"
            />

            <span className="hidden truncate sm:inline">SNEAKER VAULT</span>
          </NavLink>

          <div className="hidden min-w-0 items-center gap-4 overflow-x-auto no-scrollbar lg:flex lg:gap-6 xl:gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link nav-link-vi ${
                  isActive
                    ? "text-primary font-semibold border-b-2 border-primary"
                    : "text-secondary hover:text-primary"
                }`
              }
            >
              Trang chủ
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `nav-link nav-link-vi ${
                  isActive
                    ? "text-primary font-semibold border-b-2 border-primary"
                    : "text-secondary hover:text-primary"
                }`
              }
            >
              Cửa hàng
            </NavLink>
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
            className="material-symbols-outlined relative rounded-full p-2 hover:bg-black/5 smooth-transition"
          >
            shopping_bag
            {token && cartCount > 0 ? (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
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
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-white cursor-pointer hover:opacity-90"
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
