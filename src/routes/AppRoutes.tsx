import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../components/layout/client/MainLayout";
import HomePage from "../pages/home/HomePage";
import ShopPage from "../pages/shop/ShopPage";

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
    ],
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
