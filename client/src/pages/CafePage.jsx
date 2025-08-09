import React, { useEffect, useState } from "react";
import { getAllCafes } from "../api/cafeApi";
import CafeCard from "../components/CafeCard";
import { Search, Filter, ArrowDownUp, Coffee } from "lucide-react";

const CafePage = () => {
  const [cafes, setCafes] = useState([]);
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("rating-desc");
  const [isLoading, setIsLoading] = useState(true);

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        setIsLoading(true);
        const res = await getAllCafes();
        setCafes(res.data);
        setFilteredCafes(res.data);
      } catch (err) {
        console.error("Failed to fetch cafes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCafes();
  }, []);

  useEffect(() => {
    // Filter and sort cafes
    let results = [...cafes];

    // Apply search filter
    if (searchQuery) {
      results = results.filter(
        (cafe) =>
          cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cafe.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    results.sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "rating-desc":
          return (b.rating || 0) - (a.rating || 0);
        case "rating-asc":
          return (a.rating || 0) - (b.rating || 0);
        default:
          return 0;
      }
    });

    setFilteredCafes(results);
  }, [cafes, searchQuery, sortOption]);

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
              Khám phá quán cafe
            </h1>
            <p className="text-amber-700/80 mt-2">
              Tìm kiếm quán cafe yêu thích của bạn
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-amber-600" />
              </div>
              <input
                type="text"
                placeholder="Tìm theo tên hoặc địa chỉ..."
                className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-lg bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ArrowDownUp size={18} className="text-amber-600" />
              </div>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
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

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md p-4 h-64 animate-pulse"
              >
                <div className="bg-amber-100 rounded h-32 mb-4"></div>
                <div className="space-y-3">
                  <div className="bg-amber-100 rounded h-4 w-3/4"></div>
                  <div className="bg-amber-100 rounded h-4 w-1/2"></div>
                  <div className="bg-amber-100 rounded h-4 w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredCafes.length === 0 && (
          <div className="text-center py-16">
            <Coffee className="mx-auto h-12 w-12 text-amber-400 mb-4" />
            <h3 className="text-lg font-medium text-amber-800">
              Không tìm thấy quán cafe
            </h3>
            <p className="text-amber-600 mt-2">
              {searchQuery
                ? "Thử tìm kiếm với từ khóa khác"
                : "Hiện chưa có quán cafe nào"}
            </p>
          </div>
        )}

        {/* Cafe Grid */}
        {!isLoading && filteredCafes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCafes.map((cafe) => (
              <CafeCard key={cafe._id} cafe={cafe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CafePage;
