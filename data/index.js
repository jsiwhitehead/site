import { promises as fs } from "fs";

import getTokens from "./tokens/index.js";
import { compileDoc, getDocByKey } from "./utils.js";

import data from "./data.json" assert { type: "json" };

const getParts = (para) => {
  if (para.section) return []; // [{ text: para.title || "" }];
  if (!para.lines) return para.parts;
  return para.lines.reduce(
    (res, x) => (res.length === 0 ? x : [...res, { text: " " }, ...x]),
    []
  );
};

const fullStems = {};
const itemLengths = {};

const searchIndex = {};
const doublesCounter = {};
const updateIndex = (key, paraParts) => {
  const scores = {};
  let length = 0;
  for (const parts of paraParts) {
    const tokens = parts.flatMap((part) =>
      getTokens(part.text, (word, stem) => {
        if (!fullStems[stem]) fullStems[stem] = new Set();
        fullStems[stem].add(word);
      }).map((token) => ({
        token,
        citations: (part.citations || 0) + 2,
      }))
    );
    const doubleTokens = tokens.slice(0, -1).map((t1, i) => {
      const t2 = tokens[i + 1];
      const t = {
        token: `${t1.token}_${t2.token}`,
        citations: t1.citations + t2.citations,
      };
      if (!doublesCounter[t.token]) doublesCounter[t.token] = 0;
      doublesCounter[t.token]++;
      return t;
    });
    for (const t of [...tokens, ...doubleTokens]) {
      if (!scores[t.token]) scores[t.token] = 0;
      scores[t.token] += t.citations;
    }
    length += tokens.length;
  }
  for (const t of Object.keys(scores)) {
    if (!searchIndex[t]) searchIndex[t] = [];
    searchIndex[t].push(scores[t] === 2 ? `${key}` : `${key}:${scores[t]}`);
  }
  itemLengths[key] = 1 / Math.sqrt(length);
};

const citationsMap = [];

data.forEach(({ id }, index) => {
  console.log(id);
  const doc = compileDoc(data, index, false);
  if (doc.length > 1) {
    doc.paragraphs.forEach((para, i) => {
      if (!para.quote) {
        updateIndex(`${index}_${i}`, [getParts(para)]);
        citationsMap.push({ key: `${index}_${i}`, citations: para.citations });
      }
    });
  } else {
    updateIndex(
      `${index}`,
      doc.paragraphs.map((para) => (para.quote ? [] : getParts(para)))
    );
    citationsMap.push({ key: `${index}`, citations: doc.citations });
  }
});
for (const k of Object.keys(doublesCounter)) {
  if (doublesCounter[k] < 5) delete searchIndex[k];
}

const stemKeys = Object.keys(fullStems);

await Promise.all([
  fs.writeFile(
    "./data/stems.txt",
    stemKeys
      // .filter((k) => stemKeys.some((k2) => k2 === `${k}i` || k2 === `${k}li`))
      .sort()
      .map((stem) => `${stem}: ${[...fullStems[stem]].sort().join(", ")}`)
      // .map((stem) =>
      //   [stem, `${stem}i`, `${stem}li`]
      //     .filter((s) => fullStems[s])
      //     .map((s) => `${s}: ${[...fullStems[s]].sort().join(", ")}`)
      //     .join("\n")
      // )
      .join("\n\n")
  ),
  fs.writeFile(
    `./data/data.json`,
    JSON.stringify(data)
      .normalize("NFD")
      .replace(/\u0323/g, "")
      .normalize("NFC"),
    "utf-8"
  ),
  fs.writeFile(`./data/search.json`, JSON.stringify(searchIndex), "utf-8"),
  fs.writeFile(`./data/lengths.json`, JSON.stringify(itemLengths), "utf-8"),
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
