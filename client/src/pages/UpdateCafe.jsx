import React, { useEffect, useState } from "react";
import { Coffee, Save, ArrowLeft, ImagePlus, MapPin, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getCafeById, updateCafe } from "../api/cafeApi";
import toast from "react-hot-toast";

const UpdateCafe = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    imageUrl: "",
    rating: "",
  });

  const [loading, setLoading] = useState(true);

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Lấy dữ liệu cafe hiện tại
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCafeById(id);
        setFormData(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy cafe:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCafe(id, formData);
      toast.success("Cập nhật thành công");
      navigate("/cafe-manage");
    } catch (err) {
      console.error("Lỗi khi cập nhật cafe:", err);
      toast.error("Cập nhật không thành công");
    }
  };

  if (loading) return <div className="p-6">Đang tải dữ liệu...</div>;

  return (
    <section className="bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-stone-800 flex items-center gap-3">
            <Coffee className="text-amber-600 w-8 h-8" />
            <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
              Cập nhật quán cafe
            </span>
          </h2>
          <button
            onClick={() => navigate("/cafe-manage")}
            type="button"
            className="flex items-center gap-2 text-stone-600 hover:text-amber-700"
          >
            <ArrowLeft size={20} />
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
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <label className="block text-stone-700 font-medium flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500" /> Đánh giá
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min={0}
                  max={5}
                  step={0.1}
                  className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              {/* Address */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-stone-700 font-medium flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-amber-500" /> Địa chỉ
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              {/* Image URL */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-stone-700 font-medium flex items-center gap-1">
                  <ImagePlus className="w-4 h-4 text-amber-500" /> Hình ảnh
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500"
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
                  className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end pt-4 border-t border-stone-100">
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-600 to-amber-800 text-white px-6 py-3 rounded-lg hover:opacity-90 flex items-center gap-2 shadow-md hover:shadow-lg transition"
              >
                <Save size={20} />
                <span className="font-medium">Cập nhật quán cafe</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateCafe;
