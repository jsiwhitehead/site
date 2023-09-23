import { promises as fs } from "fs";

import data from "./data.json" assert { type: "json" };

const unique = (x) => [...new Set(x)];

// for (const id of Object.keys(quotes).filter((id) => documentMap[id])) {
//   for (const para of Object.keys(quotes[id])) {
//     const fixedParts = quotes[id][para].map((p) => {
//       const text = documentMap[id].paragraphs[parseInt(para, 10)].text;
//       if (!text) console.log(p.ref);
//       return { ref: p.ref, start: p.start || 0, end: p.end || text?.length };
//     });
//     const splits = [
//       ...new Set(fixedParts.flatMap((p) => [p.start, p.end])),
//     ].sort((a, b) => a - b);
//     documentMap[id].paragraphs[para].citations = {
//       refs: [...new Set(fixedParts.map((p) => JSON.stringify(p.ref)))].map(
//         (s) => JSON.parse(s)
//       ),
//       parts: splits
//         .slice(0, -1)
//         .map((start, i) => {
//           const end = splits[i + 1];
//           const count = [
//             ...new Set(
//               fixedParts
//                 .filter((p) => p.start <= start && p.end >= end)
//                 .map((p) => p.ref.id)
//             ),
//           ].length;
//           return { start, end, count };
//         })
//         .filter((x) => x.count),
//     };
//   }
// }

const getTime = (words) => {
  const time = words / 238;
  if (time < 1.6) return "●"; // 0.2
  if (time < 5) return "●●"; // 0.7
  if (time < 16) return "●●●"; // 1.2
  if (time < 50) return "●●●●"; // 1.7
  return "●●●●●";
};

const getFirstChar = (index, text) => {
  if (index !== 1) return undefined;
  const result = /[a-z]/i.exec(text)?.index;
  return result === undefined ? result : result + 1;
};

const getRef = (doc, paras) => ({
  id: doc.id,
  paragraph: paras[0],
  path: unique(
    [
      doc.author,
      ...(doc.path || []).filter(
        (p) =>
          ![
            "Selections from the Writings of the Báb",
            "Part Two: Letters from Shoghi Effendi",
            "Selected Messages of the Universal House of Justice",
            "Additional",
          ].includes(p)
      ),
      doc.title || (doc.item && `#${doc.item}`),
      paras &&
        (paras.length === 1
          ? doc.paragraphs[paras[0]].index &&
            `para ${doc.paragraphs[paras[0]].index}`
          : `paras ${Math.min(
              ...paras.map((p) => doc.paragraphs[p].index).filter((x) => x)
            )}‑${Math.max(
              ...paras.map((p) => doc.paragraphs[p].index).filter((x) => x)
            )}`),
    ].filter((x) => x)
  ),
});

const allParagraphs = [];

const dataKeys = Object.keys(data);
const fromBab = dataKeys.filter((k) => data[k].years[1] > 1853).length;
const fromBahaullah = dataKeys.filter((k) => data[k].years[1] > 1892).length;
const fromAbdulBaha = dataKeys.filter((k) => data[k].years[1] > 1921).length;
const getPotentialCount = (author, docIndex) => {
  if (author === "The Báb") return fromBab;
  if (author === "Bahá’u’lláh") return fromBahaullah;
  if (author === "‘Abdu’l‑Bahá") return fromAbdulBaha;
  return dataKeys.length - docIndex;
};

const getParaText = (para) => {
  if (para.section) return para.title || "";
  return para.parts
    .map((p) => {
      if (typeof p === "string") return p;
      return getParaText(data[p.doc].paragraphs[p.paragraph]).slice(
        p.start,
        p.end
      );
    })
    .join("");
};

const getParaQuotes = (para, maxLength) => {
  if (para.section) return [];
  let index = 0;
  return para.parts
    .map((p) => {
      if (typeof p === "string") {
        index += p.length;
        return null;
      }
      const len = p.end - p.start;
      const res = {
        doc: p.doc,
        paragraph: p.paragraph,
        start: Math.max(index - 1, 0),
        end: Math.min(index + len + 1, maxLength),
      };
      index += len;
      return res;
    })
    .filter((x) => x);
};

