import React from "react";

const DashboardPage = (): React.JSX.Element => {
  const stats = [
    {
      label: "Tổng doanh thu",
      value: "124,500,000 ₫",
      change: "+12.5% so với tháng trước",
      icon: "payments",
      color: "bg-emerald-500/10 text-emerald-600",
    },
    {
      label: "Sản phẩm",
      value: "142",
      change: "+4 sản phẩm mới tuần này",
      icon: "inventory_2",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      label: "Đơn hàng mới",
      value: "28",
      change: "12 đơn đang chờ xử lý",
      icon: "shopping_cart",
      color: "bg-amber-500/10 text-amber-600",
    },
    {
      label: "Khách hàng",
      value: "1,205",
      change: "+48 người dùng mới",
      icon: "group",
      color: "bg-indigo-500/10 text-indigo-600",
    },
  ];

  const recentOrders = [
    { id: "SV-8041", customer: "Trần Văn B", date: "07/06/2026", total: "2,450,000 ₫", status: "Chờ xử lý", statusClass: "bg-amber-100 text-amber-800" },
    { id: "SV-8040", customer: "Lê Thị C", date: "07/06/2026", total: "1,890,000 ₫", status: "Đang giao", statusClass: "bg-blue-100 text-blue-800" },
    { id: "SV-8039", customer: "Phạm Minh D", date: "06/06/2026", total: "3,100,000 ₫", status: "Đã hoàn thành", statusClass: "bg-emerald-100 text-emerald-800" },
    { id: "SV-8038", customer: "Nguyễn Thu E", date: "05/06/2026", total: "1,250,000 ₫", status: "Đã hủy", statusClass: "bg-rose-100 text-rose-800" },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="font-display text-2xl font-bold text-on-background">Tổng quan hệ thống</h1>
        <p className="text-sm text-secondary">Chào mừng bạn trở lại! Dưới đây là hoạt động bán hàng của cửa hàng hôm nay.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-secondary font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold font-display mt-1 text-on-background">{stat.value}</h3>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
            </div>
            <p className="text-xs text-secondary mt-4 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-lg font-bold text-on-background">Đơn hàng gần đây</h2>
            <button className="text-sm font-semibold text-primary hover:text-tertiary transition-colors flex items-center gap-1">
              Xem tất cả
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/30 text-xs font-semibold text-secondary uppercase bg-surface-container-low/50">
                  <th className="py-3 px-4">Mã đơn</th>
                  <th className="py-3 px-4">Khách hàng</th>
                  <th className="py-3 px-4">Ngày mua</th>
                  <th className="py-3 px-4">Tổng tiền</th>
                  <th className="py-3 px-4">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-sm">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-surface-container-low/20 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-primary">{order.id}</td>
                    <td className="py-3 px-4 font-medium text-on-background">{order.customer}</td>
                    <td className="py-3 px-4 text-secondary">{order.date}</td>
                    <td className="py-3 px-4 font-medium text-on-background price-vnd">{order.total}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${order.statusClass}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-on-background mb-6">Thao tác nhanh</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3.5 bg-surface-container-low hover:bg-surface-container-high rounded-xl text-left transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary bg-white p-2 rounded-lg border border-outline-variant/20">add_shopping_cart</span>
                  <div>
                    <p className="text-sm font-semibold text-on-background">Thêm sản phẩm mới</p>
                    <p className="text-xs text-secondary">Đăng bán sản phẩm mới lên shop</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary group-hover:translate-x-1 transition-transform">chevron_right</span>
              </button>

              <button className="w-full flex items-center justify-between p-3.5 bg-surface-container-low hover:bg-surface-container-high rounded-xl text-left transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary bg-white p-2 rounded-lg border border-outline-variant/20">local_shipping</span>
                  <div>
                    <p className="text-sm font-semibold text-on-background">Duyệt đơn hàng</p>
                    <p className="text-xs text-secondary">Xem và xử lý các đơn hàng mới</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary group-hover:translate-x-1 transition-transform">chevron_right</span>
              </button>

              <button className="w-full flex items-center justify-between p-3.5 bg-surface-container-low hover:bg-surface-container-high rounded-xl text-left transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary bg-white p-2 rounded-lg border border-outline-variant/20">percent</span>
                  <div>
                    <p className="text-sm font-semibold text-on-background">Tạo mã giảm giá</p>
                    <p className="text-xs text-secondary">Tạo ưu đãi cho chiến dịch mới</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary group-hover:translate-x-1 transition-transform">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-outline-variant/20 text-center">
            <span className="text-xs text-secondary">Mọi hoạt động đều được ghi nhật ký hệ thống</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
