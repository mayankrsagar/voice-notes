import React, { useState } from "react";

import { deleteNote, summarizeNote, updateNote } from "../api/notes";

export default function NoteCard({ note, refresh }) {
  const [txt, setTxt] = useState(note.transcript);
  const [sum, setSum] = useState(note.summary);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const save = async () => {
    await updateNote(note._id, { transcript: txt });
    setSum(""); // requirement: clear summary on edit
    setEditing(false);
    refresh();
  };

  const remove = async () => {
    if (!confirm("Delete?")) return;
    await deleteNote(note._id);
    refresh();
  };

  const summarize = async () => {
    setLoading(true);
    const { summary } = await summarizeNote(note._id);
    setSum(summary);
    setLoading(false);
  };

  const summaryFresh = sum && !note.isSummaryOutdated;

  return (
    <div className="card">
      <h3>{note.title}</h3>

      {editing ? (
        <textarea
          value={txt}
          onChange={(e) => setTxt(e.target.value)}
          rows={6}
        />
      ) : (
        <p>{txt}</p>
      )}

      {sum && (
        <blockquote>
          <strong>Summary:</strong> {sum}
        </blockquote>
      )}

      <div className="actions">
        {editing ? (
          <>
            <button onClick={save}>Save</button>
            <button
              onClick={() => {
                setEditing(false);
                setTxt(note.transcript);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setEditing(true)}>Edit</button>
        )}
        <button onClick={remove}>Delete</button>
        <button onClick={summarize} disabled={summaryFresh || loading}>
          {loading
            ? "Summarizing…"
            : summaryFresh
            ? "Summary fresh"
            : "Generate Summary"}
        </button>
      </div>
    </div>
  );
}
