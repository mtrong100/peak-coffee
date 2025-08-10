import React from "react";
import { Search, ChevronDown } from "lucide-react";

const CafeFilter = ({
  filters,
  onSearchChange,
  onRatingChange,
  onSortChange,
  onReset,
}) => {
  return (
    <div className="mb-6 space-y-4">
      {/* Search + Reset */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full md:w-1/3">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc địa chỉ..."
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-amber-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg"
        >
          Đặt lại
        </button>
      </div>

      {/* Rating + Sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <span className="text-sm">Đánh giá tối thiểu:</span>
          <div className="relative">
            <select
              value={filters.minRating || ""}
              onChange={(e) => onRatingChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 rounded-lg border bg-white border-amber-200 text-sm cursor-pointer"
            >
              <option value="">Tất cả</option>
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} sao
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-600"
            />
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-sm">Sắp xếp:</span>
          <select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split("-");
              onSortChange(sortBy, sortOrder);
            }}
            className="appearance-none pl-3 pr-8 py-2 rounded-lg border bg-white border-amber-200 text-sm cursor-pointer"
          >
            <option value="createdAt-desc">Mới nhất</option>
            <option value="createdAt-asc">Cũ nhất</option>
            <option value="name-asc">Tên A → Z</option>
            <option value="name-desc">Tên Z → A</option>
            <option value="rating-desc">Đánh giá cao nhất</option>
            <option value="rating-asc">Đánh giá thấp nhất</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CafeFilter;
