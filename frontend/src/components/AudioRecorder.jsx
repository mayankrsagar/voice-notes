import React from "react";

import useRecorder from "../hooks/useRecorder";

export default function AudioRecorder({ onSend }) {
  const { recording, audioURL, blob, start, stop } = useRecorder();

  const handleSend = () => {
    if (!blob) return;
    const file = new File([blob], "audio.webm", { type: "audio/webm" });
    const form = new FormData();
    form.append("audio", file);
    form.append("title", prompt("Note title (optional):") || "Untitled");
    onSend(form);
  };

  return (
    <div className="recorder">
      <button onClick={recording ? stop : start}>
        {recording ? "⏹ Stop" : "🎤 Record"}
      </button>
      {audioURL && (
        <>
          <audio controls src={audioURL} />
          <button onClick={handleSend}>Upload & Transcribe</button>
        </>
      )}
    </div>
  );
}
