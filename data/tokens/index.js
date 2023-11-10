import stem from "./stem.js";
import stopwords from "./stopwords.js";

export default (text, onStem) => {
  if (!text) return [];
  const words = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .normalize("NFC")
    .replace(/—/g, " ")
    .replace(/’s\b/g, "")
    .replace(/[^ a-z0-9‑]/g, "")
    .split(/ +/g)
    .flatMap((s) =>
      s.includes("‑") ? [s.replace(/‑/g, ""), ...s.split(/‑/g)] : [s]
    )
    .filter((s) => s);
  return words
    .filter(
      (w) => !(stopwords.includes(w) || (w.length <= 2 && !/[0-9]/.test(w)))
    )
    .map((w) => {
      const res = stem(w);
      if (onStem) onStem(w, res);
      return res;
    });
};
