import stem from "../data/stem";
import { getParagraphLines } from "../data/utils";

export default (doc, tokens) => {
  const lines = doc.paragraphs.map((para) => getParagraphLines(para));
  const highlighted = lines.map((texts) =>
    texts.map(({ section, text }) => {
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
            (tokens.includes(stem(group.join(""), prev, next)) ||
              group.every((c, k) =>
                tokens.includes(
                  stem(
                    c,
                    [...group.slice(0, k).reverse(), ...prev],
                    [...group.slice(k + 1), ...next]
                  )
                )
              ))
          ) {
            return [
              ...(j > 0 ? [{ text: " ", highlight: false, section }] : []),
              { text: words[j].join("‑"), highlight: true, section },
            ];
          }
          return [
            ...(j > 0 ? [{ text: " ", highlight: false, section }] : []),
            ...group.flatMap((c, k) => [
              ...(k > 0 ? [{ text: "‑", highlight: false, section }] : []),
              {
                text: words[j][k],
                highlight: tokens.includes(
                  stem(
                    c,
                    [...group.slice(0, k).reverse(), ...prev],
                    [...group.slice(k + 1), ...next]
                  )
                ),
                section,
              },
            ]),
          ];
        });
      });
      const res = [{ text: "", section }];
      for (const s of split) {
        if (s.highlight) res.push(s, { text: "", section });
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
