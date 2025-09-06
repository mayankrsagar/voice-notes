import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, default: "Untitled" },
    transcript: { type: String, required: true },
    summary: { type: String, default: "" },
    audioUrl: { type: String }, // optional cloud link
    isSummaryOutdated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
