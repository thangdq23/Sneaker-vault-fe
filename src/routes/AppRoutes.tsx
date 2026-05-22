import { Link, createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../components/layout/client/MainLayout";
import HomePage from "../pages/home/HomePage";
import ShopPage from "../pages/shop/ShopPage";
import ProductDetailPage from "../pages/product/ProductDetailPage";
import CartPage from "../pages/cart/CartPage";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const NotFoundPage = () => (
  <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-margin-mobile py-24 text-center md:px-margin-desktop">
    <h1 className="section-title text-primary">Không tìm thấy trang</h1>
    <p className="section-desc mx-auto">
      Trang bạn truy cập không tồn tại hoặc đã được di chuyển.
    </p>
    <Link to="/" className="btn btn-primary btn-pill">
      Về trang chủ
    </Link>
  </main>
);

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const AppRoutes = (): React.JSX.Element => {
  return <RouterProvider router={routes} />;
};

export default AppRoutes;
