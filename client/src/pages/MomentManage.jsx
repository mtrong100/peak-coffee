import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  ChevronDown,
  ChevronUp,
  Coffee,
  Eye,
  Calendar,
  Clock,
  Wallet,
  Bean,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getAllMoments, deleteMoment } from "../api/momentApi";
import { formatCurrencyVND } from "../utils/formatCurrency";
import { formatDateTime } from "../utils/formatDateTime";
import MomentModal from "../components/MomentModal";

const MomentManage = () => {
  const navigate = useNavigate();
  const [moments, setMoments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortOption, setSortOption] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMoment, setSelectedMoment] = useState(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);

  // Fix scroll bug
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleViewMoment = (m) => {
    setSelectedMoment(m);
    setIsModalOpen(true);
  };

  const fetchMoments = async () => {
    try {
      let sortParam = "desc";
      if (sortOption === "lowToHigh") sortParam = "priceAsc";
      if (sortOption === "highToLow") sortParam = "priceDesc";
      if (sortOption === "oldest") sortParam = "asc";

      const res = await getAllMoments({
        page,
        limit,
        sort: sortParam,
        search: searchQuery,
      });
      setMoments(res.data.data || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách moments:", err);
      setMoments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoments();
  }, [page, sortDirection, searchQuery]);

  const totalPages = Math.ceil(total / limit);

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleDeleteMoment = (id) => {
    Swal.fire({
      title: "Xác nhận xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      background: "#fff8f0",
      backdrop: `
        rgba(253, 230, 208, 0.4)
      `,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteMoment(id);
          Swal.fire({
            title: "Đã xóa!",
            text: "Moment đã được xóa thành công.",
            icon: "success",
            background: "#fff8f0",
          });
          fetchMoments();
        } catch (err) {
          console.error("Lỗi khi xóa moment:", err);
          Swal.fire({
            title: "Lỗi!",
            text: "Không thể xóa moment.",
            icon: "error",
            background: "#fff8f0",
          });
        }
      }
    });
  };

  const filteredMoments = Array.isArray(moments)
    ? moments.filter(
        (moment) =>
          moment.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          moment.cafeId?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const sortedMoments = [...moments].sort((a, b) => {
    if (sortOption === "lowToHigh") return a.totalPrice - b.totalPrice;
    if (sortOption === "highToLow") return b.totalPrice - a.totalPrice;
    if (sortOption === "newest")
      return new Date(b.dateTime) - new Date(a.dateTime);
    if (sortOption === "oldest")
      return new Date(a.dateTime) - new Date(b.dateTime);
    return 0;
  });

  return (
    <div className="p-4 md:p-6 bg-white min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl shadow-md">
            <Coffee className="text-amber-50 w-7 h-7" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
            Quản lý khoảnh khắc
          </h1>
        </div>
        <button
          onClick={() => navigate("/create-moment")}
          className="flex items-center gap-2 bg-amber-800 hover:bg-amber-700 text-white px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Plus size={18} className="text-amber-100" />
          <span className="font-medium">Thêm khoảnh khắc</span>
        </button>
      </div>

      {/* Search + Sort */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-amber-700 w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo quán cafe hoặc mô tả..."
            className="w-full pl-10 pr-4 py-2 md:py-3 border border-amber-300 rounded-xl bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent placeholder-amber-900/80 text-amber-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-amber-900 font-medium">Sắp xếp:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg bg-white shadow-md focus:ring-2 focus:ring-amber-600 focus:border-transparent text-amber-900"
          >
            <option value="lowToHigh">Giá tiền: Thấp → Cao</option>
            <option value="highToLow">Giá tiền: Cao → Thấp</option>
            <option value="newest">Ngày thêm: Mới nhất</option>
            <option value="oldest">Ngày thêm: Cũ nhất</option>
          </select>
        </div>
      </div>
      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-amber-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-amber-100">
            <thead className="bg-gradient-to-r from-amber-600 to-amber-800">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-amber-50 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <span>Quán Cafe</span>
                  </div>
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-amber-50 uppercase tracking-wider">
                  Hình ảnh
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-amber-50 uppercase tracking-wider">
                  Mô tả
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-amber-50 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <span>Tổng giá</span>
                  </div>
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-amber-50 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <span>Ngày giờ</span>
                  </div>
                </th>

                <th className="px-4 md:px-6 py-3 text-right text-xs md:text-sm font-semibold text-amber-50 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-amber-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-amber-800">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-600"></div>
                    </div>
                  </td>
                </tr>
              ) : sortedMoments.length > 0 ? (
                sortedMoments.map((moment) => (
                  <tr
                    key={moment._id}
                    className="hover:bg-amber-50/50 transition-colors duration-150"
                  >
                    <td className="px-4 md:px-6 py-4 font-medium text-amber-900">
                      <div className="flex items-center gap-2 min-w-[180px]">
                        {moment.cafeId?.name}
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      {moment.imageUrl && (
                        <div className="w-50 h-auto rounded-lg overflow-hidden border border-amber-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                          <img
                            src={moment.imageUrl}
                            alt="Moment"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-amber-800 min-w-xs max-w-xs">
                      {moment.description}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-center gap-1 bg-amber-100 px-3 py-1 rounded-full w-fit">
                        <span className="text-amber-800 font-semibold">
                          {formatCurrencyVND(moment.totalPrice)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-amber-800">
                      <div className="flex items-center gap-1 min-w-[180px]">
                        <span>{formatDateTime(moment.dateTime)}</span>
                      </div>
                    </td>

                    <td className="px-4 md:px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 md:gap-2">
                        <button
                          onClick={() => handleViewMoment(moment)}
                          className="p-1 md:p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200 hover:scale-110"
                          title="Xem chi tiết"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/update-moment/${moment._id}`)
                          }
                          className="p-1 md:p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 hover:scale-110 transition-all"
                          title="Sửa"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteMoment(moment._id)}
                          className="p-1 md:p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:scale-110 transition-all"
                          title="Xóa"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-amber-800">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Coffee size={32} className="text-amber-600" />
                      <span>Không tìm thấy moment nào</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="flex items-center gap-1 px-3 py-2 rounded-lg border border-amber-300 text-amber-800 hover:bg-amber-100 disabled:opacity-50 transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Trước</span>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-2 rounded-lg border ${
                page === p
                  ? "bg-gradient-to-b from-amber-600 to-amber-700 text-white border-amber-600 shadow-inner"
                  : "border-amber-300 text-amber-800 hover:bg-amber-100"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="flex items-center gap-1 px-3 py-2 rounded-lg border border-amber-300 text-amber-800 hover:bg-amber-100 disabled:opacity-50 transition-colors"
          >
            <span className="hidden sm:inline">Sau</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Modal */}
      <MomentModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMoment(null);
        }}
        moment={selectedMoment}
      />
    </div>
  );
};

export default MomentManage;
