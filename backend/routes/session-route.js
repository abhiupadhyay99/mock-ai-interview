import express from "express";
import {
  createSession,
  getMySessions,
  getSessionById,
  updateSessionScore
} from "../controller/session-controller.js";
import { protect } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/create", protect, createSession);
router.get("/my-sessions", protect, getMySessions);
router.get("/:id", protect, getSessionById);
router.patch("/:id", protect, updateSessionScore);

export default router;
