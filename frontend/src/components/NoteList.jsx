import React, { useEffect, useState } from "react";

import { listNotes } from "../api/notes";
import NoteCard from "./NoteCard";

export default function NoteList() {
  const [notes, setNotes] = useState([]);

  const fetch = async () => setNotes(await listNotes());

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="list">
      {notes.map((n) => (
        <NoteCard key={n._id} note={n} refresh={fetch} />
      ))}
    </div>
  );
}
