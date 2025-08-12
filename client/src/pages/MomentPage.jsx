// src/pages/MomentPage.jsx
import React, { useEffect, useState } from "react";
import { getAllMoments } from "../api/momentApi";
import MomentCard from "../components/MomentCard";
import {
  Search,
  Coffee,
  Calendar,
  ArrowDownUp,
  SlidersHorizontal,
} from "lucide-react";

const timeOfDayOptions = [
  { value: "", label: "Tất cả thời gian" },
  { value: "morning", label: "Buổi sáng" },
  { value: "noon", label: "Buổi trưa" },
  { value: "afternoon", label: "Buổi chiều" },
  { value: "evening", label: "Buổi tối" },
];

export default function MomentPage() {
  const [moments, setMoments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    timeOfDay: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    page: 1,
    limit: 15,
  });

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // format số có dấu chấm phân cách hàng nghìn
  const formatNumber = (val) => {
    if (!val) return "";
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleNumberInput = (key, value) => {
    const numericValue = value.replace(/\D/g, "");
    setFilters((prev) => ({ ...prev, [key]: numericValue }));
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await getAllMoments(filters);
      setMoments(res.data.data || []);
      setPagination(res.data.pagination || {});
    } catch (err) {
      console.error("Lỗi khi tải moments:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetFilter = () => {
    setFilters({
      search: "",
      timeOfDay: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "createdAt",
      sortOrder: "desc",
      page: 1,
      limit: 15,
    });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [filters]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
              Khoảnh khắc Cafe
            </h1>
            <p className="text-amber-700/80 mt-2">
              Xem và chia sẻ những khoảnh khắc đáng nhớ tại quán cafe
            </p>
          </div>

          {/* Nút toggle filter chỉ hiện trên mobile */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="md:hidden flex items-center gap-2 bg-amber-900 text-white py-3 px-5 text-lg font-semibold rounded-lg shadow-lg transition-colors"
          >
            <SlidersHorizontal size={18} />
            Bộ lọc
          </button>

          {/* Filter controls */}
          <div
            className={`bg-white border border-gray-200 rounded-xl p-4 shadow-md mb-6 
              ${showFilter ? "block" : "hidden"} sm:block`}
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
                    placeholder="Theo mô tả hoặc quán..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 text-amber-900"
                    value={filters.search}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        search: e.target.value,
                        page: 1,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Time of Day */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-amber-700 mb-1">
                  Thời gian trong ngày
                </label>
                <select
                  value={filters.timeOfDay}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      timeOfDay: e.target.value,
                      page: 1,
                    }))
                  }
                  className="w-full pl-3 pr-8 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 text-amber-900"
                >
                  {timeOfDayOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Min */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-amber-700 mb-1">
                  Giá tối thiểu
                </label>
                <input
                  type="text"
                  placeholder="VD: 20,000"
                  className="w-full pl-3 pr-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 text-amber-900"
                  value={formatNumber(filters.minPrice)}
                  onChange={(e) =>
                    handleNumberInput("minPrice", e.target.value)
                  }
                />
              </div>

              {/* Price Max */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-amber-700 mb-1">
                  Giá tối đa
                </label>
                <input
                  type="text"
                  placeholder="VD: 100,000"
                  className="w-full pl-3 pr-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 text-amber-900"
                  value={formatNumber(filters.maxPrice)}
                  onChange={(e) =>
                    handleNumberInput("maxPrice", e.target.value)
                  }
                />
              </div>

              {/* Sort */}
              <div className="md:col-span-1">
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
                    <option value="createdAt-desc">Mới nhất</option>
                    <option value="createdAt-asc">Cũ nhất</option>
                    <option value="totalPrice-asc">Giá thấp → cao</option>
                    <option value="totalPrice-desc">Giá cao → thấp</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={resetFilter}
                className="py-4 px-6 bg-amber-600 hover:bg-amber-700 w-full md:w-auto text-white rounded-lg font-medium transition-colors"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: filters.limit }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg border border-gray-300 animate-pulse"
              >
                <div className="h-48 bg-gray-300 rounded-t-xl" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                  <div className="h-4 bg-gray-300 rounded w-1/2" />
                  <div className="h-4 bg-gray-300 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Data */}
        {!isLoading && moments.length === 0 && (
          <div className="text-center py-16">
            <Coffee className="mx-auto h-12 w-12 text-amber-400 mb-4" />
            <h3 className="text-lg font-medium text-amber-800">
              Không tìm thấy khoảnh khắc
            </h3>
            <p className="text-amber-600 mt-2">Hãy thử bộ lọc khác</p>
          </div>
        )}

        {!isLoading && moments.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {moments.map((moment) => (
              <MomentCard key={moment._id} moment={moment} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              className="px-3 py-1 rounded bg-amber-100 hover:bg-amber-200 disabled:opacity-50"
              onClick={() => setFilters((p) => ({ ...p, page: p.page - 1 }))}
              disabled={filters.page === 1}
            >
              ←
            </button>
            <span className="px-2">
              {filters.page}/{pagination.totalPages}
            </span>
            <button
              className="px-3 py-1 rounded bg-amber-100 hover:bg-amber-200 disabled:opacity-50"
              onClick={() => setFilters((p) => ({ ...p, page: p.page + 1 }))}
              disabled={filters.page === pagination.totalPages}
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
