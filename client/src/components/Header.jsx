import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Coffee,
  Home,
  BookOpenText,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Trang chủ", to: "/", icon: <Home size={18} /> },
    { label: "Moment", to: "/moment", icon: <BookOpenText size={18} /> },
    { label: "Cafe", to: "/cafe", icon: <Coffee size={18} /> },
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="flex items-center text-2xl font-bold tracking-wide"
            >
              <Coffee className="text-amber-700 mr-2" size={24} />
              <span className="bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                My Coffee
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                className={`
                  px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2
                  ${
                    location.pathname === link.to
                      ? "bg-amber-100 text-amber-900"
                      : "text-amber-800 hover:bg-amber-50 hover:text-amber-900"
                  } transition-colors duration-200
                `}
              >
                <span className="text-amber-600">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-amber-700 hover:text-amber-900 hover:bg-amber-100 focus:outline-none transition duration-150 ease-in-out"
              aria-label="Main menu"
            >
              {isOpen ? (
                <X size={24} className="block" />
              ) : (
                <Menu size={24} className="block" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-amber-50 border-t border-amber-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`
                  group flex items-center px-3 py-2 rounded-md text-base font-medium
                  ${
                    window.location.pathname === link.to
                      ? "bg-amber-700 text-white"
                      : "text-amber-800 hover:bg-amber-200 hover:text-amber-900"
                  } transition-colors duration-200
                `}
              >
                <span
                  className={`mr-3 ${
                    window.location.pathname === link.to
                      ? "text-amber-100"
                      : "text-amber-600"
                  }`}
                >
                  {link.icon}
                </span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
