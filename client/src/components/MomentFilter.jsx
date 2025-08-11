import React, { useState } from "react";
import { Filter, X } from "lucide-react";
import { formatPrice } from "../utils/formatPrice";

export default function MomentFilter({
  cafes,
  filters,
  setFilters,
  onApply,
  onReset,
}) {
  const [showFilter, setShowFilter] = useState(false);

  const inputBase =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white";
  const selectBase =
    "w-full rounded-lg border border-gray-300 px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500";
  const btnBase =
    "rounded-lg font-medium transition-colors shadow-sm focus:outline-none";

  return (
    <div className="">
      {/* Toggle button for mobile */}
      <div className="flex justify-between items-center md:hidden mb-5">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 bg-gray-600 text-white py-4 px-6 rounded-lg shadow hover:bg-gray-700 transition-colors"
        >
          <Filter size={18} />
          Bộ lọc
        </button>
        {showFilter && (
          <button
            onClick={() => setShowFilter(false)}
            className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Filter form */}
      <div
        className={`p-4 bg-white  border border-gray-200 rounded-xl shadow-lg mb-5 grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-300 ${
          showFilter ? "block" : "hidden md:grid"
        }`}
      >
        {/* Cafe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quán Cafe
          </label>
          <select
            value={filters.cafeId}
            onChange={(e) => setFilters({ ...filters, cafeId: e.target.value })}
            className={selectBase}
          >
            <option value="">Tất cả</option>
            {cafes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* timeOfDay */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Thời gian trong ngày
          </label>
          <select
            value={filters.timeOfDay}
            onChange={(e) =>
              setFilters({ ...filters, timeOfDay: e.target.value })
            }
            className={selectBase}
          >
            <option value="">Tất cả</option>
            <option value="morning">Buổi sáng (04:00 - 09:59)</option>
            <option value="noon">Buổi trưa (11:00 - 13:59)</option>
            <option value="afternoon">Buổi chiều (15:00 - 16:59)</option>
            <option value="evening">Buổi tối (18:00 - 23:59)</option>
          </select>
        </div>

        {/* price */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giá từ (VNĐ)
            </label>
            <input
              type="text"
              value={formatPrice(filters.minPrice)}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                setFilters({ ...filters, minPrice: rawValue });
              }}
              placeholder="VD: 20.000"
              className={inputBase}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Đến (VNĐ)
            </label>
            <input
              type="text"
              value={formatPrice(filters.maxPrice)}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                setFilters({ ...filters, maxPrice: rawValue });
              }}
              placeholder="VD: 50.000"
              className={inputBase}
            />
          </div>
        </div>

        {/* date from */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Từ ngày
          </label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) =>
              setFilters({ ...filters, dateFrom: e.target.value })
            }
            className={inputBase}
          />
        </div>

        {/* date to */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Đến ngày
          </label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
            className={inputBase}
          />
        </div>

        {/* actions */}
        <div className="flex items-end gap-3 justify-between">
          <button
            onClick={onApply}
            className={`${btnBase} bg-amber-600 hover:bg-amber-700 text-white py-4 px-6 flex-1`}
          >
            Áp dụng
          </button>
          <button
            onClick={onReset}
            className={`${btnBase} bg-gray-200 hover:bg-gray-300 text-gray-800 py-4 px-6 flex-1`}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
