import stem from "../data/stem";
import { getParagraphLines } from "../data/utils";

const prayerPhrases = [
  "AyyamiHa",
  "NawRuz",
  "Washington",
  "America",
  "The Prayer for the Dead",
  "The Purest Branch",
  "democracy",
  "government",
  "edifice",
  "Mashriqu’lAdhkar",
  "in my womb",
  "leave me not childless",
  "for me and for her mother",
  "as well as for her",
  "pangs of labour",
  "the Fast",
].map((p) => p.split(" "));

export default (doc, tokens, prayers) => {
  const check = (t, prev, next) => {
    const s = stem(t, prev, next);
    if (tokens.includes(s)) return true;
    if (!prayers) return false;
    const whole = [...prev.reverse(), t, ...next];
    if (
      prayerPhrases.some((p) => {
        if (!p.includes(t)) return false;
        const index = prev.length;
        for (let i = -p.length + 1; i <= 0; i++) {
          if (
            whole.slice(index + i, index + i + p.length).join(" ") ===
            p.join(" ")
          ) {
            return true;
          }
        }
      })
    ) {
      return true;
    }
    // if (prayers && prayerTokens.includes(s)) return true;
    // if (prayers && /[0A-Z]/.test(t)) return true;
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
            (check(group.join(""), prev, next) ||
              group.every((c, k) =>
                check(
                  c,
                  [...group.slice(0, k).reverse(), ...prev],
                  [...group.slice(k + 1), ...next]
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
                highlight: check(
                  c,
                  [...group.slice(0, k).reverse(), ...prev],
                  [...group.slice(k + 1), ...next]
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
