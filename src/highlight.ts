import stem from "../data/stem";
import { getParagraphLines } from "../data/utils";

const prayerTokens = [
  "marr",
  "dead",
  "democrat",
  "govern",
  "edific",
  "womb",
  "child",
  "mother",
  "fath",
  "parent",
  "fam",
  "return",
  "wake",
  "morn",
  "evening",
  "midnight",
  "youth",
  "stalk",
  "baby",
  "infant",
  "seed",
  "twig",
  "sapl",
  "plant",
  "maid",
  "maiden",
  "handmaid",
  "littl",
  "daught",
  "her",
  "hers",
  "herself",
  "meet",
  "assembl",
  "gath",
  "these",
  "mischief",
  "enem",
  "advers",
  "wicked",
  "repud",
  "infidel",
];

export default (doc, tokens, prayers) => {
  const checkToken = (t) => {
    if (tokens.includes(t)) return true;
    if (prayers && prayerTokens.includes(t)) return true;
    if (prayers && /[0A-Z]/.test(t)) return true;
    return false;
  };

  const lines = doc.paragraphs.map((para) => getParagraphLines(para));
  const highlighted = lines.map((texts) =>
    texts.map(({ text, ...info }) => {
      const phrases = text.split(/([.,;:!?](?=$|[^a-z]* [^a-z]*[a-z])|—)/gi);
      const split = phrases.flatMap((phrase, i) => {
        if (i % 2 === 1) return [{ text: phrase, highlight: false }];
        const words = phrase.split(" ").map((w) => w.split("‑"));
        const cleaned = words.map((group) =>
          group.map((w) =>
            w
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .normalize("NFC")
              .replace(/[^ a-z0-9‑’']/gi, "")
          )
        );
        return cleaned.flatMap((group, j) => {
          const prev = cleaned.slice(0, j).reverse().flat();
          const next = cleaned.slice(j + 1).flat();
          if (
            group.length > 1 &&
            (checkToken(stem(group.join(""), prev, next)) ||
              group.every((c, k) =>
                checkToken(
                  stem(
                    c,
                    [...group.slice(0, k).reverse(), ...prev],
                    [...group.slice(k + 1), ...next]
                  )
                )
              ))
          ) {
            return [
              ...(j > 0 ? [{ text: " ", highlight: false, ...info }] : []),
              { text: words[j].join("‑"), highlight: true, ...info },
            ];
          }
          return [
            ...(j > 0 ? [{ text: " ", highlight: false, ...info }] : []),
            ...group.flatMap((c, k) => [
              ...(k > 0 ? [{ text: "‑", highlight: false, ...info }] : []),
              {
                text: words[j][k],
                highlight: checkToken(
                  stem(
                    c,
                    [...group.slice(0, k).reverse(), ...prev],
                    [...group.slice(k + 1), ...next]
                  )
                ),
                ...info,
              },
            ]),
          ];
        });
      });
      const res = [{ text: "", ...info }];
      for (const s of split) {
        if (s.highlight) res.push(s, { text: "", ...info });
        else res[res.length - 1].text += s.text;
      }
      return res;
    })
  );
  return {
    ...doc,
    paragraphs: highlighted,
  };
};
