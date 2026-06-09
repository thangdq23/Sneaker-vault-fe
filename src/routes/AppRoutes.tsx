import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import NotFoundPage from "./NotFoundPage";
import ClientRoutes from "./ClientRoutes";
import AdminRoutes from "./AdminRoutes";

const routes = createBrowserRouter([
  ClientRoutes,
  AdminRoutes,
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
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
