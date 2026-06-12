import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../components/layout/admin/MainLayout";
import DashboardPage from "../pages/admin/DashboardPage";
import ProductsPage from "../pages/admin/ProductsPage";
import CreateProductPage from "../pages/admin/CreateProductPage";
import EditProductPage from "../pages/admin/EditProductPage";
import OrdersPage from "../pages/admin/OrdersPage";
import OrderDetailsPage from "../pages/admin/OrderDetailsPage";
import UsersPage from "../pages/admin/UsersPage";
import UserDetailsPage from "../pages/admin/UserDetailsPage";
import ReviewsPage from "../pages/admin/ReviewsPage";

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
          path: "products/create",
          element: <CreateProductPage />,
        },
        {
          path: "products/:id/edit",
          element: <EditProductPage />,
        },
        {
          path: "orders",
          element: <OrdersPage />,
        },
        {
          path: "orders/:id",
          element: <OrderDetailsPage />,
        },
        {
          path: "users",
          element: <UsersPage />,
        },
        {
          path: "users/:id",
          element: <UserDetailsPage />,
        },
        {
          path: "reviews",
          element: <ReviewsPage />,
        },
      ],
    },
  ],
};

export default AdminRoutes;
