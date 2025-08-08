import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
// import Sidebar or DashboardHeader nếu có

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
