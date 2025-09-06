import Note from "../models/note.model.js";
import { summarizeText, transcribeAudio } from "../services/openai.service.js";

// GET /api/notes
export const getNotes = async (_req, res, next) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (e) {
    next(e);
  }
};

// POST /api/notes  (multipart form: audio file + optional title)
export const createNote = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "Audio file required" });

    const transcript = await transcribeAudio(req.file.buffer);
    const note = await Note.create({
      title: req.body.title || "Untitled",
      transcript,
    });
    res.status(201).json(note);
  } catch (e) {
    next(e);
  }
};

// PUT /api/notes/:id  (body: { transcript, title? })
export const updateNote = async (req, res, next) => {
  try {
    const { transcript, title } = req.body;
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: "Not found" });

    note.transcript = transcript ?? note.transcript;
    if (title !== undefined) note.title = title;

    // Core logic: editing transcript invalidates summary
    if (transcript && transcript !== note.transcript) {
      note.summary = "";
      note.isSummaryOutdated = true;
    }

    await note.save();
    res.json(note);
  } catch (e) {
    next(e);
  }
};

// DELETE /api/notes/:id
export const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ msg: "Not found" });
    res.json({ msg: "Deleted" });
  } catch (e) {
    next(e);
  }
};

// POST /api/notes/:id/summarize
export const summarizeNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: "Not found" });

    if (note.summary && !note.isSummaryOutdated)
      return res.json({ summary: note.summary }); // already fresh

    const fresh = await summarizeText(note.transcript);
    note.summary = fresh;
    note.isSummaryOutdated = false;
    await note.save();

    res.json({ summary: fresh });
  } catch (e) {
    next(e);
  }
};
