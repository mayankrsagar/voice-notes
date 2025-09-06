import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
console.log(
  "🔑 OpenAI Key:",
  process.env.OPENAI_API_KEY ? "Loaded ✅" : "Missing ❌"
);

export const transcribeAudio = async (buffer) => {
  const file = { buffer, mimetype: "audio/webm", originalname: "audio.webm" };
  const resp = await openai.audio.transcriptions.create({
    file,
    model: "whisper-1",
  });
  return resp.text.trim();
};

export const summarizeText = async (text) => {
  const prompt = `Summarize the following note in 2-3 concise sentences:\n\n${text}`;
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 100,
    temperature: 0.3,
  });
  return completion.choices[0].message.content.trim();
};
