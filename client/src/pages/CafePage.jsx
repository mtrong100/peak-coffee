// src/pages/CafePage.jsx
import React, { useEffect, useState, useCallback } from "react";
import { getAllCafes } from "../api/cafeApi";
import CafeCard from "../components/CafeCard";
import {
  Search,
  Star,
  ArrowDownUp,
  Coffee,
  SlidersHorizontal,
} from "lucide-react";
import { debounce } from "../utils/debounce";

const CafePage = () => {
  const [cafes, setCafes] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    minRating: "",
    maxRating: "",
    sortBy: "rating",
    sortOrder: "desc",
    page: 1,
    limit: 15,
  });
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Scroll lên đầu khi load page
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Debounced search
  const handleSearchChange = useCallback(
    debounce((value) => {
      setFilters((prev) => ({ ...prev, search: value, page: 1 }));
    }, 500),
    []
  );

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

  const resetFilters = () => {
    setFilters({
      search: "",
      minRating: "",
      maxRating: "",
      sortBy: "rating",
      sortOrder: "desc",
      page: 1,
      limit: 15,
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="space-y-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
              Khám phá quán cafe
            </h1>
            <p className="text-amber-700/80 mt-2">
              Tìm kiếm quán cafe yêu thích của bạn
            </p>
          </div>
          {/* Mobile filter toggle */}
          <button
            className="flex items-center gap-2 bg-amber-900 text-white py-3 px-5 text-lg font-semibold rounded-lg shadow-lg transition-colors"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <SlidersHorizontal size={18} />
            Bộ lọc
          </button>

          {/* Filter controls */}
          <div
            className={`bg-white border border-gray-200 rounded-xl p-4 shadow-md ${
              showFilters ? "block" : "hidden md:block"
            }`}
          >
            <div className="flex flex-col md:grid md:grid-cols-6 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-amber-700 mb-1">
                  Tìm kiếm
                </label>
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600"
                  />
                  <input
                    type="text"
                    placeholder="Theo tên hoặc địa chỉ..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 text-amber-900"
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                </div>
              </div>

              {/* Min Rating */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-amber-700 mb-1">
                  Rating tối thiểu
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={filters.minRating}
                  placeholder="VD: 1"
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      minRating: e.target.value,
                      page: 1,
                    }))
                  }
                  className="w-full pl-3 pr-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 text-amber-900"
                />
              </div>

              {/* Max Rating */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-amber-700 mb-1">
                  Rating tối đa
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={filters.maxRating}
                  placeholder="VD: 5"
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      maxRating: e.target.value,
                      page: 1,
                    }))
                  }
                  className="w-full pl-3 pr-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 text-amber-900"
                />
              </div>

              {/* Sort */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-amber-700 mb-1">
                  Sắp xếp
                </label>
                <div className="relative">
                  <ArrowDownUp
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600"
                  />
                  <select
                    value={`${filters.sortBy}-${filters.sortOrder}`}
                    onChange={(e) => {
                      const [sortBy, sortOrder] = e.target.value.split("-");
                      setFilters((prev) => ({
                        ...prev,
                        sortBy,
                        sortOrder,
                        page: 1,
                      }));
                    }}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 text-amber-900"
                  >
                    <option value="rating-desc">Đánh giá: cao → thấp</option>
                    <option value="rating-asc">Đánh giá: thấp → cao</option>
                    <option value="name-asc">Tên: A → Z</option>
                    <option value="name-desc">Tên: Z → A</option>
                    <option value="createdAt-desc">Ngày thêm: Mới nhất</option>
                    <option value="createdAt-asc">Ngày thêm: Cũ nhất</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={resetFilters}
                className="py-4 px-6 bg-amber-600 w-full md:w-auto hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
              >
                Đặt lại bộ lọc
              </button>
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