const documents = dataKeys.map((id, docIndex) => {
  const { paragraphs, path, ...info } = data[id];

  // const potentialCount = Math.log(
  //   getPotentialCount(info.author, docIndex) * 0.1 + 1
  // );

  const cleanPath =
    path &&
    unique(
      path.filter(
        (p) =>
          ![
            "Selections from the Writings of the Báb",
            "Part Two: Letters from Shoghi Effendi",
          ].includes(p)
      )
    );
  const titlePath = unique([...cleanPath, info.title]).slice(0, -1);

  const texts = paragraphs.map((p) =>
    getParaText(p)
      .normalize("NFD")
      .replace(/\u0323/g, "")
      .normalize("NFC")
  );
  const words = texts.map((t) => t.split(" ").length);

  const paras = paragraphs
    .map((p, i) => {
      const text = texts[i];
      const first = getFirstChar(p.index, text);
      const quotes = getParaQuotes(p, text.length);
      const indices = unique([
        0,
        ...(first === undefined ? [] : [first]),
        ...(p.citations || []).flatMap((c) => [c.start, c.end]),
        ...(p.lines || []).flatMap((l) => [l - 1, l]),
        ...quotes.flatMap((q) => [q.start, q.end]),
        text.length,
      ]).sort((a, b) => a - b);
      const parts = indices.slice(1).flatMap((end, j) => {
        const start = indices[j];
        const quote = quotes.find((q) => q.end === end);
        const count = new Set(
          (p.citations || [])
            .filter((c) => c.start <= start && c.end >= end)
            .map((c) => c.doc)
        ).size;
        return [
          {
            start,
            end,
            text: text.slice(start, end),
            first: first !== undefined && end <= first,
            count,
            citationDocs: new Set(
              (p.citations || [])
                .filter((c) => c.start <= start && c.end >= end)
                .map((c) => c.doc)
            ),
            quote: !!quotes.find((q) => q.start <= start && q.end >= end),
          },
          ...(quote
            ? [
                {
                  start: end,
                  end,
                  text:
                    " [" +
                    getRef(data[quote.doc], [quote.paragraph]).path.join(", ") +
                    "]",
                  count,
                  citationDocs: new Set(
                    (p.citations || [])
                      .filter((c) => c.start <= start && c.end >= end)
                      .map((c) => c.doc)
                  ),
                  ref: getRef(data[quote.doc], [quote.paragraph]),
                },
              ]
            : []),
        ];
      });
      const max = Math.max(...parts.map((t) => t.count));
      if (p.lines) {
        return {
          index: p.index,
          type: "lines",
          lines: p.lines.slice(0, -1).map((start, j) => {
            const end = p.lines[j + 1] - 1;
            return parts.filter((x) => x.start >= start && x.end <= end);
          }),
          citations: p.citations,
          max,
        };
      }
      const textParts = parts.filter(
        (p) => p.text.trim() && p.text.trim() !== ". . ." && !p.ref
      );
      if (textParts.length > 0 && textParts.every((p) => p.quote)) {
        return {
          ...p,
          type: "blockquote",
          text: parts,
          max,
        };
      }
      return {
        ...p,
        text: parts,
        max,
      };
    })
    .map((p, i) => ({
      id,
      prayer: info.type === "Prayer",
      author: p.author || info.author,
      epoch: info.epoch,
      years: info.years,
      ref: getRef(data[id], [i]),
      citationDocs: (p.type === "quote"
        ? []
        : p.type === "lines"
        ? p.lines.flat()
        : p.text
      )
        .map((t) => t.citationDocs)
        .reduce((res, n) => new Set([...res, ...n]), new Set()),
      score:
        (p.type === "quote" ? [] : p.type === "lines" ? p.lines.flat() : p.text)
          // .map((t) => t.citationDocs)
          // .reduce((res, n) => new Set([...res, ...n]), new Set()).size,
          .map((t) => Math.pow(t.count, 2) * t.text.split(" ").length)
          .reduce((res, n) => res + n, 0) / words[i], // / potentialCount,
      // score: Math.max(
      //   ...(p.type === "quote"
      //     ? []
      //     : p.type === "lines"
      //     ? p.lines.flat()
      //     : p.text
      //   ).map((t) => t.count)
      // ),
      ...p,
      parts: undefined,
      citations: p.citations?.map((c) => getRef(data[c.doc], [c.paragraph])),
    }));
  allParagraphs.push(...paras);

  const idNum = parseInt(id.slice(-3), 10);
  const prevId = id.slice(0, -3) + `${idNum - 1}`.padStart(3, "0");
  const nextId = id.slice(0, -3) + `${idNum + 1}`.padStart(3, "0");

  const fullWords = words.reduce((res, n) => res + n, 0);
  return {
    ...info,
    ...(titlePath.length > 0 ? { path: titlePath } : {}),
    prev: data[prevId] && prevId,
    next: data[nextId] && nextId,
    fullPath: cleanPath,
    time: getTime(fullWords),
    score: paras
      .map((p) => p.citationDocs)
      .reduce((res, n) => new Set([...res, ...n]), new Set()).size,
    // score:
    //   paras.map((p) => p.score).reduce((res, n) => res + n, 0) /
    //   Math.sqrt(paras.length),
    // score: Math.max(...paras.map((p) => p.score)),
    allType:
      info.id.startsWith("ruhi") ||
      paras.every((p) => p.section || p.lines || p.type) ||
      undefined,
    compilation:
      info.id.startsWith("ruhi") ||
      paras.every((p) => p.section || p.type) ||
      undefined,
    paragraphs: paras,
  };
});

