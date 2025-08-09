import React, { useEffect, useState } from "react";
import { Coffee, Save, ArrowLeft, ImagePlus, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createCafe } from "../api/cafeApi";
import { toast } from "react-hot-toast";

const CreateCafe = () => {
  const navigate = useNavigate();

  // State lưu form
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    imageUrl: "",
    rating: "",
  });

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createCafe(formData);
      if (res) toast.success("Thêm quán cafe thành công");
    } catch (error) {
      console.error("Lỗi khi tạo quán cafe:", error);
      alert("Không thể thêm quán cafe. Vui lòng thử lại!");
    } finally {
      setFormData({
        name: "",
        description: "",
        address: "",
        imageUrl: "",
        rating: "",
      });
    }
  };

  return (
    <section className="bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-stone-800 flex items-center gap-3">
            <Coffee className="text-amber-600 w-8 h-8" />
            <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
              Thêm quán cafe mới
            </span>
          </h2>
          <button
            onClick={() => navigate("/cafe-manage")}
            type="button"
            className="flex items-center gap-2 text-stone-600 hover:text-amber-700 transition-colors duration-200 group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform duration-200"
            />
            <span className="font-medium">Quay lại</span>
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-stone-700 font-medium">
                  Tên quán cafe
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Nhập tên quán"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Coffee className="text-stone-400 w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <label className="block text-stone-700 font-medium flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500" />
                  Đánh giá
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    min={0}
                    max={5}
                    step={0.1}
                    className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="0 - 5"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-stone-400 text-sm">/5</span>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-stone-700 font-medium flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  Địa chỉ
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Nhập địa chỉ đầy đủ"
                  required
                />
              </div>

              {/* Image URL */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-stone-700 font-medium flex items-center gap-1">
                  <ImagePlus className="w-4 h-4 text-amber-500" />
                  Hình ảnh
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-stone-700 font-medium">
                  Mô tả quán
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Không gian, phong cách, menu..."
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end pt-4 border-t border-stone-100">
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-600 to-amber-800 text-white px-6 py-3 rounded-lg hover:opacity-90 flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <Save size={20} />
                <span className="font-medium">Lưu quán cafe</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateCafe;
