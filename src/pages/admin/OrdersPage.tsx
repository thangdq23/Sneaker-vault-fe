import React from "react";

const OrdersPage = (): React.JSX.Element => {
  const orders = [
    { id: "SV-8041", customer: "Trần Văn B", email: "tranb@gmail.com", date: "07/06/2026", items: "Nike Air Force 1 (sz 41)", total: "2,900,000 ₫", status: "Chờ xử lý", statusClass: "bg-amber-100 text-amber-800" },
    { id: "SV-8040", customer: "Lê Thị C", email: "lethic@gmail.com", date: "07/06/2026", items: "Adidas Ultraboost (sz 39)", total: "4,500,000 ₫", status: "Đang giao", statusClass: "bg-blue-100 text-blue-800" },
    { id: "SV-8039", customer: "Phạm Minh D", email: "phamd@gmail.com", date: "06/06/2026", items: "Jordan 1 Retro (sz 42.5)", total: "5,200,000 ₫", status: "Đã hoàn thành", statusClass: "bg-emerald-100 text-emerald-800" },
    { id: "SV-8038", customer: "Nguyễn Thu E", email: "nguyene@gmail.com", date: "05/06/2026", items: "Puma Suede Classic (sz 38)", total: "1,950,000 ₫", status: "Đã hủy", statusClass: "bg-rose-100 text-rose-800" },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="font-display text-2xl font-bold text-on-background">Quản lý đơn hàng</h1>
        <p className="text-sm text-secondary">Quản lý quy trình xử lý, vận chuyển và hoàn trả các đơn hàng của khách.</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-full w-full md:w-96 border border-outline-variant/30">
          <span className="material-symbols-outlined text-outline">search</span>
          <input
            className="bg-transparent border-none focus:ring-0 text-body-sm w-full placeholder-on-surface-variant/50 ml-2"
            placeholder="Tìm kiếm theo mã đơn hàng hoặc tên khách..."
            type="text"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto font-body">
          <select className="bg-surface-container-low text-sm rounded-xl px-4 py-2 border border-outline-variant/30 text-on-surface focus:outline-none cursor-pointer">
            <option>Tất cả trạng thái</option>
            <option>Chờ xử lý</option>
            <option>Đang giao</option>
            <option>Đã giao</option>
            <option>Đã hủy</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-xs font-semibold text-secondary uppercase bg-surface-container-low/50">
                <th className="py-3.5 px-6">Mã đơn</th>
                <th className="py-3.5 px-6">Khách hàng</th>
                <th className="py-3.5 px-6">Ngày mua</th>
                <th className="py-3.5 px-6">Sản phẩm</th>
                <th className="py-3.5 px-6">Tổng tiền</th>
                <th className="py-3.5 px-6">Trạng thái</th>
                <th className="py-3.5 px-6 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-sm">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container-low/20 transition-colors">
                  <td className="py-4 px-6 font-mono font-medium text-primary">{order.id}</td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-on-background">{order.customer}</p>
                      <p className="text-xs text-secondary">{order.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-secondary">{order.date}</td>
                  <td className="py-4 px-6 text-secondary truncate max-w-[200px]">{order.items}</td>
                  <td className="py-4 px-6 font-medium text-on-background price-vnd">{order.total}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${order.statusClass}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center">
                      <button className="p-1.5 hover:bg-surface-container-low rounded-lg text-secondary hover:text-primary transition-colors cursor-pointer" title="Chi tiết đơn">
                        <span className="material-symbols-outlined text-base">visibility</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
