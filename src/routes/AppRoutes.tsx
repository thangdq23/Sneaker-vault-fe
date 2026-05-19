import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../components/layout/client/MainLayout";
import HomePage from "../pages/home/HomePage";
import ShopPage from "../pages/shop/ShopPage";
import CartPage from "../pages/cart/CartPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

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
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
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
