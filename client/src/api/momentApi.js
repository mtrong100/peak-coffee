// src/api/momentApi.js
import axiosClient from "./axiosClient";

export const getAllMoments = () => axiosClient.get("/moments");
export const getMomentById = (id) => axiosClient.get(`/moments/${id}`);
export const createMoment = (data) => axiosClient.post("/moments", data);
export const updateMoment = (id, data) =>
  axiosClient.put(`/moments/${id}`, data);
export const deleteMoment = (id) => axiosClient.delete(`/moments/${id}`);
