import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Coffee,
  Search,
  ChevronDown,
  ChevronUp,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllCafes, deleteCafe } from "../api/cafeApi";
import Swal from "sweetalert2";

const CafeManage = () => {
  const navigate = useNavigate();

  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data từ API
  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const res = await getAllCafes();
        setCafes(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách cafe:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCafes();
  }, []);

  // Toggle sort
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  // Filter theo tên hoặc địa chỉ
  const filteredCafes = cafes.filter(
    (cafe) =>
      cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cafe.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort theo rating
  const sortedCafes = [...filteredCafes].sort((a, b) =>
    sortDirection === "asc" ? a.rating - b.rating : b.rating - a.rating
  );

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const fetchCafes = async () => {
    try {
      const res = await getAllCafes();
      setCafes(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách cafe:", err);
    }
  };

  useEffect(() => {
    fetchCafes();
  }, []);

  const handleDeleteCafe = (id) => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCafe(id);
          Swal.fire("Đã xóa!", "Quán cafe đã được xóa thành công.", "success");
          fetchCafes(); // reload danh sách
        } catch (err) {
          console.error("Lỗi khi xóa cafe:", err);
          Swal.fire("Lỗi!", "Không thể xóa quán cafe.", "error");
        }
      }
    });
  };

  return (
    <div className="p-6 bg-white min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Coffee className="text-amber-600 w-9 h-9" />
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
            Quản lý quán cafe
          </h1>
        </div>
        <button
          onClick={() => navigate("/create-cafe")}
          className="flex items-center gap-2 bg-amber-800 hover:bg-amber-700 text-white px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Plus size={18} className="text-amber-100" />
          <span className="font-medium">Thêm quán cafe</span>
        </button>
      </div>

      {/* Search + Sort */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-amber-500 w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc địa chỉ..."
            className="w-full pl-10 pr-4 py-2 md:py-3 border border-amber-300 rounded-xl bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent placeholder-amber-900/80 text-amber-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-amber-900">
          <span>Sắp xếp theo đánh giá:</span>
          <button
            onClick={toggleSortDirection}
            className="flex items-center gap-1 bg-gradient-to-b from-amber-100 to-amber-50 hover:from-amber-200 hover:to-amber-100 px-3 py-2 rounded-lg shadow-inner transition-all duration-200 border border-amber-200"
          >
            {sortDirection === "asc" ? (
              <>
                <span>Thấp đến cao</span>
                <ChevronUp size={16} />
              </>
            ) : (
              <>
                <span>Cao đến thấp</span>
                <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-amber-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-amber-100">
            <thead className="bg-gradient-to-r from-amber-600 to-amber-800">
              <tr>
                {[
                  "Tên quán",
                  "Hình ảnh",
                  "Địa chỉ",
                  "Mô tả",
                  "Đánh giá",
                  "Hành động",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-amber-100">
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-stone-500">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : sortedCafes.length > 0 ? (
                sortedCafes.map((cafe, index) => (
                  <tr
                    key={cafe._id || index}
                    className="hover:bg-amber-50/50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-stone-900 min-w-[180px]">
                      {cafe.name}
                    </td>
                    <td className="px-6 py-4">
                      {cafe.imageUrl && (
                        <div className="w-50 h-auto rounded-lg overflow-hidden shadow-sm border border-stone-200">
                          <img
                            src={cafe.imageUrl}
                            alt={cafe.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600 max-w-xs min-w-xs">
                      {cafe.address}
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600 max-w-xs min-w-xs">
                      {cafe.description}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-amber-600 font-medium">
                          {cafe.rating}
                        </span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={
                                i < Math.floor(cafe.rating)
                                  ? "text-amber-500 fill-amber-500"
                                  : "text-stone-300"
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => navigate(`/update-cafe/${cafe._id}`)}
                          className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 hover:scale-105 transition-all duration-200"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteCafe(cafe._id)}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:scale-105 transition-all duration-200"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-stone-500">
                    Không tìm thấy quán cafe
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CafeManage;
