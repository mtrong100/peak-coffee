import { Coffee, BookOpen, Camera, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Coffee01 from "../assets/images/coffee_01.jpg";
import { useEffect } from "react";

export default function LandingPage() {
  const navigate = useNavigate();

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[url('https://i.postimg.cc/5NCP22P2/IMG-20250325-174109.jpg')] bg-cover bg-center h-[80vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-white max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Lưu giữ từng khoảnh khắc cafe
          </h1>
          <p className="mb-6 text-lg text-gray-200">
            Nơi bạn có thể lưu lại những quán cafe đã ghé, những ly đồ uống yêu
            thích và những câu chuyện thú vị.
          </p>
          <button
            onClick={() => alert("LIGMA BALLS")}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Bắt đầu ngay
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-stone-800 mb-4">
          Về Cafe Moments
        </h2>
        <p className="text-stone-600 max-w-3xl mx-auto">
          Cafe Moments là nơi lưu trữ và chia sẻ những trải nghiệm cafe của bạn.
          Bạn có thể lưu lại thông tin quán, đồ uống, hình ảnh và cảm xúc cho
          từng lần ghé thăm.
        </p>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: <Coffee className="w-10 h-10 text-amber-600" />,
              title: "Lưu quán cafe",
              desc: "Ghi nhớ mọi quán cafe bạn đã từng ghé.",
            },
            {
              icon: <Camera className="w-10 h-10 text-amber-600" />,
              title: "Chụp khoảnh khắc",
              desc: "Lưu giữ hình ảnh và cảm xúc của bạn.",
            },
            {
              icon: <BookOpen className="w-10 h-10 text-amber-600" />,
              title: "Quản lý dễ dàng",
              desc: "Xem lại và sắp xếp mọi kỷ niệm cafe.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="p-6 bg-stone-50 rounded-xl shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-stone-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Ảnh minh họa */}
          <div className="relative">
            <img
              src={Coffee01}
              alt="Cafe inspiration"
              className="w-full h-80 object-cover rounded-xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl" />
          </div>

          {/* Nội dung */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-stone-800">
              Ghi lại những khoảnh khắc đáng nhớ
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Mỗi lần ghé một quán cafe là một câu chuyện mới. Hãy lưu giữ hình
              ảnh, cảm xúc và những ly đồ uống đặc biệt để sau này khi nhìn lại,
              bạn có thể mỉm cười nhớ về những kỷ niệm ngọt ngào.
            </p>
            <button
              onClick={() => navigate("/moment")}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
            >
              Xem ngay
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-600 text-white py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Sẵn sàng lưu giữ kỷ niệm cafe của bạn?
        </h2>
        <button
          onClick={() => navigate("/create-moment")}
          className="bg-white text-amber-700 px-6 py-3 rounded-lg font-medium hover:bg-stone-100 transition-colors"
        >
          Thêm khoảng khắc mới
        </button>
      </section>
    </div>
  );
}
