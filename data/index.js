import { promises as fs } from "fs";

import getTokens from "./tokens/index.js";
import { compileDoc } from "./utils.js";

import data from "./data.json" assert { type: "json" };

const base = Object.keys(data)
  .filter((id) => !["bible", "quran"].some((s) => id.startsWith(s)))
  .reduce((res, k) => ({ ...res, [k]: data[k] }), {});

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

const searchIndex = {};
const updateIndex = (key, chunks) => {
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
    if (!searchIndex[t]) searchIndex[t] = [];
    if (grouped.length === 1) searchIndex[t].push(key);
    else searchIndex[t].push(`${key}:${scores[t].slice(0, -1).join(",")}`);
  }
};

const citationsMap = [];

Object.keys(base).forEach((id) => {
  console.log(id);
  const doc = compileDoc(base, id);
  if (doc.length > 1) {
    doc.paragraphs.forEach((para, i) => {
      updateIndex(`${id}_${i}`, getParaChunks(para));
      citationsMap.push({ key: `${id}_${i}`, citations: para.citations });
    });
  } else {
    updateIndex(
      `${id}`,
      doc.paragraphs.flatMap((para) => getParaChunks(para))
    );
    citationsMap.push({ key: id, citations: doc.citations });
  }
});

await Promise.all([
  fs.writeFile(
    `./data/base.json`,
    JSON.stringify(base)
      .normalize("NFD")
      .replace(/\u0323/g, "")
      .normalize("NFC"),
    "utf-8"
  ),
  fs.writeFile(`./data/search.json`, JSON.stringify(searchIndex), "utf-8"),
  fs.writeFile(
    `./data/initial.json`,
    JSON.stringify(
      citationsMap
        .sort(
          (a, b) =>
            (b.citations || 0) - (a.citations || 0) ||
            a.key.localeCompare(b.key)
        )
        .slice(0, 50)
        .map((a) => a.key)
    ),
    "utf-8"
  ),
]);
