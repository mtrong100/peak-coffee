import React from "react";
import { formatPrice } from "../utils/formatPrice";

const MomentFilter = ({ cafes, filters, setFilters, onApply, onReset }) => {
  return (
    <div className="mb-6 p-4 bg-amber-50 rounded-lg shadow-inner grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Cafe */}
      <div>
        <label className="block text-sm font-medium text-amber-800 mb-1">
          Quán Cafe
        </label>
        <select
          value={filters.cafeId}
          onChange={(e) => setFilters({ ...filters, cafeId: e.target.value })}
          className="w-full border rounded px-3 py-2"
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
        <label className="block text-sm font-medium text-amber-800 mb-1">
          Thời gian trong ngày
        </label>
        <select
          value={filters.timeOfDay}
          onChange={(e) =>
            setFilters({ ...filters, timeOfDay: e.target.value })
          }
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Tất cả</option>
          <option value="morning">Sáng (06:00 - 11:59)</option>
          <option value="afternoon">Chiều (12:00 - 17:59)</option>
          <option value="evening">Tối (18:00 - 23:59)</option>
          <option value="night">Đêm (00:00 - 05:59)</option>
        </select>
      </div>

      {/* price */}
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-sm font-medium text-amber-800 mb-1">
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
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-amber-800 mb-1">
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
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* dates + actions */}
      <div>
        <label className="block text-sm font-medium text-amber-800 mb-1">
          Từ ngày
        </label>
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
          className="w-full border rounded px-3 py-2 mb-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-800 mb-1">
          Đến ngày
        </label>
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
          className="w-full border rounded px-3 py-2 mb-2"
        />
      </div>

      <div className="mt-2 grid grid-cols-2 gap-3">
        <button
          onClick={onApply}
          className="bg-amber-700 text-white rounded p-4"
        >
          Áp dụng
        </button>
        <button onClick={onReset} className="bg-gray-200 rounded p-4">
          Xóa
        </button>
      </div>
    </div>
  );
};

export default MomentFilter;
