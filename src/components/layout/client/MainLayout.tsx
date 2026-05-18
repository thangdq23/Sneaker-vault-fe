import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

const MainLayout = (): React.JSX.Element => {
  return (
    <div className="bg-background text-on-background font-body selection:bg-primary/10 selection:text-primary">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
