import stem from "./stem.js";
import stopwords from "./stopwords.js";

export default (text) => {
  if (!text) return [];
  const words = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .normalize("NFC")
    .replace(/—/g, " ")
    .replace(/[^ a-z0-9‑]/g, "")
    .split(/ +/g)
    .flatMap((s) => [s.replace(/‑/g, ""), ...s.split(/‑/g)])
    .filter((s) => s);
  return [
    ...new Set(words.filter((w) => !stopwords.includes(w)).map((w) => stem(w))),
  ];
};
