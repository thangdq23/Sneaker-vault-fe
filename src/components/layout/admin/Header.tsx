const Header = () => {

  return (
    <header className="h-16 bg-surface border-b border-outline-variant/30 flex justify-between items-center px-6 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-full w-96 border border-outline-variant/30">
        <span className="material-symbols-outlined text-secondary text-base">
          search
        </span>
        <input
          className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder-secondary/50 ml-2 focus:outline-none"
          placeholder="Tìm kiếm sản phẩm, đơn hàng..."
          type="text"
        />
        <span className="text-[10px] font-bold text-secondary bg-white border border-outline-variant/30 px-1.5 py-0.5 rounded ml-2">
          ⌘K
        </span>
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex space-x-4">
          <button className="relative p-2 text-secondary hover:bg-surface-container-high rounded-full transition-all focus:ring-2 focus:ring-primary ring-offset-2 cursor-pointer">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
          </button>
          <button className="p-2 text-secondary hover:bg-surface-container-high rounded-full transition-all focus:ring-2 focus:ring-primary ring-offset-2 cursor-pointer">
            <span className="material-symbols-outlined">help</span>
          </button>
        </div>
        <div className="h-8 w-[1px] bg-outline-variant/30"></div>
      </div>
    </header>
  );
};

export default Header;
