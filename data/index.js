import { promises as fs } from "fs";

import getTokens from "../search/index.js";

import data from "./data.json" assert { type: "json" };

const unique = (x) => [...new Set(x)];

const splitParts = (parts, splits) => {
  const sortedSplits = [...new Set(splits)].sort((a, b) => a - b);
  const res = [];
  let index = 0;
  for (const p of parts) {
    let next = index + p.text.length;
    const partSplits = [
      ...new Set([
        0,
        ...sortedSplits
          .filter((c) => index <= c && c <= next)
          .map((c) => c - index),
        p.text.length,
      ]),
    ];
    res.push(
      ...partSplits
        .slice(1)
        .map((c, i) => ({ ...p, text: p.text.slice(partSplits[i], c) }))
    );
    index = next;
  }
  return res;
};
const sliceParts = (parts, start, end) => {
  const res = [];
  let index = 0;
  for (const p of splitParts(parts, [start, end])) {
    let next = index + p.text.length;
    if (next > start && index < end) res.push(p);
    index = next;
  }
  return res;
};

const getPath = (doc, paras) => {
  const indices = paras.map((p) => doc.paragraphs[p].index).filter((x) => x);
  if (doc.path?.[0] === "Additional") {
    return [doc.author];
  }
  return unique(
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
      indices.length > 0 &&
        (indices.length === 1
          ? `para ${indices[0]}`
          : `paras ${Math.min(...indices)}‑${Math.max(...indices)}`),
    ].filter((x) => x)
  );
};

const getParaParts = (para) => {
  if (para.section) throw new Error();
  return para.parts.flatMap((p) => {
    if (typeof p === "string") return [{ text: p }];
    return sliceParts(
      getParaParts(data[p.doc].paragraphs[p.paragraph]),
      p.start,
      p.end
    ).map((part) =>
      part.doc
        ? part
        : {
            doc: p.doc,
            paragraph: p.paragraph,
            ...part,
          }
    );
  });
};

const getFirstChar = (index, text) => {
  if (index !== 1) return undefined;
  if (text.startsWith(". . .")) return undefined;
  const result = /[a-z]/i.exec(text)?.index;
  return result === undefined ? result : result + 1;
};

const distinctCitations = (citations) =>
  citations && [
    ...new Set(
      citations.map((c) =>
        c.doc.startsWith("compilations") &&
        c.doc !== "compilations-bahai-org-001"
          ? "compilations"
          : c.doc.startsWith("ruhi")
          ? "ruhi"
          : c.doc
      )
    ),
  ];

const getLength = (words) => {
  const time = words / 238;
  if (time < 1) return 1;
  if (time < 5) return 2;
  if (time < 30) return 3;
  return 4;
};

