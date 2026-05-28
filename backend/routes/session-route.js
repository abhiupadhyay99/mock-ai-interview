import express from "express";
import {
  createSession,
  getMySessions,
  getSessionById,
  updateSessionScore,
  saveAnswer
} from "../controller/session-controller.js";
import { protect } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/create", protect, createSession);
router.get("/my-sessions", protect, getMySessions);
router.get("/:id", protect, getSessionById);
router.patch("/:id", protect, updateSessionScore);
router.patch("/:id/answer", protect, saveAnswer);

export default router;
