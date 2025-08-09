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
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMoment, setSelectedMoment] = useState(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleViewMoment = (m) => {
    setSelectedMoment(m);
    setIsModalOpen(true);
  };

  const fetchMoments = async () => {
    try {
      const res = await getAllMoments({
        page,
        limit,
        sort: sortDirection,
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteMoment(id);
          Swal.fire("Đã xóa!", "Moment đã được xóa thành công.", "success");
          fetchMoments();
        } catch (err) {
          console.error("Lỗi khi xóa moment:", err);
          Swal.fire("Lỗi!", "Không thể xóa moment.", "error");
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

  const sortedMoments = [...filteredMoments].sort((a, b) =>
    sortDirection === "asc"
      ? a.totalPrice - b.totalPrice
      : b.totalPrice - a.totalPrice
  );

  return (
    <div className="p-6 bg-stone-50 min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Coffee className="text-amber-600 w-8 h-8" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
            Quản lý khoảng khắc
          </h1>
        </div>
        <button
          onClick={() => navigate("/create-moment")}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-800 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:opacity-90"
        >
          <Plus size={20} />
          <span className="font-medium">Thêm khoảng khắc</span>
        </button>
      </div>

      {/* Search + Sort */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-stone-400 w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo quán cafe hoặc mô tả..."
            className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-stone-600">
          <span>Sắp xếp theo tổng giá:</span>
          <button
            onClick={toggleSortDirection}
            className="flex items-center gap-1 bg-stone-100 hover:bg-stone-200 px-3 py-2 rounded-lg transition-colors duration-200"
          >
            {sortDirection === "asc" ? (
              <>
                <span>Thấp → Cao</span>
                <ChevronUp size={16} />
              </>
            ) : (
              <>
                <span>Cao → Thấp</span>
                <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-stone-200">
            <thead className="bg-gradient-to-r from-amber-600 to-amber-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Quán Cafe
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Mô tả
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Tổng giá
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Ngày giờ
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Hình ảnh
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-stone-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-stone-500">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : sortedMoments.length > 0 ? (
                sortedMoments.map((moment) => (
                  <tr
                    key={moment._id}
                    className="hover:bg-stone-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4  font-medium text-stone-900">
                      {moment.cafeId?.name}
                    </td>
                    <td className="px-6 py-4  text-stone-600 max-w-xs truncate">
                      {moment.description}
                    </td>
                    <td className="px-6 py-4  text-amber-600 font-semibold">
                      {formatCurrencyVND(moment.totalPrice)}
                    </td>
                    <td className="px-6 py-4  text-stone-600">
                      {formatDateTime(moment.dateTime)}
                    </td>
                    <td className="px-6 py-4">
                      {moment.imageUrl && (
                        <div className="w-20 h-20 rounded-lg overflow-hidden border border-stone-200">
                          <img
                            src={moment.imageUrl}
                            alt="Moment"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleViewMoment(moment)}
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
                          title="Xem chi tiết"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/update-moment/${moment._id}`)
                          }
                          className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100"
                          title="Sửa"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteMoment(moment._id)}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                          title="Xóa"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-stone-500">
                    Không tìm thấy moment nào
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
            className="px-4 py-2 rounded-lg border border-stone-300 text-stone-600 hover:bg-stone-100 disabled:opacity-50"
          >
            Trước
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-4 py-2 rounded-lg border ${
                page === p
                  ? "bg-amber-600 text-white border-amber-600"
                  : "border-stone-300 text-stone-600 hover:bg-stone-100"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded-lg border border-stone-300 text-stone-600 hover:bg-stone-100 disabled:opacity-50"
          >
            Sau
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