const documents = Object.keys(data)
  .filter((id) => !["bible", "quran"].some((s) => id.startsWith(s)))
  // .filter((id) => id === "bahaullah-hidden-words-001")
  // .filter((id) => id === "official-statements-commentaries-bahaullah-001")
  // .filter((id) => id === "shoghi-effendi-advent-divine-justice-001")
  // .filter((id) => id === "bahaullah-call-divine-beloved-003")
  .map((id) => {
    const { paragraphs, ...info } = data[id];

    const totalCitations = [];
    let words = 0;

    const paras = paragraphs.map((para) => {
      if (para.section) return para;
      const baseParts = getParaParts(para);
      const text = baseParts.map((p) => p.text).join("");
      words += text.split(" ").length;
      const first = getFirstChar(!para.lines && para.index, text);
      const split = splitParts(baseParts, [
        ...(first === undefined ? [] : [first]),
        ...(para.citations || []).flatMap((c) => [c.start, c.end]),
        ...(para.lines || []).flatMap((l) => [l - 1, l]),
      ]);
      let index = 0;
      const parts = split.map((p) => {
        const start = index;
        const end = (index += p.text.length);
        const partCitations = [
          ...new Set(
            (para.citations || []).filter(
              (c) => c.start <= start && end <= c.end
            )
            // .map((c) => c.doc)
          ),
        ];
        return {
          ...p,
          ...(first !== undefined && end <= first ? { first: true } : {}),
          ...(partCitations.length > 0
            ? {
                citations: distinctCitations(partCitations).length,
                allCitations: partCitations.length,
              }
            : {}),
        };
      });
      totalCitations.push(...(para.citations || []));
      const paraCitations = Math.max(...parts.map((p) => p.citations || 0));
      if (para.lines) {
        return {
          ...para,
          lines: para.lines.slice(0, -1).map((start, j) => {
            const end = para.lines[j + 1] - 1;
            let index = 0;
            return parts.filter((p) => {
              const pStart = index;
              const pEnd = (index += p.text.length);
              return start <= pStart && pEnd <= end;
            });
          }),
          parts: undefined,
          citations: undefined,
          // ...(para.citations?.length > 0
          //   ? { citations: distinctCitations(para.citations).length }
          //   : {}),
          ...(paraCitations > 0 ? { citations: paraCitations } : {}),
        };
      }
      return {
        ...para,
        parts,
        citations: undefined,
        // ...(para.citations?.length > 0
        //   ? { citations: distinctCitations(para.citations).length }
        //   : {}),
        ...(paraCitations > 0 ? { citations: paraCitations } : {}),
        ...(para.quote
          ? {
              ref: unique(parts.map((p) => p.doc).filter((x) => x)).map((doc) =>
                getPath(
                  data[doc],
                  unique(
                    parts.filter((p) => p.doc === doc).map((p) => p.paragraph)
                  )
                )
              ),
            }
          : {}),
      };
    });

    const docCitations = Math.max(...paras.map((para) => para.citations || 0));
    return {
      ...info,
      // ...(totalCitations.length > 0
      //   ? { citations: distinctCitations(totalCitations).length }
      //   : {}),
      ...(docCitations > 0 ? { citations: docCitations } : {}),
      ...(paras.every((p) => p.type || p.lines) ? { allSpecial: true } : {}),
      length: getLength(words),
      paragraphs: paras,
    };
  });

const cleanText = (t) =>
  t
    .normalize("NFD")
    .replace(/\u0323/g, "")
    .normalize("NFC");

const getLast = (x) => x[x.length - 1];
const getParts = (para) => {
  if (para.section) return [{ text: para.title || "" }];
  if (para.lines) {
    return para.lines.reduce(
      (res, x) =>
        res.length === 0 ? x : [...res, { text: " ", citations: 1 }, ...x],
      []
    );
  }
  const result = para.parts.filter((p) => !p.first);
  result[0].text =
    para.parts
      .filter((p) => p.first)
      .map((p) => p.text)
      .join("") + result[0].text;
  return result;
};
const getParaChunks = (para) => {
  const parts = getParts(para);
  const chunks = [[]];
  for (const p of parts) {
    if (/[a-zA-Z0-9]/.test(p.text)) {
      const prev = getLast(getLast(chunks));
      if (!prev || !p.citations !== !prev.citations) chunks.push([]);
      getLast(chunks).push(p);
    }
  }
  return chunks.map((c) => c.filter((p) => !p.doc)).filter((c) => c.length > 0);
};

const updateIndex = (index, base, chunks) => {
  const grouped = [
    ...chunks.filter((c) => c[0].citations),
    chunks.filter((c) => !c[0].citations).flat(),
  ];
  const scores = {};
  grouped.forEach((chunk, k) => {
    for (const part of chunk) {
      for (const t of getTokens(part.text)) {
        if (!scores[t]) scores[t] = grouped.map(() => 0);
        scores[t][k] = Math.max(scores[t][k], part.citations || 0);
      }
    }
  });
  for (const t of Object.keys(scores)) {
    if (!index[t]) index[t] = [];
    if (grouped.length === 1) index[t].push(base);
    else index[t].push(`${base}:${scores[t].slice(0, -1).join(",")}`);
  }
};
const createIndex = (documents) => {
  const index = {};
  documents.forEach((doc, i) => {
    console.log(doc.id);
    if (doc.length > 1) {
      doc.paragraphs.forEach((para, j) => {
        updateIndex(index, `${i}-${j}`, getParaChunks(para));
      });
    } else {
      updateIndex(
        index,
        `${i}`,
        doc.paragraphs.flatMap((para) => getParaChunks(para))
      );
    }
  });
  return index;
};

await Promise.all([
  fs.writeFile(
    `./data/writings.json`,
    cleanText(JSON.stringify(documents, null, 2)),
    "utf-8"
  ),
  fs.writeFile(
    `./data/search.json`,
    JSON.stringify(createIndex(documents)),
    "utf-8"
  ),
]);
