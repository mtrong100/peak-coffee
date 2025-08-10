import { useEffect, useState } from "react";
import { getAllMoments } from "../api/momentApi";
import { getAllCafeNames } from "../api/cafeApi";
import {
  Coffee,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowDownUp,
} from "lucide-react";
import MomentCard from "../components/MomentCard";

export default function MomentPage() {
  const [moments, setMoments] = useState([]);
  const [cafes, setCafes] = useState([]);
  const [sort, setSort] = useState("desc");
  const [filterCafe, setFilterCafe] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    fetchMoments();
    fetchCafes();
  }, [page, sort, filterCafe]);

  const fetchMoments = async () => {
    setIsLoading(true);
    try {
      const res = await getAllMoments({
        page,
        limit,
        sort,
        cafeId: filterCafe || undefined,
      });
      setMoments(res.data.data || []);
      setTotal(res.data.total || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCafes = async () => {
    try {
      const res = await getAllCafeNames();
      setCafes(res.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <section className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
              Khoảnh khắc cafe
            </h1>
            <p className="text-amber-700/80">
              Những trải nghiệm đáng nhớ tại các quán cafe
            </p>
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            {/* Filter */}
            <div className="relative flex-1 md:flex-none">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-amber-600" />
              </div>
              <select
                value={filterCafe}
                onChange={(e) => {
                  setFilterCafe(e.target.value);
                  setPage(1);
                }}
                className="pl-10 pr-4 py-2 w-full border border-amber-200 rounded-lg bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-900 shadow-sm"
              >
                <option value="">Tất cả quán</option>
                {cafes.map((cafe) => (
                  <option key={cafe._id} value={cafe._id}>
                    {cafe.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="relative flex-1 md:flex-none">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ArrowDownUp size={18} className="text-amber-600" />
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-amber-200 rounded-lg bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-900 shadow-sm"
              >
                <option value="desc">Mới nhất</option>
                <option value="asc">Cũ nhất</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
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
        {!isLoading && moments.length === 0 && (
          <div className="text-center py-16">
            <Coffee className="mx-auto h-12 w-12 text-amber-400 mb-4" />
            <h3 className="text-lg font-medium text-amber-800">
              Không tìm thấy khoảnh khắc nào
            </h3>
            <p className="text-amber-600 mt-2">
              {filterCafe
                ? "Thử thay đổi bộ lọc"
                : "Bạn chưa có khoảnh khắc nào. Hãy tạo mới!"}
            </p>
          </div>
        )}

        {/* Card Grid */}
        {!isLoading && moments.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {moments.map((moment) => (
                <MomentCard key={moment._id} moment={moment} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg border ${
                  page === 1
                    ? "border-amber-200 text-amber-300 cursor-not-allowed"
                    : "border-amber-300 text-amber-700 hover:bg-amber-100"
                } transition-colors`}
              >
                <ChevronLeft size={18} />
                <span>Trang trước</span>
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum =
                    page <= 3
                      ? i + 1
                      : page >= totalPages - 2
                      ? totalPages - 4 + i
                      : page - 2 + i;
                  if (pageNum < 1 || pageNum > totalPages) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        page === pageNum
                          ? "bg-amber-600 text-white"
                          : "text-amber-700 hover:bg-amber-100"
                      } transition-colors`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {totalPages > 5 && page < totalPages - 2 && (
                  <span className="text-amber-500">...</span>
                )}
                {totalPages > 5 && page < totalPages - 2 && (
                  <button
                    onClick={() => setPage(totalPages)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      page === totalPages
                        ? "bg-amber-600 text-white"
                        : "text-amber-700 hover:bg-amber-100"
                    } transition-colors`}
                  >
                    {totalPages}
                  </button>
                )}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg border ${
                  page === totalPages
                    ? "border-amber-200 text-amber-700 cursor-not-allowed"
                    : "border-amber-300 text-amber-900 hover:bg-amber-100"
                } transition-colors`}
              >
                <span>Trang sau</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
