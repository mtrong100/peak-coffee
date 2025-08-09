import { Link } from "react-router-dom";
import {
  Coffee,
  Home,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-amber-800 text-amber-50 pt-12 border-t border-amber-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
        {/* Logo & giới thiệu */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Coffee className="text-amber-300" size={28} />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent">
              My Coffee
            </h2>
          </div>
          <p className="text-amber-200 leading-relaxed">
            Khám phá thế giới cafe đặc sản với không gian ấm cúng và hương vị
            tuyệt hảo.
          </p>
          <div className="flex items-center gap-2 text-amber-300">
            <Clock size={16} />
            <span className="text-sm text-amber-200">
              Mở cửa: 7:00 - 22:00 hàng ngày
            </span>
          </div>
        </div>

        {/* Điều hướng */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-amber-100 flex items-center gap-2">
            Điều hướng
          </h3>
          <ul className="space-y-3">
            {[
              { label: "Trang chủ", to: "/" },
              { label: "Cafe", to: "/cafe" },
              { label: "Blog", to: "/moment" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to={item.to}
                  className="flex items-center gap-2 text-amber-200 hover:text-amber-50 transition-colors group"
                >
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-amber-100">Liên hệ</h3>
          <ul className="space-y-3 text-amber-200">
            <li className="flex items-center gap-2 hover:text-amber-50 transition-colors">
              <Mail size={16} className="text-amber-300" />
              <a href="mailto:support@mycoffee.vn">support@mycoffee.vn</a>
            </li>
            <li className="flex items-center gap-2 hover:text-amber-50 transition-colors">
              <Phone size={16} className="text-amber-300" />
              <a href="tel:1900123456">1900 123 456</a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-amber-300" />
              <span>TP.HCM, Việt Nam</span>
            </li>
          </ul>
        </div>

        {/* Mạng xã hội */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-amber-100">Kết nối</h3>
          <div className="flex gap-4">
            {[
              { name: "Facebook", icon: <Facebook size={20} /> },
              { name: "Instagram", icon: <Instagram size={20} /> },
              { name: "Twitter", icon: <Twitter size={20} /> },
              { name: "Youtube", icon: <Youtube size={20} /> },
            ].map((social, index) => (
              <a
                key={index}
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-amber-800 hover:bg-amber-700 rounded-full text-amber-300 hover:text-amber-200 transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-amber-950/50 border-t border-amber-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-amber-400">
          © {new Date().getFullYear()} My Coffee. Bản quyền thuộc về{" "}
          <span className="text-amber-300">ChadSP</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
