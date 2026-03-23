import express from "express";
import { askAi, saveInteraction } from "../controllers/apiController.js";

const router = express.Router();

router.post("/ask-ai", askAi);
router.post("/save", saveInteraction);

export default router;
