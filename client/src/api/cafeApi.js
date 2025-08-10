// src/api/cafeApi.js
import axiosClient from "./axiosClient";

// 📌 Lấy tất cả quán cafe
export const getAllCafes = (params = {}) => {
  const defaultParams = {
    sortBy: "createdAt",
    sortOrder: "desc",
    page: 1,
    limit: 10,
  };

  // Gộp default và params truyền vào
  const finalParams = { ...defaultParams, ...params };

  // Xóa các param rỗng/null/undefined để tránh gửi lung tung
  Object.keys(finalParams).forEach((key) => {
    if (
      finalParams[key] === "" ||
      finalParams[key] === null ||
      finalParams[key] === undefined
    ) {
      delete finalParams[key];
    }
  });

  return axiosClient.get("/cafes", { params: finalParams });
};

// 📌 Lấy tất cả tên quán cafe
export const getAllCafeNames = () => axiosClient.get("/cafes/names");

// 📌 Lấy chi tiết 1 quán cafe theo ID
export const getCafeById = (id) => axiosClient.get(`/cafes/${id}`);

// 📌 Tạo quán cafe mới
export const createCafe = (data) => axiosClient.post("/cafes", data);

// 📌 Cập nhật quán cafe
export const updateCafe = (id, data) => axiosClient.put(`/cafes/${id}`, data);

// 📌 Xóa quán cafe
export const deleteCafe = (id) => axiosClient.delete(`/cafes/${id}`);
