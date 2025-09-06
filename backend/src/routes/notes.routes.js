import express from "express";
import multer from "multer";

import * as ctrl from "../controllers/notes.controller.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", ctrl.getNotes);
router.post("/", upload.single("audio"), ctrl.createNote);
router.put("/:id", ctrl.updateNote);
router.delete("/:id", ctrl.deleteNote);
router.post("/:id/summarize", ctrl.summarizeNote);

export default router;
