import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <SideBar />

      <div className="flex-1 ml-[260px] flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
