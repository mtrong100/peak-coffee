import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-10 pt-10 border-t border-gray-200">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pb-10">
        {/* Logo & giới thiệu */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-3 tracking-wide">
            My Coffee
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
            voluptatum quibusdam nesciunt mollitia.
          </p>
        </div>

        {/* Điều hướng */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Điều hướng
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-blue-600 hover:underline transition"
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                to="/cafe"
                className="hover:text-blue-600 hover:underline transition"
              >
                Cafe
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="hover:text-blue-600 hover:underline transition"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Liên hệ</h3>
          <ul className="text-sm space-y-2 text-gray-600">
            <li>📧 support@sybau.vn</li>
            <li>📞 1900 123 456</li>
            <li>🏢 TP.HCM, Việt Nam</li>
          </ul>
        </div>
      </div>

      {/* Line dưới cùng */}
      <div className="bg-gray-50 border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} My Coffee. Thiết kế bởi ChadSP
      </div>
    </footer>
  );
};

export default Footer;
