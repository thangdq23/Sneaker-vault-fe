import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Filler,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Filler,
  Legend
);
import { getDashboardData } from "../../services/dashboardApi";
import type { DashboardData } from "../../types/dashboard.type";
import { formatVnd } from "../../utils/formatCurrency";
import { useToast } from "../../contexts/ToastContext";

const DashboardPage = (): React.JSX.Element => {
  const { showToast } = useToast();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [quickFilter, setQuickFilter] = useState<string>("month");
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const formatLocalDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const validateDateRange = (start: string, end: string): boolean => {
    if (!start || !end) {
      showToast("Vui lòng chọn đầy đủ ngày bắt đầu và ngày kết thúc.", "error");
      return false;
    }
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);

    if (startDateObj > endDateObj) {
      showToast("Ngày bắt đầu không được lớn hơn ngày kết thúc.", "error");
      return false;
    }

    const diffTime = Math.abs(endDateObj.getTime() - startDateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 730) {
      showToast("Khoảng thời gian chọn không được vượt quá 2 năm (730 ngày).", "error");
      return false;
    }

    return true;
  };

  const fetchDashboard = async (start: string, end: string) => {
    if (!validateDateRange(start, end)) return;
    setLoading(true);
    try {
      const res = await getDashboardData(start, end);
      setData(res);
    } catch (err: any) {
      showToast(
        err.response?.data?.message || err.message || "Không thể tải số liệu thống kê.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFilter = (type: string) => {
    const today = new Date();
    let start = new Date();
    let end = new Date();

    if (type === "today") {
      start = today;
      end = today;
    } else if (type === "week") {
      start.setDate(today.getDate() - 6);
    } else if (type === "month30") {
      start.setDate(today.getDate() - 29);
    } else if (type === "month") {
      start = new Date(today.getFullYear(), today.getMonth(), 1);
    } else if (type === "year") {
      start = new Date(today.getFullYear(), 0, 1);
    }

    const startStr = formatLocalDate(start);
    const endStr = formatLocalDate(end);

    setStartDate(startStr);
    setEndDate(endStr);
    setQuickFilter(type);

    fetchDashboard(startStr, endStr);
  };

  const handleViewStats = () => {
    fetchDashboard(startDate, endDate);
  };

  useEffect(() => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startStr = formatLocalDate(firstDayOfMonth);
    const endStr = formatLocalDate(today);

    setStartDate(startStr);
    setEndDate(endStr);
    setQuickFilter("month");
    fetchDashboard(startStr, endStr);
  }, []);

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "confirmed":
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipping":
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "cancelled":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getOrderStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xử lý";
      case "confirmed":
      case "processing":
        return "Đã xác nhận";
      case "shipping":
      case "shipped":
        return "Đang giao";
      case "delivered":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  if (loading || !data) {
    return (
      <div className="space-y-6 animate-pulse text-on-surface">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-48"></div>
            <div className="h-4 bg-gray-200 rounded w-72"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded-xl w-36"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm h-32"></div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm lg:col-span-2 h-96"></div>
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm h-96"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm lg:col-span-2 h-80"></div>
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm h-80"></div>
        </div>
      </div>
    );
  }

  const chartLabels = data.chartData.map((d) => d.label);
  const chartValues = data.chartData.map((d) => d.revenue);

  const chartData: ChartData<"line"> = {
    labels: chartLabels,
    datasets: [
      {
        fill: true,
        label: "Doanh thu",
        data: chartValues,
        borderColor: "#10b981",
        borderWidth: 2.5,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return undefined;
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(16, 185, 129, 0.2)");
          gradient.addColorStop(1, "rgba(16, 185, 129, 0.0)");
          return gradient;
        },
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#10b981",
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#ffffff",
        titleColor: "#1e293b",
        bodyColor: "#1e293b",
        borderColor: "#f1f5f9",
        borderWidth: 1,
        padding: 12,
        boxPadding: 4,
        cornerRadius: 16,
        bodyFont: {
          family: "var(--font-body)",
          size: 11,
        },
        titleFont: {
          family: "var(--font-body)",
          size: 11,
          weight: "bold",
        },
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            return ` Doanh thu: ${formatVnd(value ?? 0)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#94a3b8",
          font: {
            family: "monospace",
            size: 10,
          },
        },
      },
      y: {
        grid: {
          color: "#f1f5f9",
        },
        ticks: {
          color: "#94a3b8",
          font: {
            family: "monospace",
            size: 10,
          },
          callback: (value) => {
            const num = Number(value);
            return `${(num / 1000000).toFixed(1)}M`;
          },
        },
      },
    },
  };

  const totalPeriodOrders =
    data.orderStatuses.pending +
    data.orderStatuses.confirmed +
    data.orderStatuses.shipping +
    data.orderStatuses.delivered +
    data.orderStatuses.cancelled || 1;

  const getPercentage = (value: number) => {
    return Math.round((value / totalPeriodOrders) * 100);
  };

  return (
    <div className="space-y-6 animate-fade-in-up text-on-surface">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 pb-2">
        <div>
          <h1 className="font-display text-2xl font-bold text-on-background">Tổng quan hệ thống</h1>
          <p className="text-sm text-secondary font-body">Xem các chỉ số kinh doanh quan trọng và quản trị cửa hàng Sneaker Vault.</p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-4 bg-white p-4 rounded-3xl border border-outline-variant/20 shadow-sm shrink-0">
          <div className="flex flex-wrap items-center gap-2 border-b lg:border-b-0 lg:border-r border-outline-variant/20 pb-3 lg:pb-0 lg:pr-4">
            {[
              { label: "Hôm nay", value: "today" },
              { label: "7 ngày", value: "week" },
              { label: "30 ngày", value: "month30" },
              { label: "Tháng này", value: "month" },
              { label: "Năm nay", value: "year" },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => handleQuickFilter(item.value)}
                className={`text-xs font-bold px-3 py-2 rounded-xl transition-all ${
                  quickFilter === item.value
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-surface-alt hover:bg-slate-100 text-secondary hover:text-on-surface border border-outline-variant/20 cursor-pointer"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 font-body">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-secondary">Từ</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setQuickFilter("");
                }}
                className="bg-surface-alt text-xs rounded-xl px-3 py-2 border border-outline-variant/25 text-on-surface font-semibold focus:outline-none focus:border-slate-400 cursor-pointer shadow-sm hover:bg-slate-50 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-secondary">Đến</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setQuickFilter("");
                }}
                className="bg-surface-alt text-xs rounded-xl px-3 py-2 border border-outline-variant/25 text-on-surface font-semibold focus:outline-none focus:border-slate-400 cursor-pointer shadow-sm hover:bg-slate-50 transition-colors"
              />
            </div>

            <button
              onClick={handleViewStats}
              className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm ml-auto lg:ml-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">search</span>
              Xem thống kê
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-outline">Doanh thu</p>
              <h3 className="text-2xl font-extrabold font-display mt-2 text-emerald-600">
                {formatVnd(data.periodRevenue.currentRevenue)}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-emerald-50 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">payments</span>
            </div>
          </div>
          <p className="text-[10px] text-secondary font-semibold mt-4">
            Doanh thu từ ngày {new Date(startDate).toLocaleDateString("vi-VN")} đến ngày {new Date(endDate).toLocaleDateString("vi-VN")}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-outline">Đơn hàng</p>
              <h3 className="text-2xl font-extrabold font-display mt-2 text-on-background">
                {data.overview.totalOrders} đơn
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-50 text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">shopping_bag</span>
            </div>
          </div>
          <p className="text-[10px] text-secondary font-semibold mt-4">
            Tổng đơn hàng phát sinh trong khoảng thời gian lọc
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-outline">Khách hàng mới</p>
              <h3 className="text-2xl font-extrabold font-display mt-2 text-on-background">
                {data.overview.totalUsers} tài khoản
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-indigo-50 text-indigo-600 shrink-0 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">group</span>
            </div>
          </div>
          <p className="text-[10px] text-secondary font-semibold mt-4">
            Số tài khoản đăng ký mới trong khoảng thời gian lọc
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-outline">Tổng sản phẩm</p>
              <h3 className="text-2xl font-extrabold font-display mt-2 text-on-background">
                {data.overview.totalProducts} mẫu
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-purple-50 text-purple-600 shrink-0 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">inventory_2</span>
            </div>
          </div>
          <p className="text-[10px] text-secondary font-semibold mt-4">
            Tổng số mẫu sản phẩm hiện có trên hệ thống
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-sm lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
            <h2 className="font-display text-base font-bold text-on-background">Biểu đồ doanh thu</h2>
            <span className="text-xs font-semibold text-secondary font-mono">Đơn vị: VNĐ</span>
          </div>

          <div className="h-72 w-full font-mono text-xs">
            {data.chartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-secondary font-medium font-body">
                Không có dữ liệu doanh thu trong khoảng thời gian này.
              </div>
            ) : (
              <Line options={chartOptions} data={chartData} />
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-display text-base font-bold text-on-background pb-3 border-b border-outline-variant/20">
              Trạng thái đơn hàng
            </h2>

            <div className="space-y-4 mt-5 font-body">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-amber-700">🟡 Chờ xử lý</span>
                  <span className="text-secondary">{data.orderStatuses.pending} đơn ({getPercentage(data.orderStatuses.pending)}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${getPercentage(data.orderStatuses.pending)}%` }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-blue-700">🔵 Đã xác nhận</span>
                  <span className="text-secondary">{data.orderStatuses.confirmed} đơn ({getPercentage(data.orderStatuses.confirmed)}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${getPercentage(data.orderStatuses.confirmed)}%` }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-purple-700">🟣 Đang giao</span>
                  <span className="text-secondary">{data.orderStatuses.shipping} đơn ({getPercentage(data.orderStatuses.shipping)}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: `${getPercentage(data.orderStatuses.shipping)}%` }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-emerald-700">🟢 Hoàn thành</span>
                  <span className="text-secondary">{data.orderStatuses.delivered} đơn ({getPercentage(data.orderStatuses.delivered)}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${getPercentage(data.orderStatuses.delivered)}%` }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-rose-700">🔴 Đã hủy</span>
                  <span className="text-secondary">{data.orderStatuses.cancelled} đơn ({getPercentage(data.orderStatuses.cancelled)}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: `${getPercentage(data.orderStatuses.cancelled)}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/10 text-center text-[10px] text-secondary font-semibold">
            Tỉ lệ tính theo tổng {totalPeriodOrders} đơn hàng
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-sm space-y-4">
          <h2 className="font-display text-base font-bold text-on-background pb-3 border-b border-outline-variant/20">
            Top sản phẩm bán chạy
          </h2>

          {data.topProducts.length === 0 ? (
            <div className="py-12 text-center text-secondary font-medium font-body text-xs">
              Chưa có dữ liệu bán chạy.
            </div>
          ) : (
            <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto no-scrollbar font-body">
              {data.topProducts.map((p, idx) => (
                <div key={p.productId} className="py-3.5 flex gap-3 first:pt-0 last:pb-0 items-center">
                  <span className="font-display font-extrabold text-secondary w-5 text-center shrink-0">#{idx + 1}</span>
                  <div className="h-10 w-10 overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-alt flex items-center justify-center shrink-0">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-outline text-lg">image</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="line-clamp-1 text-xs font-bold text-on-surface">{p.name}</h4>
                    <p className="text-[10px] text-secondary mt-0.5 font-medium">Đã bán: <strong className="text-on-surface">{p.quantitySold} đôi</strong></p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 shrink-0">{formatVnd(p.revenue)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-outline-variant/20">
            <h2 className="font-display text-base font-bold text-on-background">Đơn hàng mới</h2>
            <Link
              to="/admin/orders"
              className="text-xs font-bold text-primary hover:underline"
            >
              Tất cả
            </Link>
          </div>

          {data.recentOrders.length === 0 ? (
            <div className="py-12 text-center text-secondary font-medium font-body text-xs">
              Không có đơn hàng nào.
            </div>
          ) : (
            <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto no-scrollbar font-body">
              {data.recentOrders.map((o) => (
                <div key={o._id} className="py-3.5 flex justify-between items-center gap-3 first:pt-0 last:pb-0">
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Link
                        to={`/admin/orders/${o._id}`}
                        className="font-mono text-xs font-bold text-primary hover:underline"
                      >
                        {o.orderCode}
                      </Link>
                      <span className={`inline-block border px-1.5 py-0.2 rounded-full text-[9px] font-bold uppercase whitespace-nowrap scale-90 origin-left ${getOrderStatusBadge(o.status)}`}>
                        {getOrderStatusText(o.status)}
                      </span>
                    </div>
                    <p className="text-[10px] text-secondary font-medium">Khách: <strong className="text-on-surface">{o.customerName}</strong></p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-on-surface block">{formatVnd(o.totalAmount)}</span>
                    <span className="text-[9px] text-secondary block font-mono">
                      {new Date(o.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-outline-variant/20">
            <h2 className="font-display text-base font-bold text-rose-700 flex items-center gap-1">
              <span className="material-symbols-outlined text-base leading-none">warning</span>
              Sản phẩm sắp hết hàng
            </h2>
            <span className="inline-block rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold px-2 py-0.5 border border-rose-100 uppercase">
              Kho &le; 10
            </span>
          </div>

          {data.lowStockProducts.length === 0 ? (
            <div className="py-12 text-center text-emerald-600 font-semibold font-body text-xs">
              🎉 Tất cả sản phẩm đều đủ hàng tồn kho!
            </div>
          ) : (
            <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto no-scrollbar font-body">
              {data.lowStockProducts.map((p) => (
                <div key={p._id} className="py-3 flex gap-3 first:pt-0 last:pb-0 items-center justify-between">
                  <div className="flex gap-2.5 items-center min-w-0">
                    <div className="h-9 w-9 overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-alt flex items-center justify-center shrink-0">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                      ) : (
                        <span className="material-symbols-outlined text-outline text-sm">image</span>
                      )}
                    </div>
                    <span className="line-clamp-1 text-xs font-bold text-on-surface">{p.name}</span>
                  </div>
                  <span className="text-xs font-mono font-extrabold text-rose-600 bg-rose-50 border border-rose-100 rounded-full px-2.5 py-0.5 shrink-0">
                    Còn {p.stock}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
