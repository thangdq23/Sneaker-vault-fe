import MainLayout from "../components/layout/client/MainLayout";
import CartPage from "../pages/cart/CartPage";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import HomePage from "../pages/home/HomePage";
import ProductDetailPage from "../pages/product/ProductDetailPage";
import ProfilePage from "../pages/profile/ProfilePage";
import ShopPage from "../pages/shop/ShopPage";
import VnPayReturnPage from "../pages/payment/VnPayReturnPage";

const ClientRoutes = {
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
    {
      path: "payment/vnpay-return",
      element: <VnPayReturnPage />,
    },
    {
      path: "profile",
      element: <ProfilePage />,
    },
  ],
};

export default ClientRoutes;