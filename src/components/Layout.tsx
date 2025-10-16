import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 overflow-auto px-6 py-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
