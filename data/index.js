import { promises as fs } from "fs";

import getTokens from "./tokens/index.js";
import { compileDoc, getDocByKey } from "./utils.js";

import data from "./data.json" assert { type: "json" };

const getLast = (x) => x[x.length - 1];
const getParts = (para) => {
  if (para.section) return [{ text: para.title || "" }];
  if (!para.lines) return para.parts;
  return para.lines.reduce(
    (res, x) =>
      res.length === 0 ? x : [...res, { text: " ", citations: 1 }, ...x],
    []
  );
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
const doublesCounter = {};
const updateIndex = (key, chunks) => {
  const grouped = [
    chunks.filter((c) => !c[0].citations).flat(),
    ...chunks.filter((c) => c[0].citations),
  ];
  const scores = {};
  grouped.forEach((chunk, k) => {
    const tokens = chunk.flatMap((part) =>
      getTokens(part.text).map((token) => ({
        token,
        citations: part.citations || 0,
      }))
    );
    tokens.forEach((t) => {
      if (!scores[t.token]) scores[t.token] = grouped.map(() => 0);
      if (k > 0) scores[t.token][k] += t.citations;
      scores[t.token][0]++;
    });
    tokens.slice(0, -1).forEach((t1, i) => {
      const t2 = tokens[i + 1];
      const t = {
        token: `${t1.token}_${t2.token}`,
        citations: (t1.citations + t2.citations) / 2,
      };
      if (!doublesCounter[t.token]) doublesCounter[t.token] = 0;
      doublesCounter[t.token] += 1;
      if (!scores[t.token]) scores[t.token] = grouped.map(() => 0);
      if (k > 0) scores[t.token][k] += t.citations;
      scores[t.token][0]++;
    });
  });
  for (const t of Object.keys(scores)) {
    if (!searchIndex[t]) searchIndex[t] = [];
    searchIndex[t].push(`${key}:${scores[t].join(",")}`);
  }
};

const citationsMap = [];

data.forEach(({ id }, index) => {
  console.log(id);
  const doc = compileDoc(data, index, false);
  if (doc.length > 1) {
    doc.paragraphs.forEach((para, i) => {
      updateIndex(`${index}_${i}`, getParaChunks(para));
      citationsMap.push({ key: `${index}_${i}`, citations: para.citations });
    });
  } else {
    updateIndex(
      `${index}`,
      doc.paragraphs.flatMap((para) => getParaChunks(para))
    );
    citationsMap.push({ key: `${index}`, citations: doc.citations });
  }
});
for (const k of Object.keys(doublesCounter)) {
  if (doublesCounter[k] < 5) delete searchIndex[k];
}

await Promise.all([
  fs.writeFile(
    `./data/data.json`,
    JSON.stringify(data)
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
        .map((a) => getDocByKey(data, a.key))
    ),
    "utf-8"
  ),
]);
