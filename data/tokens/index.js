import { doubleMetaphone } from "double-metaphone";

import stem from "./stem.js";
import stopwords from "./stopwords.js";

export default (text, onStem) => {
  if (!text) return [];
  const words = text
    .toLowerCase()
    .replace(/[’']s\b/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .normalize("NFC")
    .replace(/-/g, "‑")
    .replace(/—/g, " ")
    .replace(/[^ a-z0-9‑]/g, "")
    .split(/ +/g)
    .flatMap((s) => (s.includes("‑") ? [s, ...s.split(/‑/g)] : [s]))
    .filter((s) => s && (!/[0-9]|^[ivxcl]+$/.test(s) || s === "ill"))
    .filter((w) => w.length > 2 && !stopwords.includes(w));
  return words.map((w) => {
    const res = stem(w);
    if (res[0] === "*") {
      const m = doubleMetaphone(res)[0];
      if (onStem) onStem(w, m);
      return m;
    }
    if (onStem) onStem(w, res);
    return res;
  });
};
