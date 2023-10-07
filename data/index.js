import { promises as fs } from "fs";

import data from "./data.json" assert { type: "json" };

const unique = (x) => [...new Set(x)];

const filterText = (text, min) => {
  if (text.length === 0) return "";
  const res = text.reduce((res, t) => {
    if (t.count >= min) {
      return [...res, t];
    }
    if (typeof res[res.length - 1] !== "string") res.push("");
    res[res.length - 1] = res[res.length - 1] + t.text;
    return res;
  }, []);
  const mapped = res.map((x, i) =>
    typeof x === "string"
      ? {
          text:
            !/\w/.test(x) ||
            (i > 0 && i < res.length - 1 && x.trim().split(" ").length === 1)
              ? x
              : " . . . ",
        }
      : x
  );
  if (mapped.length === 1 && mapped[0].text === " . . . ") return "";
  if (mapped[0].text === " . . . ") {
    mapped[0].text = ". . . ";
  }
  if (mapped[mapped.length - 1].text === " . . . ") {
    mapped[mapped.length - 1].text = " . . .";
  }
  return mapped.map((m) => m.text).join("");
};

const getTime = (words) => {
  const time = words / 238;
  if (time < 1) return "●";
  if (time < 5) return "●●";
  if (time < 30) return "●●●";
  return "●●●●";
};

const getFirstChar = (index, text) => {
  if (index !== 1) return undefined;
  if (text.startsWith(". . .")) return undefined;
  const result = /[a-z]/i.exec(text)?.index;
  return result === undefined ? result : result + 1;
};

