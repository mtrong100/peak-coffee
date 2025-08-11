import React, { useState } from "react";
import { Search, ChevronDown, X, Filter } from "lucide-react";

const CafeFilter = ({
  filters,
  onSearchChange,
  onRatingChange,
  onSortChange,
  onReset,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="mb-8">
      {/* Toggle button trên mobile */}
      <div className="flex justify-between items-center md:hidden mb-5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-gray-600 text-white py-4 px-6 rounded-lg shadow hover:bg-gray-700 transition-colors"
        >
          <Filter size={18} />
          Bộ lọc
        </button>
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Panel filter */}
      <div
        id="filter-panel"
        className={`mt-4 bg-white rounded-lg shadow-lg border border-gray-200 p-6 space-y-6
          ${isOpen ? "block" : "hidden"}
          md:block
        `}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          {/* Search box */}
          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="search"
              className="block mb-2 font-medium text-amber-700"
            >
              Tìm kiếm quán cafe
            </label>
            <div className="relative">
              <Search
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
              <input
                id="search"
                type="text"
                value={filters.search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Tên hoặc địa chỉ..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 "
              />
            </div>
          </div>

          {/* Rating */}
          <div>
            <label
              htmlFor="rating"
              className="block mb-2 font-medium text-amber-700"
            >
              Đánh giá tối thiểu
            </label>
            <div className="relative">
              <select
                id="rating"
                value={filters.minRating || ""}
                onChange={(e) => onRatingChange(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 py-3 pl-3 pr-8 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="">Tất cả</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} sao
                  </option>
                ))}
              </select>
              <ChevronDown
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600 pointer-events-none"
              />
            </div>
          </div>

          {/* Sort */}
          <div>
            <label
              htmlFor="sort"
              className="block mb-2 font-medium text-amber-700"
            >
              Sắp xếp
            </label>
            <div className="relative">
              <select
                id="sort"
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split("-");
                  onSortChange(sortBy, sortOrder);
                }}
                className="w-full appearance-none rounded-lg border border-gray-300 py-3 pl-3 pr-8 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="createdAt-desc">Mới nhất</option>
                <option value="createdAt-asc">Cũ nhất</option>
                <option value="name-asc">Tên A → Z</option>
                <option value="name-desc">Tên Z → A</option>
                <option value="rating-desc">Đánh giá cao nhất</option>
                <option value="rating-asc">Đánh giá thấp nhất</option>
              </select>
              <ChevronDown
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Reset button */}
        <button
          onClick={onReset}
          className="w-full md:w-auto flex items-center justify-center md:justify-end ml-auto px-6 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold shadow transition"
          type="button"
        >
          Đặt lại
        </button>
      </div>
    </section>
  );
};

export default CafeFilter;
