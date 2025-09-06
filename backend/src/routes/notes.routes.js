import express from "express";
import multer from "multer";

import * as ctrl from "../controllers/notes.controller.js";

const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });
const upload = multer({
  storage: multer.diskStorage({
    destination: (_, __, cb) => cb(null, "/tmp"),
    filename: (_, f, cb) => cb(null, `${Date.now()}-${f.originalname}`),
  }),
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB hard max
});

router.get("/", ctrl.getNotes);
router.post("/", upload.single("audio"), ctrl.createNote);
router.put("/:id", ctrl.updateNote);
router.delete("/:id", ctrl.deleteNote);
router.post("/:id/summarize", ctrl.summarizeNote);

export default router;