const getRef = (doc, paras) => ({
  id: doc.id,
  paragraph: paras[0],
  author: doc.author,
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

const documents = Object.keys(data)
  .filter((id) => !["bible", "quran"].some((s) => id.startsWith(s)))
  .map((id) => {
    const { paragraphs, path, ...info } = data[id];

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
    const titlePath =
      cleanPath[0] === "The World Order of Bahá’u’lláh"
        ? cleanPath
        : unique([...cleanPath, info.title]).slice(0, -1);

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
          const allCitations = new Set(
            (p.citations || [])
              .filter((c) => c.start <= start && c.end >= end)
              .map((c) => c.doc)
          );
          const distinctCitations = new Set(
            (p.citations || [])
              .filter((c) => c.start <= start && c.end >= end)
              .map((c) =>
                c.doc.startsWith("compilations") &&
                c.doc !== "compilations-bahai-org-001"
                  ? "compilations"
                  : c.doc.startsWith("ruhi")
                  ? "ruhi"
                  : c.doc
              )
          );
          return [
            {
              start,
              end,
              text: text.slice(start, end),
              first: first !== undefined && end <= first,
              distinctCitations,
              count: allCitations.size,
              quote: !!quotes.find((q) => q.start <= start && q.end >= end),
            },
            ...(quote
              ? [
                  {
                    start: end,
                    end,
                    text:
                      " [" +
                      getRef(data[quote.doc], [quote.paragraph]).path.join(
                        ", "
                      ) +
                      "]",
                    distinctCitations,
                    count: allCitations.size,
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
            text: parts
              .filter((p) => !p.ref)
              .map((p) => ({ ...p, quote: true })),
            refs: [
              ...new Set(
                parts.filter((p) => p.ref).map((p) => JSON.stringify(p.ref))
              ),
            ].map((s) => JSON.parse(s)),
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
        distinctCitations: (p.type === "quote"
          ? []
          : p.type === "lines"
          ? p.lines.flat()
          : p.text
        )
          .map((t) => t.distinctCitations)
          .reduce((res, n) => new Set([...res, ...n]), new Set()),
        score:
          (p.type === "quote"
            ? []
            : p.type === "lines"
            ? p.lines.flat()
            : p.text
          )
            // .map((t) => t.citationDocs)
            // .reduce((res, n) => new Set([...res, ...n]), new Set()).size,
            .map(
              (t) =>
                Math.pow(t.distinctCitations.size, 2) * t.text.split(" ").length
            )
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
        initial: filterText(
          p.type === "lines"
            ? p.lines.reduce(
                (res, l, i) => [
                  ...res,
                  ...(i === 0 ? [] : [{ text: " ", count: 0 }]),
                  ...l,
                ],
                []
              )
            : p.text,
          (p.max * 2) / 3
        ).replace(/^(.{50}[^ ]*).*/, "$1"),
        initialLong: filterText(
          p.type === "lines"
            ? p.lines.reduce(
                (res, l, i) => [
                  ...res,
                  ...(i === 0 ? [] : [{ text: " ", count: 0 }]),
                  ...l,
                ],
                []
              )
            : p.text,
          (p.max * 2) / 3
        ).replace(/^(.{200}[^ ]*).*/, "$1"),
      }));
    allParagraphs.push(...paras);

    const idNum = parseInt(id.slice(-3), 10);
    const prevId = id.slice(0, -3) + `${idNum - 1}`.padStart(3, "0");
    const nextId = id.slice(0, -3) + `${idNum + 1}`.padStart(3, "0");

    const fullWords = words.reduce((res, n) => res + n, 0);
    const fullMax = Math.max(...paras.map((p) => p.max));
    return {
      ...info,
      ...(titlePath.length > 0 ? { path: titlePath } : {}),
      prev: data[prevId] && prevId,
      next: data[nextId] && nextId,
      fullPath: cleanPath,
      time: getTime(fullWords),
      mins:
        fullWords / 238 > 60
          ? `${Math.round((fullWords / 238 / 60) * 10) / 10} hours`
          : fullWords / 238 < 5
          ? `${Math.round(fullWords / 238)} mins`
          : `${Math.round(fullWords / 238 / 5) * 5} mins`,
      score: paras
        .map((p) => p.distinctCitations)
        .reduce((res, n) => new Set([...res, ...n]), new Set()).size,
      //    *
      // (paras.map((p) => p.score).reduce((res, n) => res + n, 0) /
      //   Math.sqrt(paras.length)),
      initial:
        getTime(fullWords).length === 1
          ? filterText(
              paras
                .reduce(
                  (res, p, i) => [
                    ...res,
                    ...(i === 0 ? [] : [[{ text: " ", count: 0 }]]),
                    ...(p.type === "lines" ? p.lines : [p.text]),
                  ],
                  []
                )
                .flat(),
              (fullMax * 2) / 3
            ).replace(/^(.{50}[^ ]*).*/, "$1")
          : texts.join(" ").replace(/^(.{50}[^ ]*).*/, "$1"),
      initialLong:
        getTime(fullWords).length === 1
          ? filterText(
              paras
                .reduce(
                  (res, p, i) => [
                    ...res,
                    ...(i === 0 ? [] : [[{ text: " ", count: 0 }]]),
                    ...(p.type === "lines" ? p.lines : [p.text]),
                  ],
                  []
                )
                .flat(),
              (fullMax * 2) / 3
            ).replace(/^(.{200}[^ ]*).*/, "$1")
          : texts.join(" ").replace(/^(.{200}[^ ]*).*/, "$1"),
      // score:
      //   paras.map((p) => p.score).reduce((res, n) => res + n, 0) /
      //   Math.sqrt(paras.length),
      // score: Math.max(...paras.map((p) => p.score)),
      allType:
        (info.id.startsWith("ruhi") &&
          info.id !== "ruhi-the-bahai-faith-001") ||
        paras.every((p) => p.section || p.lines || p.type) ||
        undefined,
      compilation:
        (info.id.startsWith("ruhi") &&
          info.id !== "ruhi-the-bahai-faith-001") ||
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
  "Compassion",
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
    // if (!Object.keys(prayerCategories).find((c) => prayerCategories[c](text))) {
    //   console.log(d.initial);
    // }
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