const prayerCategories = {
  ayyamiha: (text) => text.includes("ayyam‑i‑ha"),
  nawruz: (text) => text.includes("naw‑ruz"),
  washington: (text) => text.includes("washington"),
  america: (text) => text.includes("america"),
  thedead: (text) => text.includes("the prayer for the dead"),
  obligatory: (text) => text.includes("to be recited"),
  narrative: (text) =>
    ["the purest branch", "‘ali the great"].some((s) => text.includes(s)),
  government: (text) =>
    ["democracy", "government"].some((s) => text.includes(s)),
  temple: (text) =>
    ["mashriqu’l‑adhkar", "edifice"].some((s) => text.includes(s)),
  fast: (text) => /\bthe fast\b/.test(text),
  birth: (text) =>
    ["my womb", "childless", "her mother", "pangs of labour"].some((s) =>
      text.includes(s)
    ),
  parents: (text) =>
    ["their parents. this", "my parents, and", "mother"].some((s) =>
      text.includes(s)
    ) && !text.includes("book"),
  marriage: (text) =>
    ["marri", "two souls", "two unrestrained"].some((s) => text.includes(s)),
  family: (text) => text.includes("this family"),
  long: (text) => text.length > 1550,
  journey: (text) => ["my home", "return"].every((s) => text.includes(s)),
  morning: (text) =>
    ["have wakened", "this morning"].some((s) => text.includes(s)) &&
    !text.includes("evening"),
  midnight: (text) => text.includes("midnight"),
  healing: (text) =>
    ["is sick", "sore sick", "is my remedy", "ocean of thy healing"].some((s) =>
      text.includes(s)
    ),
  youth: (text) => ["youth", "stalk"].some((s) => text.includes(s)),
  children: (text) =>
    [
      "babe",
      "child",
      "infant",
      "seedling",
      "tiny seed",
      "twig",
      "sapling",
      "tender plant",
      "little maidservant",
      "little handmaid",
    ].some((s) => text.includes(s)) && !text.includes("governor"),
  departed: (text) =>
    [
      "ascended to",
      "ascended unto",
      "surviving",
      "precious river",
      "abandoned",
      "admit them",
    ].some((s) => text.includes(s)) && !text.includes("earth"),
  women: (text) =>
    ["daughter", "enable her", "from herself"].some((s) => text.includes(s)) ||
    (text.includes("maid") && !/\b(servants|friends)\b/.test(text)),
  tests: (text) =>
    [
      "mischief",
      "enemies",
      "adversaries",
      "wicked",
      "repudiat",
      "infidel",
    ].some((s) => text.includes(s)),
  gathering: (text) =>
    [
      "meeting",
      "assembly",
      "this assemblage",
      "this gathering",
      "these are",
      "these servants are",
      "these souls have",
    ].some((s) => text.includes(s)),
};

