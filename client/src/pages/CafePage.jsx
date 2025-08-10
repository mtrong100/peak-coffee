import React, { useEffect, useState } from "react";
import { getAllCafes } from "../api/cafeApi";
import CafeCard from "../components/CafeCard";
import { Search, Star, ArrowDownUp, Coffee } from "lucide-react";

const CafePage = () => {
  const [cafes, setCafes] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    minRating: "",
    sortBy: "rating",
    sortOrder: "desc",
    page: 1,
    limit: 9,
  });
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Scroll lên đầu khi load page
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Fetch data khi filter thay đổi
  useEffect(() => {
    const fetchCafes = async () => {
      try {
        setIsLoading(true);
        const res = await getAllCafes(filters);
        setCafes(res.data.data || []);
        setPagination(res.data.pagination || {});
      } catch (err) {
        console.error("Failed to fetch cafes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCafes();
  }, [filters]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header + Bộ lọc */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
              Khám phá quán cafe
            </h1>
            <p className="text-amber-700/80 mt-2">
              Tìm kiếm quán cafe yêu thích của bạn
            </p>
          </div>

          {/* Bộ lọc */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-amber-600" />
              </div>
              <input
                type="text"
                placeholder="Tìm theo tên hoặc địa chỉ..."
                className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-lg bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-900"
                value={filters.search}
                onChange={(e) =>
                  setFilters((p) => ({ ...p, search: e.target.value, page: 1 }))
                }
              />
            </div>

            {/* Min Rating */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Star size={18} className="text-amber-600" />
              </div>
              <select
                value={filters.minRating}
                onChange={(e) =>
                  setFilters((p) => ({
                    ...p,
                    minRating: e.target.value || "",
                    page: 1,
                  }))
                }
                className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-lg bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-900"
              >
                <option value="">Tất cả đánh giá</option>
                <option value="4">Từ 4 sao</option>
                <option value="3">Từ 3 sao</option>
                <option value="2">Từ 2 sao</option>
                <option value="1">Từ 1 sao</option>
              </select>
            </div>

            {/* Sort */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ArrowDownUp size={18} className="text-amber-600" />
              </div>
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split("-");
                  setFilters((p) => ({ ...p, sortBy, sortOrder, page: 1 }));
                }}
                className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-lg bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-900"
              >
                <option value="rating-desc">Đánh giá cao nhất</option>
                <option value="rating-asc">Đánh giá thấp nhất</option>
                <option value="name-asc">Tên (A-Z)</option>
                <option value="name-desc">Tên (Z-A)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg border border-gray-300 p-4 animate-pulse"
              >
                <div className="bg-gray-300 rounded-lg h-48 mb-4"></div>
                <div className="space-y-3">
                  <div className="bg-gray-300 rounded h-4 w-3/4"></div>
                  <div className="bg-gray-300 rounded h-4 w-1/2"></div>
                  <div className="bg-gray-300 rounded h-4 w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && cafes.length === 0 && (
          <div className="text-center py-16">
            <Coffee className="mx-auto h-12 w-12 text-amber-400 mb-4" />
            <h3 className="text-lg font-medium text-amber-800">
              Không tìm thấy quán cafe
            </h3>
            <p className="text-amber-600 mt-2">
              {filters.search
                ? "Thử tìm kiếm với từ khóa khác"
                : "Hiện chưa có quán cafe nào"}
            </p>
          </div>
        )}

        {/* Cafe Grid */}
        {!isLoading && cafes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cafes.map((cafe) => (
              <CafeCard key={cafe._id} cafe={cafe} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center mt-8 gap-2">
          {/* Prev */}
          <button
            onClick={() =>
              setFilters((p) => ({ ...p, page: Math.max(p.page - 1, 1) }))
            }
            disabled={filters.page === 1}
            className={`px-3 py-1 rounded-lg border border-amber-300 text-amber-700 hover:bg-amber-50 transition-colors ${
              filters.page === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-amber-400"
            }`}
          >
            Trước
          </button>

          {/* Page numbers */}
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => setFilters((p) => ({ ...p, page: pageNum }))}
                className={`px-3 py-1 rounded-lg border transition-colors ${
                  filters.page === pageNum
                    ? "bg-amber-500 text-white border-amber-500"
                    : "border-amber-300 text-amber-700 hover:bg-amber-50"
                }`}
              >
                {pageNum}
              </button>
            )
          )}

          {/* Next */}
          <button
            onClick={() =>
              setFilters((p) => ({
                ...p,
                page: Math.min(p.page + 1, pagination.totalPages),
              }))
            }
            disabled={filters.page === pagination.totalPages}
            className={`px-3 py-1 rounded-lg border border-amber-300 text-amber-700 hover:bg-amber-50 transition-colors ${
              filters.page === pagination.totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-amber-400"
            }`}
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
};

export default CafePage;
