import Cafe from "../models/cafe.model.js";

export const getAllCafes = async (req, res) => {
  try {
    const cafes = await Cafe.find().sort({ createdAt: -1 });
    res.json(cafes);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách quán cafe." });
  }
};

export const getCafeById = async (req, res) => {
  try {
    const cafe = await Cafe.findById(req.params.id);
    if (!cafe)
      return res.status(404).json({ error: "Không tìm thấy quán cafe." });
    res.json(cafe);
  } catch (err) {
    res.status(400).json({ error: "ID không hợp lệ." });
  }
};

export const createCafe = async (req, res) => {
  try {
    const newCafe = new Cafe(req.body);
    const savedCafe = await newCafe.save();
    res.status(201).json(savedCafe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateCafe = async (req, res) => {
  try {
    const updatedCafe = await Cafe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedCafe)
      return res.status(404).json({ error: "Không tìm thấy quán cafe." });
    res.json(updatedCafe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteCafe = async (req, res) => {
  try {
    const deleted = await Cafe.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Không tìm thấy quán cafe." });
    res.json({ message: "Đã xóa quán cafe thành công." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
