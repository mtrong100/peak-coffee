// src/api/cafeApi.js
import axiosClient from "./axiosClient";

// 📌 Lấy tất cả quán cafe
export const getAllCafes = () => axiosClient.get("/cafes");

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