const prayerThemes = [
  "Longing",
  "Illumination",
  "Illumination",
  "Unity",
  "Abundance",
  "Compassion",
  "Abundance",
  "Unity",
  "Steadfastness",
  "Illumination",
  "Unity",
  "Abundance",
  "Illumination",
  "Compassion",
  "Illumination",
  "Illumination",
  "Steadfastness",
  "Unity",
  "Illumination",
  "Illumination",
  "Abundance",
  "Unity",
  "Compassion",
  "Longing",
  "Abundance",
  "Unity",
  "Steadfastness",
  "Compassion",
  "Steadfastness",
  "Illumination",
  "Abundance",
  "Longing",
  "Abundance",
  "Compassion",
  "Longing",
  "Unity",
  "Longing",
  "Steadfastness",
  "Steadfastness",
  "Unity",
  "Longing",
  "Abundance",
  "Abundance",
  "Steadfastness",
  "Compassion",
  "Illumination",
  "Illumination",
  "Abundance",
  "Illumination",
  "Compassion",
  "Abundance",
  "Illumination",
  "Compassion",
  "Steadfastness",
  "Unity",
  "Steadfastness",
  "Abundance",
  "Abundance",
  "Steadfastness",
  "Steadfastness",
  "Compassion",
  "Compassion",
  "Steadfastness",
  "Longing",
  "Abundance",
  "Illumination",
  "Unity",
  "Abundance",
  "Steadfastness",
  "Compassion",
  "Abundance",
  "Longing",
  "Longing",
  "Illumination",
  "Abundance",
  "Compassion",
  "Longing",
  "Unity",
  "Compassion",
  "Abundance",
  "Longing",
  "Compassion",
  "Abundance",
  "Longing",
  "Compassion",
  "Longing",
  "Illumination",
  "Illumination",
  "Longing",
  "Steadfastness",
  "Compassion",
  "Compassion",
  "Longing",
  "Illumination",
  "Steadfastness",
  "Longing",
  "Compassion",
  "Compassion",
  "Abundance",
  "Compassion",
  "Longing",
  "Illumination",
  "Abundance",
  "Illumination",
  "Longing",
  "Illumination",
  "Illumination",
  "Unity",
  "Illumination",
  "Unity",
  "Illumination",
  "Steadfastness",
  "Longing",
  "Longing",
  "Steadfastness",
  "Longing",
  "Steadfastness",
  "Steadfastness",
  "Compassion",
  "Unity",
  "Longing",
  "Illumination",
  "Illumination",
  "Unity",
  "Unity",
  "Longing",
  "Illumination",
  "Unity",
  "Compassion",
  "Longing",
  "Unity",
  "Compassion",
  "Compassion",
  "Steadfastness",
  "Longing",
  "Abundance",
  "Compassion",
  "Illumination",
  "Compassion",
  "Illumination",
  "Abundance",
  "Unity",
  "Longing",
  "Longing",
  "Abundance",
  "Illumination",
  "Unity",
  "Longing",
  "Compassion",
  "Steadfastness",
  "Illumination",
  "Abundance",
  "Compassion",
  "Illumination",
  "Illumination",
  "Longing",
  "Longing",
  "Unity",
  "Illumination",
  "Abundance",
  "Abundance",
  "Illumination",
  "Compassion",
  "Unity",
  "Longing",
  "Compassion",
  "Unity",
  "Abundance",
];

let prayerCounter = 0;

const allPrayers = documents
  .filter((d) => d.type === "Prayer")
  .sort((a, b) => a.length - b.length || a.id.localeCompare(b.id))
  .map((d) => {
    const text = d.paragraphs
      .map((p) =>
        p.type === "lines"
          ? p.lines.map((l) => l.map((t) => t.text).join("")).join(" ")
          : p.text.map((t) => t.text).join("")
      )
      .join(" ")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    return {
      ...d,
      category:
        Object.keys(prayerCategories).find((c) => prayerCategories[c](text)) ||
        prayerThemes[prayerCounter++],
    };
  });

const cleanText = (t) =>
  t
    .normalize("NFD")
    .replace(/\u0323/g, "")
    .normalize("NFC");

(async () => {
  await fs.writeFile(
    `./data/writings.json`,
    cleanText(JSON.stringify(documents, null, 2)),
    "utf-8"
  );
  await fs.writeFile(
    `./data/prayers.json`,
    cleanText(JSON.stringify(allPrayers, null, 2)),
    "utf-8"
  );
})();
