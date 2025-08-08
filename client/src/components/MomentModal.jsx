import React, { useEffect, useRef, useState } from "react";
import { formatCurrencyVND } from "../utils/formatCurrency";
import { formatDateTime } from "../utils/formatDateTime";

const ANIM_DURATION = 250; // ms — phải khớp với CSS animation duration

export default function MomentModal({ open, onClose, moment }) {
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);
  const timerRef = useRef(null);

  // startClose dùng chung: bật state closing và schedule finalize
  const startClose = () => {
    if (timerRef.current) return; // đã chạy đóng rồi
    setClosing(true);
    timerRef.current = setTimeout(() => {
      setMounted(false);
      setClosing(false);
      timerRef.current = null;
      // gọi onClose sau khi animation đóng xong để parent biết modal đã đóng
      onClose?.();
    }, ANIM_DURATION);
  };

  useEffect(() => {
    // khi open bật -> mount ngay, cancel bất kỳ timer đóng nào
    if (open) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setMounted(true);
      setClosing(false);
      return;
    }

    // khi prop open false và modal đang hiển thị -> bắt đầu đóng
    if (!open && mounted) {
      startClose();
    }
    // cleanup khi unmount component
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]); // chỉ cần lắng nghe open

  if (!mounted) return null;

  return (
    <div
      // overlay
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        closing
          ? "animate-[fadeOut_0.25s_ease-in]"
          : "animate-[fadeIn_0.25s_ease-out]"
      }`}
      aria-modal="true"
      role="dialog"
    >
      {/* semi-transparent background (nhấn vào thì đóng modal) */}
      <div
        className={`fixed inset-0 bg-black/70 transition-opacity ${
          closing ? "bg-opacity-0" : "bg-opacity-60"
        }`}
        onMouseDown={() => startClose()} // click background -> đóng (dùng mouseDown để tránh tập trung)
      />

      {/* modal box */}
      <div
        className={`relative z-10 w-full max-w-xl mx-4 bg-white rounded-xl shadow-lg transform ${
          closing
            ? "animate-[scaleOut_0.25s_ease-in]"
            : "animate-[scaleIn_0.25s_ease-out]"
        }`}
        // ngăn click vào content làm close (bubbling)
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => startClose()}
          className="absolute top-3 right-3 text-stone-500 hover:text-stone-800"
          aria-label="Đóng"
        >
          ✕
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-stone-800">
            Chi tiết khoảng khắc
          </h2>

          {moment ? (
            <div className="space-y-3">
              <p>
                <span className="font-medium text-stone-700">Quán Cafe:</span>{" "}
                {moment.cafeId?.name || "-"}
              </p>

              <p>
                <span className="font-medium text-stone-700">Địa chỉ:</span>{" "}
                {moment.cafeId?.address || "-"}
              </p>

              <p>
                <span className="font-medium text-stone-700">Mô tả:</span>{" "}
                {moment.description || "-"}
              </p>

              <p>
                <span className="font-medium text-stone-700">Tổng giá:</span>{" "}
                <span className="text-amber-600 font-semibold">
                  {formatCurrencyVND(moment.totalPrice ?? 0)}
                </span>
              </p>

              <p>
                <span className="font-medium text-stone-700">Ngày giờ:</span>{" "}
                {formatDateTime(moment.dateTime)}
              </p>

              {/* Drinks */}
              {Array.isArray(moment.selectedDrinks) &&
                moment.selectedDrinks.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-medium text-stone-700 mb-2">
                      Chi tiết đồ uống
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm border border-stone-200 rounded-lg">
                        <thead className="bg-stone-100">
                          <tr>
                            <th className="px-4 py-2 text-left">Tên</th>
                            <th className="px-4 py-2 text-center">Số lượng</th>
                            <th className="px-4 py-2 text-right">Giá</th>
                            <th className="px-4 py-2 text-right">Tổng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {moment.selectedDrinks.map((d, i) => (
                            <tr key={i} className="border-t border-stone-200">
                              <td className="px-4 py-2 capitalize">
                                {d.drinkName || d.name}
                              </td>
                              <td className="px-4 py-2 text-center">
                                {d.quantity}
                              </td>
                              <td className="px-4 py-2 text-right text-amber-600">
                                {formatCurrencyVND(d.price)}
                              </td>
                              <td className="px-4 py-2 text-right text-amber-700 font-semibold">
                                {formatCurrencyVND(
                                  (d.price || 0) * (d.quantity || 0)
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              {moment.imageUrl && (
                <div className="mt-4">
                  <img
                    src={moment.imageUrl}
                    alt="Moment"
                    className="w-full h-64 object-cover rounded-lg shadow"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="text-stone-500">Không có dữ liệu.</div>
          )}
        </div>
      </div>
    </div>
  );
}
