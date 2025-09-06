import { useEffect, useRef, useState } from "react";

export default function useRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [blob, setBlob] = useState(null);
  const mediaRef = useRef(null);
  const recorderRef = useRef(null);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRef.current = stream;
    const rec = new MediaRecorder(stream);
    recorderRef.current = rec;
    const chunks = [];
    rec.ondataavailable = (e) => chunks.push(e.data);
    rec.onstop = () => {
      const b = new Blob(chunks, { type: "audio/webm" });
      setBlob(b);
      setAudioURL(URL.createObjectURL(b));
    };
    rec.start();
    setRecording(true);
  };

  const stop = () => {
    recorderRef.current.stop();
    mediaRef.current.getTracks().forEach((t) => t.stop());
    setRecording(false);
  };

  useEffect(
    () => () => {
      if (audioURL) URL.revokeObjectURL(audioURL);
    },
    [audioURL]
  );

  return { recording, audioURL, blob, start, stop };
}
