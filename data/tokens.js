import stem from "./stem/index.js";

const stopwords = [
  "the",
  "and",
  "that",
  "his",
  "this",
  "for",
  "all",
  "with",
  // "god",
  "are",
  "which",
  "their",
  "have",
  "from",
  // "will",
  "its",
  "they",
  "thy",
  "not",
  "one",
  // "world",
  "who",
  "was",
  "been",
  "them",
  "him",
  "thou",
  "hath",
  // "bahai",
  "has",
  "you",
  "these",
  "such",
  "but",
  "may",
  // "bahaullah",
  "upon",
  // "faith",
  "your",
  "most",
  "cause",
  "were",
  "through",
  "had",
  "thee",
  "every",
  "can",
  // "spiritual",
  "should",
  "unto",
  "would",
  "must",
  "those",
  // "divine",
  "when",
  // "lord",
  "our",

  "myself",
  "ours",
  "ourselves",
  "yours",
  "yourself",
  "yourselves",
  "himself",
  "she",
  "her",
  "hers",
  "herself",
  "itself",
  "theirs",
  "themselves",
  "what",
  "whom",
  //   "being",
  "having",
  "does",
  "did",
  // "doing",
  "could",
  // "ought",
  "because",
  "until",
  "while",
  "about",
  //   "against",
  //   "between",
  "into",
  //   "during",
  //   "before",
  //   "after",
  //   "above",
  //   "below",
  "down",
  "out",
  "off",
  //   "over",
  //   "under",
  "again",
  //   "further",
  "then",
  //   "once",
  "here",
  "there",
  "where",
  "why",
  "how",
  "any",
  // "both",
  "each",
  //   "few",
  //   "more",
  //   "other",
  //   "some",
  //   "only",
  "own",
  //   "same",
  "than",
  "too",
  //   "very",
];

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
