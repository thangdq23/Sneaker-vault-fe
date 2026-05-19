import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../components/layout/client/MainLayout";
import HomePage from "../pages/home/HomePage";
import ShopPage from "../pages/shop/ShopPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import CartPage from "../pages/cart/CartPage";

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
        path: "cart",
        element: <CartPage />,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },

  // Not Found
  {
    path: "*",
    element: <h1>404 - Not Found</h1>,
  },
]);

const AppRoutes = (): React.JSX.Element => {
  return <RouterProvider router={routes} />;
};

export default AppRoutes;
