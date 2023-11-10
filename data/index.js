import { promises as fs } from "fs";

import getTokens from "./tokens/index.js";
import { compileDoc, getDocByKey } from "./utils.js";

import data from "./data.json" assert { type: "json" };

const french = [
  /“C’est un des.*contempler,”/,
  /“et c’est aussi.*du prochain.”/,
  "“Un fait étrange, unique dans les annales de l’humanité,”",
  "“Prodige de science, mais aussi prodige de beauté”",
  "“Des milliers de martyrs,”",
  "“Les Apôtres,”",
  /“sont accourus.*rán.”/,
  "“J’avoue même,”",
  /“que, si je voyais.*de ces grands avantages.”/,
  /“L’opinion générale.*âmes a peu près.”/,
  /“. . . Le Bábisme a pris.*grandes religions.”/,
];

const getParts = (para, removeFrench) => {
  if (para.section) return [];
  if (!para.lines) {
    if (!removeFrench) return para.parts;
    return para.parts.map((p) => ({
      ...p,
      text: french.reduce((res, f) => res.replace(f, ""), p.text),
    }));
  }
  return para.lines.reduce(
    (res, x) => (res.length === 0 ? x : [...res, { text: " " }, ...x]),
    []
  );
};

const fullStems = {};
const specialStems = {
  advant: "advance",
  activ: "activity",
  popul: "population",
  train: "training",
  sever: "severe",
  temp: "tempest",
};
const getStemWord = (stem) => {
  return (
    specialStems[stem] ||
    [...fullStems[stem]].sort((a, b) => a.length - b.length)[0]
  );
};

const itemLengths = {};
const tokenPairs = new Map();
const tokenTotals = {};

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
    const distinct = [...new Set(tokens.map((t) => t.token))].sort();
    for (let i = 0; i < distinct.length; i++) {
      if (!tokenTotals[distinct[i]]) tokenTotals[distinct[i]] = 0;
      tokenTotals[distinct[i]]++;
      for (let j = i + 1; j < distinct.length; j++) {
        if (
          !distinct[i].includes(distinct[j]) &&
          !distinct[j].includes(distinct[i])
        ) {
          const pairKey = `${distinct[i]}_${distinct[j]}`;
          tokenPairs.set(pairKey, (tokenPairs.get(pairKey) || 0) + 1);
        }
      }
    }
    length += tokens.length;
  }
  for (const t of Object.keys(scores)) {
    if (!searchIndex[t]) searchIndex[t] = [];
    searchIndex[t].push(scores[t] === 2 ? `${key}` : `${key}:${scores[t]}`);
  }
  itemLengths[key] = 1 / Math.sqrt(Math.max(length, 100));
};

const citationsMap = [];

data.forEach(({ id }, index) => {
  console.log(id);
  const doc = compileDoc(data, index, false);
  if (doc.length > 1) {
    doc.paragraphs.forEach((para, i) => {
      if (!para.quote) {
        updateIndex(`${index}_${i}`, [
          getParts(para, id === "shoghi-effendi-god-passes-by-002"),
        ]);
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

const topPairs = ["cluster", "love", "test"]
  .map((w) => getTokens(w)[0])
  .reduce((res, k) => ({ ...res, [k]: [] }), {});

for (const [key, count] of tokenPairs.entries()) {
  if (count > 1) {
    const [k1, k2] = key.split("_");
    if (topPairs[k1]) {
      topPairs[k1].push({
        word: getStemWord(k2),
        score: count / (tokenTotals[k1] + tokenTotals[k2]),
      });
    }
    if (topPairs[k2]) {
      topPairs[k2].push({
        word: getStemWord(k1),
        score: count / (tokenTotals[k1] + tokenTotals[k2]),
      });
    }
  }
}

await Promise.all([
  fs.writeFile(
    "./data/stems.txt",
    stemKeys
      // .filter((k) => stemKeys.some((k2) => k2 === `${k}i`))
      .sort()
      .map((stem) => `${stem}: ${[...fullStems[stem]].sort().join(", ")}`)
      // .map((stem) =>
      //   [stem, `${stem}i`]
      //     .filter((s) => fullStems[s])
      //     .map((s) => `${s}: ${[...fullStems[s]].sort().join(", ")}`)
      //     .join("\n")
      // )
      .join("\n\n")
  ),
  fs.writeFile(
    `./data/pairs.json`,
    JSON.stringify(
      Object.keys(topPairs).reduce(
        (res, k) => ({
          ...res,
          [getStemWord(k)]: topPairs[k]
            .sort((a, b) => b.score - a.score)
            .map((x) => x.word)
            .slice(0, 50),
        }),
        {}
      ),
      null,
      2
    ),
    "utf-8"
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
        .map((c) => ({ ...c, score: (c.citations || 0) * itemLengths[c.key] }))
        .sort((a, b) => b.score - a.score || a.key.localeCompare(b.key))
        .slice(0, 50)
        .map((a) => getDocByKey(data, a.key))
    ),
    "utf-8"
  ),
]);
