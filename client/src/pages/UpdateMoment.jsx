import { getAllCafeNames } from "../api/cafeApi";
import { getMomentById, updateMoment } from "../api/momentApi";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Coffee, Save, ArrowLeft } from "lucide-react";

const UpdateMoment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cafeId: "",
    totalPrice: "",
    imageUrl: "",
    description: "",
    dateTime: "",
  });
  const [cafes, setCafes] = useState([]);

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [momentRes, cafeRes] = await Promise.all([
          getMomentById(id),
          getAllCafeNames(),
        ]);

        const m = momentRes.data;
        setFormData({
          cafeId: m.cafeId?._id || "",
          totalPrice: m.totalPrice || "",
          imageUrl: m.imageUrl || "",
          description: m.description || "",
          dateTime: m.dateTime ? m.dateTime.slice(0, 16) : "",
        });

        setCafes(
          Array.isArray(cafeRes.data) ? cafeRes.data : cafeRes.data.data
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Không thể tải dữ liệu moment hoặc danh sách cafe");
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMoment(id, formData);
      toast.success("Cập nhật Moment thành công!");
    } catch (error) {
      console.error("Error updating moment:", error);
      toast.error("Cập nhật Moment thất bại!");
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
              Cập nhật Moment
            </span>
          </h2>
          <button
            onClick={() => navigate("/moment-manage")}
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
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Cafe */}
            <div>
              <label className="block text-stone-700 font-medium mb-2">
                Quán Cafe
              </label>
              <select
                name="cafeId"
                value={formData.cafeId}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                required
              >
                <option value="">-- Chọn quán cafe --</option>
                {cafes.map((cafe) => (
                  <option key={cafe._id} value={cafe._id}>
                    {cafe.name}
                  </option>
                ))}
              </select>
            </div>

            {/* DateTime */}
            <div>
              <label className="block text-stone-700 font-medium mb-2">
                Ngày giờ
              </label>
              <input
                type="datetime-local"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            {/* Total Price */}
            <div>
              <label className="block text-stone-700 font-medium mb-2">
                Tổng giá
              </label>
              <input
                type="number"
                name="totalPrice"
                value={formData.totalPrice}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-stone-700 font-medium mb-2">
                Hình ảnh
              </label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-stone-700 font-medium mb-2">
                Mô tả
              </label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-600 to-amber-800 text-white px-6 py-3 rounded-lg hover:opacity-90 flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <Save size={20} />
                <span>Cập nhật Moment</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateMoment;
