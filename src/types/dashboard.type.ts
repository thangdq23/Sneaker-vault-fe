export interface DashboardOverview {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
}

export interface DashboardPeriodRevenue {
  currentRevenue: number;
}

export interface DashboardChartPoint {
  label: string;
  revenue: number;
}

export interface DashboardOrderStatuses {
  pending: number;
  confirmed: number;
  shipping: number;
  delivered: number;
  cancelled: number;
}

export interface DashboardTopProduct {
  productId: string;
  name: string;
  image: string;
  quantitySold: number;
  revenue: number;
}

export interface DashboardRecentOrder {
  _id: string;
  orderCode: string;
  customerName: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export interface DashboardLowStockProduct {
  _id: string;
  name: string;
  image: string;
  stock: number;
}

export interface DashboardData {
  overview: DashboardOverview;
  periodRevenue: DashboardPeriodRevenue;
  chartData: DashboardChartPoint[];
  orderStatuses: DashboardOrderStatuses;
  topProducts: DashboardTopProduct[];
  recentOrders: DashboardRecentOrder[];
  lowStockProducts: DashboardLowStockProduct[];
}
