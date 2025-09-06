import React from "react";

import { createNote } from "./api/notes";
import AudioRecorder from "./components/AudioRecorder";
import NoteList from "./components/NoteList";

export default function App() {
  const handleCreate = async (form) => {
    await createNote(form);
    window.location.reload(); // quick refresh
  };

  return (
    <div className="app">
      <h1>Voice Notes AI</h1>
      <AudioRecorder onSend={handleCreate} />
      <NoteList />
    </div>
  );
}
