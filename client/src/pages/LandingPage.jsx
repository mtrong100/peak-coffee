import {
  Coffee,
  BookOpen,
  Camera,
  ChevronRight,
  Bookmark,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Coffee01 from "../assets/images/coffee_01.jpg";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const navigate = useNavigate();

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[url('https://i.postimg.cc/5NCP22P2/IMG-20250325-174109.jpg')] bg-cover bg-center h-[90vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/60 to-black/50"></div>

        {/* Floating coffee beans decoration */}
        <div className="absolute inset-0 opacity-20">
          <Coffee className="absolute top-1/4 left-1/4 w-16 h-16 text-amber-300 animate-float" />
          <Coffee className="absolute top-1/3 right-1/4 w-14 h-14 text-amber-300 animate-float-delay" />
          <Coffee className="absolute bottom-1/4 left-1/3 w-12 h-12 text-amber-300 animate-float" />
        </div>

        <div className="relative z-10 text-white max-w-5xl px-6">
          {/* Animated title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-amber-300 to-amber-200 bg-clip-text text-transparent">
              Lưu giữ từng khoảnh khắc cafe
            </span>
          </motion.h1>

          {/* Subtitle with animation */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-2xl text-amber-100 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Nơi bạn có thể lưu lại những quán cafe đã ghé, những ly đồ uống yêu
            thích và những câu chuyện thú vị.
          </motion.p>

          {/* Premium CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/moment")}
              className="group relative overflow-hidden bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 text-white px-10 py-4 rounded-xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              {/* Button shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

              {/* Button content */}
              <div className="relative z-10 flex items-center justify-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-full">
                  <Coffee className="w-6 h-6 text-amber-200 group-hover:text-white transition-colors" />
                </div>
                <span className="text-lg tracking-wide">Bắt đầu ngay</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronRight className="w-5 h-5 text-amber-200 group-hover:text-white transition-colors" />
                </motion.div>
              </div>
            </motion.button>

            {/* Secondary Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/cafe")}
              className="group flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-amber-100 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-amber-200/20 hover:border-amber-200/40 transition-all duration-300"
            >
              <MapPin className="w-5 h-5 text-amber-200 group-hover:text-white" />
              <span>Khám phá quán cafe</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-6 text-amber-100"
          >
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-300" />
              <span>10,000+ khoảnh khắc</span>
            </div>
            <div className="flex items-center gap-2">
              <Coffee className="w-5 h-5 text-amber-300" />
              <span>2,000+ quán cafe</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-amber-200"
        >
          <ChevronRight className="w-8 h-8 rotate-90" />
        </motion.div>
      </section>
      {/* About Section */}
      <section className="py-16 px-6 mx-auto text-center relative overflow-hidden">
        {/* Background gradient decor */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100 opacity-70 pointer-events-none"></div>

        {/* Decorative coffee icon in background */}
        <Coffee
          className="absolute -top-10 -left-10 w-32 h-32 text-amber-300 opacity-10 rotate-12"
          strokeWidth={1.5}
        />
        <Coffee
          className="absolute bottom-0 right-0 w-28 h-28 text-amber-400 opacity-10 -rotate-12"
          strokeWidth={1.5}
        />

        {/* Content with animation */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Icon */}
          <motion.div
            className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-400 shadow-lg mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Coffee className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
            Về <span className="text-amber-600">Cafe Moments</span>
          </h2>
          <p className="text-stone-600 max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
            Cafe Moments là nơi lưu trữ và chia sẻ những trải nghiệm cafe của
            bạn. Bạn có thể lưu lại thông tin quán, đồ uống, hình ảnh và cảm xúc
            cho từng lần ghé thăm, để mỗi khoảnh khắc đều được trân trọng và ghi
            nhớ.
          </p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-amber-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-700 to-amber-600 bg-clip-text text-transparent mb-4"
            >
              Trải nghiệm Cafe Độc Đáo
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-amber-900/80 max-w-3xl mx-auto"
            >
              Khám phá những tính năng giúp bạn lưu giữ mọi khoảnh khắc cafe
              tuyệt vời
            </motion.p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Coffee size={48} className="text-amber-100" />,
                title: "Lưu Quán Cafe Yêu Thích",
                desc: "Ghi lại mọi địa điểm cafe bạn đã ghé thăm với đầy đủ thông tin chi tiết",
                gradient: "bg-gradient-to-br from-amber-700/90 to-amber-600",
              },
              {
                icon: <Camera size={48} className="text-amber-100" />,
                title: "Chia Sẻ Khoảnh Khắc",
                desc: "Lưu giữ những bức ảnh đẹp nhất và cảm xúc của bạn tại mỗi quán cafe",
                gradient: "bg-gradient-to-br from-amber-600/90 to-amber-500",
              },
              {
                icon: <BookOpen size={48} className="text-amber-100" />,
                title: "Nhật Ký Cafe Cá Nhân",
                desc: "Sắp xếp và quản lý tất cả trải nghiệm cafe của bạn một cách dễ dàng",
                gradient: "bg-gradient-to-br from-amber-800/90 to-amber-700",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 ${feature.gradient} opacity-90`}
                ></div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 rotate-12">
                    <Coffee size={80} />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Icon Container */}
                  <div className="mb-6 p-4 bg-amber-900/30 rounded-full w-max backdrop-blur-sm">
                    {feature.icon}
                  </div>

                  {/* Text Content */}
                  <h3 className="text-xl font-bold text-amber-50 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-amber-100/90 mb-6 flex-grow">
                    {feature.desc}
                  </p>

                  {/* CTA Button */}
                  <button className="mt-auto w-full flex items-center justify-between px-4 py-3 bg-amber-900/30 hover:bg-amber-900/40 rounded-lg backdrop-blur-sm border border-amber-700/50 hover:border-amber-600 transition-all group/button">
                    <span className="text-amber-50 font-medium">Khám phá</span>
                    <div className="flex items-center">
                      <span className="w-6 h-0.5 bg-amber-300 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></span>
                      <ChevronRight className="w-5 h-5 text-amber-300 ml-1 group-hover/button:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Image with Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute -inset-2 bg-gradient-to-br from-amber-400/20 to-amber-600/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img
              src={Coffee01}
              alt="Cafe inspiration"
              className="relative z-10 w-full h-80 lg:h-96 object-cover rounded-xl shadow-xl group-hover:shadow-2xl transition-all duration-500"
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 to-transparent rounded-xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-700 to-amber-600 bg-clip-text text-transparent">
              Ghi lại những khoảnh khắc đáng nhớ
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed">
              Mỗi lần ghé một quán cafe là một câu chuyện mới. Hãy lưu giữ hình
              ảnh, cảm xúc và những ly đồ uống đặc biệt để sau này khi nhìn lại,
              bạn có thể mỉm cười nhớ về những kỷ niệm ngọt ngào.
            </p>

            {/* Premium Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/moment")}
              className="group relative overflow-hidden bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 text-white px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Animated Background Layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Top Shine Effect */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-300/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Button Content */}
              <div className="relative z-10 flex items-center justify-center gap-3">
                <div className="p-1 bg-amber-500/20 rounded-full">
                  <Coffee className="w-6 h-6 text-amber-200 group-hover:text-amber-100 transition-colors" />
                </div>
                <span className="text-lg tracking-wide">Khám phá ngay</span>
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: 5 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.5,
                  }}
                >
                  <ChevronRight className="w-5 h-5 text-amber-200 group-hover:text-amber-100 transition-colors" />
                </motion.div>
              </div>
            </motion.button>

            {/* Additional Info */}
            <div className="flex items-center gap-3 text-sm text-stone-500">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
                <span>Hơn 1000+ khoảnh khắc đã được lưu</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 text-white py-20 text-center relative overflow-hidden">
        {/* Coffee bean decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-amber-600 rounded-full mix-blend-overlay"></div>
          <div className="absolute bottom-1/3 right-1/5 w-20 h-20 bg-amber-500 rounded-full mix-blend-overlay"></div>
          <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-amber-400 rounded-full mix-blend-overlay"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-amber-50 drop-shadow-md">
            Sẵn sàng lưu giữ kỷ niệm cafe của bạn?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Chia sẻ những khoảnh khắc đáng nhớ cùng tách cafe yêu thích
          </p>
          <button
            onClick={() => navigate("/create-moment")}
            className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-amber-50 px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Coffee className="inline mr-3" size={22} />
            Tạo khoảng khắc mới
            <ChevronRight className="inline ml-2" size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
