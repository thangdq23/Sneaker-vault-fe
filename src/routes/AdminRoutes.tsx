import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../components/layout/admin/MainLayout";
import DashboardPage from "../pages/admin/DashboardPage";
import ProductsPage from "../pages/admin/ProductsPage";
import OrdersPage from "../pages/admin/OrdersPage";
import UsersPage from "../pages/admin/UsersPage";

const AdminRoutes = {
  path: "/admin",
  element: <ProtectedRoute allowedRoles={["admin"]} />,
  children: [
    {
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <DashboardPage />,
        },
        {
          path: "products",
          element: <ProductsPage />,
        },
        {
          path: "orders",
          element: <OrdersPage />,
        },
        {
          path: "users",
          element: <UsersPage />,
        },
      ],
    },
  ],
};

export default AdminRoutes;
