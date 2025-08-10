import React, { useEffect, useState } from "react";
import {
  Coffee,
  Save,
  ArrowLeft,
  ImagePlus,
  Calendar,
  FileText,
  Plus,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllCafeNames } from "../api/cafeApi";
import { createMoment } from "../api/momentApi";
import toast from "react-hot-toast";

const formatNumber = (value) => {
  if (!value) return "";
  const num = Number(value.toString().replace(/\D/g, ""));
  return num.toLocaleString("en-US");
};

const parseNumber = (value) => {
  return value ? Number(value.toString().replace(/\D/g, "")) : "";
};

export default function CreateMoment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cafeId: "",
    selectedDrinks: [{ drinkName: "", price: "", quantity: "" }],
    totalPrice: "",
    imageUrl: "",
    description: "",
    dateTime: "",
  });
  const [cafes, setCafes] = useState([]);

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Lấy danh sách cafe
  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const res = await getAllCafeNames();
        setCafes(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách cafe:", err);
      }
    };
    fetchCafes();
  }, []);

  // Thay đổi input chung
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "totalPrice") {
      setFormData((prev) => ({
        ...prev,
        [name]: formatNumber(value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Thay đổi đồ uống
  const handleDrinkChange = (index, field, value) => {
    const updatedDrinks = [...formData.selectedDrinks];
    if (field === "price") {
      updatedDrinks[index][field] = formatNumber(value);
    } else if (field === "quantity") {
      updatedDrinks[index][field] = value.replace(/\D/g, "");
    } else {
      updatedDrinks[index][field] = value;
    }
    setFormData((prev) => ({ ...prev, selectedDrinks: updatedDrinks }));
  };

  // Thêm đồ uống
  const addDrink = () => {
    setFormData((prev) => ({
      ...prev,
      selectedDrinks: [
        ...prev.selectedDrinks,
        { drinkName: "", price: "", quantity: "" },
      ],
    }));
  };

  // Xóa đồ uống
  const removeDrink = (index) => {
    setFormData((prev) => ({
      ...prev,
      selectedDrinks: prev.selectedDrinks.filter((_, i) => i !== index),
    }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        totalPrice: parseNumber(formData.totalPrice),
        selectedDrinks: formData.selectedDrinks.map((d) => ({
          ...d,
          price: parseNumber(d.price),
          quantity: Number(d.quantity) || 0,
        })),
      };
      await createMoment(payload);
      toast.success("Tạo thành công");
      navigate("/moment-manage");
    } catch (err) {
      console.error("Lỗi khi tạo moment:", err);
      toast.error("Tạo không thành công");
    }
  };

  return (
    <section className="bg-stone-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-3xl font-bold flex items-center gap-3">
            <Coffee className="text-amber-600 w-8 h-8" />
            <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
              Thêm khoảnh khắc
            </span>
          </h2>
          <button
            onClick={() => navigate("/moment-manage")}
            type="button"
            className="flex items-center gap-2 text-stone-600 hover:text-amber-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Quay lại</span>
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            {/* Cafe dropdown */}
            <div className="space-y-2">
              <label className="block text-stone-700 font-medium">
                Chọn quán cafe
              </label>
              <select
                name="cafeId"
                value={formData.cafeId}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                required
              >
                <option value="">-- Chọn quán --</option>
                {cafes.map((cafe) => (
                  <option key={cafe._id} value={cafe._id}>
                    {cafe.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Selected drinks */}
            <div className="space-y-3">
              <label className="block text-stone-700 font-medium">
                Đồ uống đã chọn
              </label>
              {formData.selectedDrinks.map((drink, index) => (
                <div
                  key={index}
                  className="grid md:grid-cols-4 gap-3 items-center"
                >
                  <input
                    type="text"
                    placeholder="Tên đồ uống"
                    value={drink.drinkName}
                    onChange={(e) =>
                      handleDrinkChange(index, "drinkName", e.target.value)
                    }
                    className=" px-4 py-2 border border-stone-200 rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Giá"
                    value={drink.price}
                    onChange={(e) =>
                      handleDrinkChange(index, "price", e.target.value)
                    }
                    className=" px-4 py-2 border border-stone-200 rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Số lượng"
                    value={drink.quantity}
                    onChange={(e) =>
                      handleDrinkChange(index, "quantity", e.target.value)
                    }
                    className=" px-4 py-2 border border-stone-200 rounded-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeDrink(index)}
                    className=" p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addDrink}
                className="flex items-center gap-2 text-amber-600 hover:text-amber-800 font-medium"
              >
                <Plus size={18} /> Thêm đồ uống
              </button>
            </div>

            {/* Total price */}
            <div className="space-y-2">
              <label className="block text-stone-700 font-medium">
                Tổng giá
              </label>
              <input
                type="text"
                name="totalPrice"
                value={formData.totalPrice}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-200 rounded-lg"
                required
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label className="block text-stone-700 font-medium flex items-center gap-1">
                <ImagePlus className="w-4 h-4 text-amber-500" /> Hình ảnh
              </label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-stone-200 rounded-lg"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-stone-700 font-medium flex items-center gap-1">
                <FileText className="w-4 h-4 text-amber-500" /> Mô tả
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-stone-200 rounded-lg"
              />
            </div>

            {/* DateTime */}
            <div className="space-y-2">
              <label className="block text-stone-700 font-medium flex items-center gap-1">
                <Calendar className="w-4 h-4 text-amber-500" /> Ngày giờ
              </label>
              <input
                type="datetime-local"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-200 rounded-lg"
                required
              />
            </div>

            {/* Submit */}
            <div className="flex md:justify-end pt-4 border-t border-stone-100">
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-600 to-amber-800 text-white px-6 py-3 rounded-lg hover:opacity-90 flex items-center gap-2 shadow-md hover:shadow-lg transition w-full justify-center md:w-auto"
              >
                <Save size={20} />
                <span className="font-medium">Lưu</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
