import axios from "axios";

const base = import.meta.env.VITE_API_URL;

export const listNotes = () => axios.get(`${base}/notes`).then((r) => r.data);
export const createNote = (formData) =>
  axios
    .post(`${base}/notes`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((r) => r.data);
export const updateNote = (id, data) =>
  axios.put(`${base}/notes/${id}`, data).then((r) => r.data);
export const deleteNote = (id) =>
  axios.delete(`${base}/notes/${id}`).then((r) => r.data);
export const summarizeNote = (id) =>
  axios.post(`${base}/notes/${id}/summarize`).then((r) => r.data);
