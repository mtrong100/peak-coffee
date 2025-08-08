import express from "express";
import {
  getAllCafes,
  getCafeById,
  createCafe,
  updateCafe,
  deleteCafe,
} from "../controllers/cafe.controller.js";

const router = express.Router();

router.get("/", getAllCafes);
router.get("/:id", getCafeById);
router.post("/", createCafe);
router.put("/:id", updateCafe);
router.delete("/:id", deleteCafe);

export default router;
