import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Trang chủ", to: "/" },
    { label: "Cafe", to: "/cafe" },
    { label: "Dashboard", to: "/dashboard" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 tracking-wide">
          My Coffee
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.to}
              className="text-lg hover:text-blue-600 text-gray-700 transition font-semibold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 text-xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="text-sm hover:text-blue-600 text-gray-700 transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
