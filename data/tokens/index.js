import stem from "../stem/index.js";
import stopwords from "./stopwords.js";

export default (text, onStem) => {
  if (!text) return [];
  const phrases = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .normalize("NFC")
    .replace(/-/g, "‑")
    .split(/[.,;:!?](?=$|[^a-z]* [^a-z]*[a-z])|—/gi)
    .filter((x) => x);
  return phrases.flatMap((phrase) => {
    const words = phrase
      .replace(/[^ a-z0-9‑’']/gi, "")
      .trim()
      .split(/ +/g)
      .flatMap((s) => (s.includes("‑") ? [s, ...s.split(/‑/g)] : [s]))
      .filter(
        (s) =>
          s &&
          (!/[0-9]|^[ivxcl]+([’']s)?$/i.test(s) ||
            s === "i" ||
            s === "ill" ||
            s === "civil")
      );
    return words.flatMap((word, i) => {
      const w = word
        .toLowerCase()
        .replace(/[’']s\b/g, "")
        .replace(/[’']/g, "");
      if (w.length <= 2 || stopwords.includes(w)) return [];
      const res = stem(word, words.slice(0, i).reverse(), words.slice(i + 1));
      if (onStem) onStem(w, res);
      return res;
    });
  });
};
