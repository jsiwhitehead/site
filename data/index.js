import { promises as fs } from "fs";

import getTokens from "./tokens.js";
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
// const specialStems = {
//   advant: "advance",
//   activ: "activity",
//   popul: "population",
//   train: "training",
//   sever: "severe",
//   temp: "tempest",
//   institut: "institution",
//   intens: "intensity",
// };
const getStemWord = (stem) => {
  const opts = Object.keys(fullStems[stem]);
  const counts = opts.map((o) => fullStems[stem][o]);
  const max = Math.max(...counts);
  return opts[counts.findIndex((c) => c === max)];
};

// stemKeys.reduce((res, stem) => {
//   const opts = Object.keys(fullStems[stem]);
//   const counts = opts.map((o) => fullStems[stem][o]);
//   const max = Math.max(...counts);
//   res[stem] = opts[counts.findIndex((c) => c === max)];
//   return res;
// }, {})

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
const updateIndex = (docIndex, paraIndex, parts, paraCitations) => {
  const key = `${docIndex}_${paraIndex}`;
  const scores = {};
  const levels = {};
  const allTokens = [];
  const tokens = [];
  const maxCitation = Math.round(
    Math.max(...parts.map((part) => part.allCitations || 0)) * (2 / 3)
  );
  citationsMap.push({
    doc: docIndex,
    para: paraIndex,
    citations: paraCitations,
    level: maxCitation,
  });
  for (const part of parts) {
    const partTokens = getTokens(part.text, (word, stem) => {
      if (!fullStems[stem]) fullStems[stem] = {};
      fullStems[stem][word] = (fullStems[stem][word] || 0) + 1;
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }).map((token) => ({
      token,
      citations: (part.citations || 0) + 2,
      level: Math.min(part.allCitations || 0, maxCitation),
    }));
    allTokens.push(...partTokens);
    if (!part.doc) tokens.push(...partTokens);
  }
  const doubleTokens = tokens.slice(0, -1).flatMap((t1, i) => {
    const t2 = tokens[i + 1];
    const t = {
      token: [t1.token, t2.token].sort().join("_"),
      citations: t1.citations + t2.citations,
      level: 0,
    };
    if (/[0A-Z]/.test(t.token)) return [];
    return [t];
  });
  for (const t of [...tokens, ...doubleTokens]) {
    if (!counts[t.token]) counts[t.token] = 0;
    counts[t.token]++;
    if (!scores[t.token]) scores[t.token] = 0;
    scores[t.token] += t.citations;
    if (!levels[t.token]) levels[t.token] = t.level;
    levels[t.token] = Math.min(t.level, levels[t.token]);
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
    let v = `${key}`;
    if (scores[t] !== 2) v += `:${scores[t]}`;
    if (levels[t]) v += `|${levels[t]}`;
    searchIndex.set(t, [...(searchIndex.get(t) || []), v]);
  }
  itemLengths[docIndex][paraIndex] = {};
  for (let lev = 0; lev <= maxCitation; lev++) {
    itemLengths[docIndex][paraIndex][lev] = allTokens.filter(
      (t) => t.level >= lev
    ).length;
  }
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
        ),
        para.citations
      );
      if (doc.epoch && doc.author !== "Shoghi Effendi") {
        itemFactors[index] = getDateFactor(doc.years);
        if (doc.author !== "The Universal House of Justice") {
          itemFactors[index] *= 0.7;
        }
      }
    } else {
      itemLengths[index][i] = {
        0: getParts(para).flatMap((part) => getTokens(part.text)).length,
      };
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

const allPairs = {};
for (const [key, count] of tokenPairs.entries()) {
  if (count > 1) {
    const [k1, k2] = key.split("_");
    if (!allPairs[k1]) allPairs[k1] = [];
    allPairs[k1].push({
      key: k2,
      score: count / (tokenTotals[k1] + tokenTotals[k2]),
    });
    if (!allPairs[k2]) allPairs[k2] = [];
    allPairs[k2].push({
      key: k1,
      score: count / (tokenTotals[k1] + tokenTotals[k2]),
    });
  }
}
const stemWords = {};
const topPairs = Object.keys(allPairs)
  .sort()
  .reduce((res, k) => {
    const items = allPairs[k]
      .sort((a, b) => b.score - a.score)
      // .filter((a, i) => i < 5 || a.score > 0.1);
      .slice(0, 5)
      .map((x) => ({ ...x, score: Math.sqrt(x.score) }));
    if (items.length === 0) return res;
    for (const item of items) {
      if (!stemWords[item.key]) stemWords[item.key] = getStemWord(item.key);
    }
    return { ...res, [k]: items };
  }, {});

const searchIndexObject = {};
for (const [k, v] of searchIndex.entries()) {
  searchIndexObject[k] = v;
}

const stemKeys = Object.keys(fullStems).sort();

await Promise.all([
  fs.writeFile(
    "./data/stem/stems.txt",
    stemKeys
      .filter((k) => !k.includes("‑"))
      .map(
        (stem) => `${stem}: ${Object.keys(fullStems[stem]).sort().join(", ")}`
      )
      .join("\n\n")
  ),
  fs.writeFile(
    "./data/json/stemWords.json",
    JSON.stringify(
      Object.keys(stemWords)
        .sort()
        .reduce((res, k) => {
          res[k] = stemWords[k];
          return res;
        }, {}),
      null,
      2
    )
  ),
  fs.writeFile(
    `./data/json/pairs.json`,
    JSON.stringify(topPairs, null, 2),
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
            Math.pow(Math.max(itemLengths[c.doc][c.para][0], 80), 0.75),
        }))
        .sort((a, b) => b.score - a.score || a.doc - b.doc || a.para - b.para)
        .slice(0, 50)
        .map((d) => getDocByKey(data, d.doc, d.para, d.para, d.level))
    ),
    "utf-8"
  ),
]);

// citations vs allCitations??? one for ranking, one for sub-paragraph picking

// itemLengths[d.doc][d.para]

// const filtered =
// filter === "All Writings and Prayers"
//   ? res
//   : filter === "All Prayers"
//     ? res.filter((d) => data[d.doc].type === "Prayer")
//     : res.filter((d) => data[d.doc].author === filter);
