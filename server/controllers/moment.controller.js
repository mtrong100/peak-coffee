import Moment from "../models/moment.model.js";

export const getAllMoments = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, cafeId } = req.query;

    const filter = {};
    if (cafeId) filter.cafeId = cafeId;

    const sortOption = sort === "asc" ? 1 : -1;

    const moments = await Moment.find(filter)
      .populate("cafeId", "name address rating")
      .sort({ dateTime: sortOption })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Moment.countDocuments(filter);

    res.status(200).json({
      total,
      page: Number(page),
      limit: Number(limit),
      data: moments,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch moments", error });
  }
};

export const getMomentById = async (req, res) => {
  try {
    const moment = await Moment.findById(req.params.id).populate("cafeId");
    if (!moment)
      return res.status(404).json({ error: "Không tìm thấy moment." });
    res.json(moment);
  } catch (err) {
    res.status(400).json({ error: "ID không hợp lệ." });
  }
};

export const createMoment = async (req, res) => {
  try {
    const newMoment = new Moment(req.body);
    const savedMoment = await newMoment.save();
    res.status(201).json(savedMoment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateMoment = async (req, res) => {
  try {
    const updated = await Moment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ error: "Không tìm thấy moment." });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteMoment = async (req, res) => {
  try {
    const deleted = await Moment.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Không tìm thấy moment." });
    res.json({ message: "Đã xóa moment thành công." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
