import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Coffee,
  Camera,
  Home,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar() {
  const { pathname } = useLocation();

  const links = [
    {
      name: "Trang chủ",
      path: "/",
      icon: <Home size={20} />,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Khoảng khắc",
      path: "/moment-manage",
      icon: <Camera size={20} />,
    },
    {
      name: "Quán Cafe",
      path: "/cafe-manage",
      icon: <Coffee size={20} />,
    },
  ];

  return (
    <aside className="w-full md:w-64 bg-gradient-to-b from-amber-900 to-amber-800 text-amber-50 p-4 md:min-h-screen shadow-lg border-r border-amber-700">
      {/* Logo/Header */}
      <div className="mb-8 p-4 border-b border-amber-700">
        <div className="flex items-center gap-3">
          <Coffee className="w-8 h-8 text-amber-300" />
          <div>
            <h2 className="text-xl font-bold text-amber-50">Cafe Admin</h2>
            <p className="text-xs text-amber-200">Quản lý hệ thống</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`relative flex items-center justify-between gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              pathname === link.path
                ? "bg-amber-700 text-amber-50 shadow-inner"
                : "text-amber-200 hover:bg-amber-700/50 hover:text-amber-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`${
                  pathname === link.path ? "text-amber-300" : "text-amber-400"
                }`}
              >
                {link.icon}
              </span>
              <span>{link.name}</span>
            </div>

            {pathname === link.path && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-amber-300"
              >
                <ChevronRight size={18} />
              </motion.div>
            )}
          </Link>
        ))}
      </nav>

      {/* User/Footer */}
      <div className="mt-auto pt-6 border-t border-amber-700">
        <div className="flex items-center gap-3 px-4 py-3 text-amber-200 hover:text-amber-50 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-amber-50">
            <User size={16} />
          </div>
          <div>
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-amber-300">Quản trị viên</p>
          </div>
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-amber-200 hover:text-amber-50 rounded-lg hover:bg-amber-700/50 transition-colors">
          <LogOut size={18} className="text-amber-400" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}
