import { promises as fs } from "fs";

import getTokens from "./tokens/index.js";
import { compileDoc, getDocByKey } from "./utils.js";

import data from "./json/data.json" assert { type: "json" };

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
  /“La Behá’isme est.*ne craignez rien.”/,
  /“Ce fut une.*notre Grand Gazi\?’”/,
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
  institut: "institution",
  intens: "intensity",
};
const getStemWord = (stem) => {
  return (
    specialStems[stem] ||
    [...fullStems[stem]].sort((a, b) => a.length - b.length)[0]
  );
};

const itemFactors = {};
const itemLengths = {};
const tokenPairs = new Map();
const tokenTotals = {};

const getDateValue = (years) => {
  if (years[0] !== years[1] || !`${years[0]}`.includes(".")) {
    return new Date((years[0] + years[1]) / 2, 0, 1);
  }
  const [y, x] = `${years[0]}`.split(".");
  const m = x.slice(0, 2);
  const d = x.slice(2, 4);
  return new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10));
};
const getDateFactor = (years) => {
  const diff =
    (new Date() - getDateValue(years)) / (1000 * 60 * 60 * 24 * 365.25);
  return 0.6 + 2 / (diff + 5);
};

const searchIndex = new Map();
const counts = {};
const wordCounts = {};
const updateIndex = (docIndex, paraIndex, parts) => {
  const key = `${docIndex}_${paraIndex}`;
  const scores = {};
  const allTokens = [];
  const tokens = [];
  for (const part of parts) {
    const partTokens = getTokens(part.text, (word, stem) => {
      if (!fullStems[stem]) fullStems[stem] = new Set();
      fullStems[stem].add(word);
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }).map((token) => ({
      token,
      citations: (part.citations || 0) + 2,
    }));
    allTokens.push(...partTokens);
    if (!part.doc) tokens.push(...partTokens);
  }
  const doubleTokens = tokens.slice(0, -1).flatMap((t1, i) => {
    const t2 = tokens[i + 1];
    const t = {
      token: [t1.token, t2.token].sort().join("_"),
      citations: t1.citations + t2.citations,
    };
    if (/[0A-Z]/.test(t.token)) return [];
    return [t];
  });
  for (const t of [...tokens, ...doubleTokens]) {
    if (!counts[t.token]) counts[t.token] = 0;
    counts[t.token]++;
    if (!scores[t.token]) scores[t.token] = 0;
    scores[t.token] += t.citations;
  }
  const distinct = [...new Set(tokens.map((t) => t.token))].sort();
  for (let i = 0; i < distinct.length; i++) {
    if (!tokenTotals[distinct[i]]) tokenTotals[distinct[i]] = 0;
    tokenTotals[distinct[i]]++;
    for (let j = i + 1; j < distinct.length; j++) {
      const pairKey = `${distinct[i]}_${distinct[j]}`;
      if (!/[0A-Z]/.test(pairKey)) {
        tokenPairs.set(pairKey, (tokenPairs.get(pairKey) || 0) + 1);
      }
    }
  }
  for (const t of Object.keys(scores)) {
    searchIndex.set(t, [
      ...(searchIndex.get(t) || []),
      scores[t] === 2 ? `${key}` : `${key}:${scores[t]}`,
    ]);
  }
  itemLengths[docIndex][paraIndex] = allTokens.length;
};

const citationsMap = [];

data.forEach(({ id }, index) => {
  console.log(id);
  const doc = compileDoc(data, index, false);
  itemLengths[index] = [];
  doc.paragraphs.forEach((para, i) => {
    if (!para.quote) {
      updateIndex(
        index,
        i,
        getParts(
          para,
          id.startsWith("shoghi-effendi-god-passes-by-002") ||
            id.startsWith("shoghi-effendi-bahai-administration")
        )
      );
      if (doc.epoch && doc.author !== "Shoghi Effendi") {
        itemFactors[index] = getDateFactor(doc.years);
        if (doc.author !== "The Universal House of Justice") {
          itemFactors[index] *= 0.7;
        }
      }
      citationsMap.push({ doc: index, para: i, citations: para.citations });
    } else {
      itemLengths[index][i] = getParts(para).flatMap((part) =>
        getTokens(part.text)
      ).length;
    }
  });
});
for (const k of Object.keys(counts)) {
  if (counts[k] === 1) delete counts[k];
  if (k.includes("_") && counts[k] > 50) {
    // console.log(k, counts[k]);
    searchIndex.delete(k);
    delete counts[k];
  }
}

// console.log(
//   Object.keys(wordCounts)
//     .map((k) => ({ stem: k, count: wordCounts[k] }))
//     .sort((a, b) => b.count - a.count)
//     .slice(0, 500)
//     .map((x) => x.stem)
//     .join("\n")
// );

const topPairs = {};
for (const [key, count] of tokenPairs.entries()) {
  if (count > 1) {
    const [k1, k2] = key.split("_");
    if (!topPairs[k1]) topPairs[k1] = [];
    topPairs[k1].push({
      key: k2,
      word: getStemWord(k2),
      score: count / (tokenTotals[k1] + tokenTotals[k2]),
    });
    if (!topPairs[k2]) topPairs[k2] = [];
    topPairs[k2].push({
      key: k1,
      word: getStemWord(k1),
      score: count / (tokenTotals[k1] + tokenTotals[k2]),
    });
  }
}

const searchIndexObject = {};
for (const [k, v] of searchIndex.entries()) {
  searchIndexObject[k] = v;
}

const stemKeys = Object.keys(fullStems);

await Promise.all([
  fs.writeFile(
    "./data/stem/stems.txt",
    stemKeys
      .filter((k) => !k.includes("‑"))
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
    `./data/json/pairs.json`,
    JSON.stringify(
      Object.keys(topPairs)
        .sort()
        .reduce((res, k) => {
          const items = topPairs[k]
            .sort((a, b) => b.score - a.score)
            // .filter((a, i) => i < 5 || a.score > 0.1);
            .slice(0, 5)
            .map((x) => ({ ...x, score: Math.sqrt(x.score) }));
          if (items.length === 0) return res;
          return { ...res, [k]: items };
        }, {}),
      null,
      2
    ),
    "utf-8"
  ),
  fs.writeFile(
    `./data/json/data.json`,
    JSON.stringify(data)
      .normalize("NFD")
      .replace(/\u0323/g, "")
      .normalize("NFC"),
    "utf-8"
  ),
  fs.writeFile(
    `./data/json/search.json`,
    JSON.stringify(searchIndexObject),
    "utf-8"
  ),
  fs.writeFile(`./data/json/counts.json`, JSON.stringify(counts), "utf-8"),
  fs.writeFile(
    `./data/json/factors.json`,
    JSON.stringify(itemFactors),
    "utf-8"
  ),
  fs.writeFile(
    `./data/json/lengths.json`,
    JSON.stringify(itemLengths),
    "utf-8"
  ),
  fs.writeFile(
    `./data/json/initial.json`,
    JSON.stringify(
      citationsMap
        .map((c) => ({
          ...c,
          score:
            ((c.citations || 0) * (itemFactors[c.doc] || 1)) /
            Math.pow(Math.max(itemLengths[c.doc][c.para], 80), 0.75),
        }))
        .sort((a, b) => b.score - a.score || a.doc - b.doc || a.para - b.para)
        .slice(0, 50)
        .map((d) => getDocByKey(data, d.doc, d.para))
    ),
    "utf-8"
  ),
]);
