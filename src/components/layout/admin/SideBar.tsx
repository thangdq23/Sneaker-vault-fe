import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { logout } from "../../../store/authSlice";
import { resetCartState } from "../../../store/cartSlice";

const SideBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetCartState());
    navigate("/login");
  };

  const navItems = [
    { to: "/admin", label: "Tổng quan", icon: "dashboard", end: true },
    { to: "/admin/products", label: "Sản phẩm", icon: "inventory_2" },
    { to: "/admin/orders", label: "Đơn hàng", icon: "shopping_cart" },
    { to: "/admin/users", label: "Khách hàng", icon: "group" },
    { to: "/admin/reviews", label: "Đánh giá", icon: "rate_review" },
  ];

  const disabledItems = [
    { label: "Thương hiệu", icon: "sell" },
    { label: "Banners", icon: "ad_units" },
    { label: "Bình luận", icon: "forum" },
    { label: "Tin tức", icon: "newspaper" },
    { label: "Khuyến mãi", icon: "sell" },
    { label: "Cài đặt", icon: "settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[260px] bg-zinc-950 border-r border-zinc-900 flex flex-col py-6 z-50 text-zinc-300">
      <div className="px-6 mb-8 flex items-center space-x-3">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-zinc-950 shadow-md">
          <span className="material-symbols-outlined text-2xl font-bold">
            identity_platform
          </span>
        </div>
        <div>
          <h1 className="font-display text-lg font-bold text-white tracking-wide">
            Sneaker Vault
          </h1>
          <p className="text-[10px] text-zinc-500 uppercase font-semibold tracking-wider">
            Management Portal
          </p>
        </div>
      </div>

      <nav className="flex-grow overflow-y-auto px-4 space-y-1 select-none">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? "text-white bg-zinc-800 font-semibold shadow-inner border-l-4 border-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
              }`
            }
          >
            <span className="material-symbols-outlined text-lg">
              {item.icon}
            </span>
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}

        <div className="my-4 border-t border-zinc-900 mx-2"></div>

        {disabledItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-3 text-zinc-600 rounded-xl cursor-not-allowed group hover:bg-zinc-900/10"
          >
            <div className="flex items-center space-x-3">
              <span className="material-symbols-outlined text-lg">
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          </div>
        ))}
      </nav>

      <div className="px-4 mt-auto pt-6 border-t border-zinc-900 relative" ref={menuRef}>
        {menuOpen && (
          <div className="absolute bottom-20 left-4 right-4 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl py-2 px-1 flex flex-col space-y-1 z-50">
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/profile", { state: { activeTab: "info" } });
              }}
              className="flex items-center space-x-3 px-4 py-2.5 rounded-xl hover:bg-zinc-800 text-sm font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer w-full text-left"
            >
              <span className="material-symbols-outlined text-lg">person</span>
              <span>Thông tin cá nhân</span>
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/profile", { state: { activeTab: "password" } });
              }}
              className="flex items-center space-x-3 px-4 py-2.5 rounded-xl hover:bg-zinc-800 text-sm font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer w-full text-left"
            >
              <span className="material-symbols-outlined text-lg">lock</span>
              <span>Đổi mật khẩu</span>
            </button>
            <div className="border-t border-zinc-800 my-1 mx-2"></div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-2.5 rounded-xl hover:bg-rose-950/30 text-sm font-medium text-rose-400 hover:text-rose-300 transition-colors cursor-pointer w-full text-left"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
              <span>Đăng xuất</span>
            </button>
          </div>
        )}

        <div
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center justify-between p-2 rounded-2xl hover:bg-zinc-900/50 cursor-pointer transition-colors group select-none"
        >
          <div className="flex items-center space-x-3 min-w-0">
            <img
              alt="Store Logo"
              className="w-9 h-9 rounded-full border border-zinc-800 object-cover shrink-0"
              src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuC-GBGoQWCiFVTHICIiz7Htrto2vDEHlk4G7_WJQ-9JwNFOsPvlF3uLMmS5Iwoc4leMCdwws2WnwnM0Od_foEaadNY445WB9dNTlBKnIaCnOqLLtmJJL18_v8CFTq3sWfQazWY4wt--MWXfBFaaJNXIMRSrS_eRxphm6hdWlEygHdlI8BlilzTuof8Shq8HyryfPwOk-Boe7wGgJPZO73Y0qsaMavpuV040KImSejUTo8cf8wPJzP1UbHtiy0IAWW6gwG-XXed4Pdk"}
            />
            <div className="overflow-hidden min-w-0">
              <p className="text-xs text-white font-bold truncate">
                {user?.name || "Quản trị viên"}
              </p>
              <p className="text-[9px] text-emerald-500 font-medium flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Đang hoạt động
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-zinc-500 group-hover:text-zinc-300 text-lg transition-colors shrink-0">
            unfold_more
          </span>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
