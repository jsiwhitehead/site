import { getDocByKey } from "../data/utils";

import itemFactors from "../data/json/factors.json";
import itemLengths from "../data/json/lengths.json";
import tokenCounts from "../data/json/counts.json";

const sum = (x) => x.reduce((res, a) => res + a, 0);

const countFunc = (x) => {
  const y = x * 100;
  return y / (1 + y);
};
// const countFunc = (x) => Math.pow(x, 0.2);

const groupIndices = (indices) => {
  const res = [] as any;
  const max = Math.max(...indices);
  let last;
  for (let i = Math.min(...indices); i <= max; i++) {
    if (indices.includes(i)) {
      if (last === undefined || i > last + 1) res.push([]);
      res[res.length - 1].push(i);
      last = i;
    }
  }
  return res;
};

export const getSearchDocs = (data, searchIndex, tokens, filter) => {
  const doubles = tokens
    .slice(0, -1)
    .map((t1, i) => [t1, tokens[i + 1]].sort().join("_"));
  const allTokens = [...tokens, ...doubles];
  const matches = allTokens.flatMap((token) =>
    (searchIndex[token] || []).map((m) => {
      const [key, score] = m.split(":");
      return { token, key, score: parseInt(score || 2, 10) };
    })
  );
  const docs = {};
  for (const key of [...new Set(matches.map((m) => m.key))]) {
    const scores = {};
    for (const m of matches) {
      if (m.key === key) {
        if (!scores[m.token]) scores[m.token] = 0;
        scores[m.token] += m.score;
      }
    }
    const [doc, para] = key.split("_");
    if (!docs[doc]) docs[doc] = [];
    docs[doc].push({ index: parseInt(para, 10), scores });
  }
  const res = [] as any;
  for (const docStr of Object.keys(docs)) {
    const doc = parseInt(docStr, 10);
    const indices =
      filter === "All Prayers"
        ? Array.from({ length: itemLengths[doc].length }).map((_, i) => i)
        : Array.from({ length: itemLengths[doc].length })
            .map((_, i) => i)
            .filter((i) => docs[doc].some((d) => Math.abs(d.index - i) <= 3));
    const groups = groupIndices(indices);
    while (groups.length > 0) {
      const group = groups.shift();
      if (group.some((i) => docs[doc].some((d) => d.index === i))) {
        const options = [] as any[];
        for (let i = group[0]; i <= group[group.length - 1]; i++) {
          for (let j = i; j <= group[group.length - 1]; j++) {
            if (
              filter !== "All Prayers" ||
              (i === 0 && j === group[group.length - 1])
            ) {
              const paras = docs[doc].filter(
                (d) => i <= d.index && d.index <= j
              );
              if (
                filter === "All Prayers" ||
                (paras.length > 0 &&
                  paras.find((p) => p.index === i) &&
                  paras.find((p) => p.index === j))
              ) {
                const len = sum(
                  group
                    .filter((k) => i <= k && k <= j)
                    .map((k) => itemLengths[doc][k])
                );
                const lenFactor = 1 / (1 + Math.exp(len / 60 - 5));
                // Math.pow(len / 40 + 1, 0.3) / (1 + Math.exp(len / 40 - 5));
                const scores = allTokens.map(
                  (t) =>
                    countFunc(
                      sum(paras.map((p) => p.scores[t] || 0)) /
                        (tokenCounts[t] || 1)
                    )

                  // Math.pow(
                  //   sum(paras.map((p) => p.scores[t] || 0)) /
                  //     (tokenCounts[t] || 1),
                  //   COUNTPOWER
                  // )
                );
                options.push({
                  doc,
                  start: i,
                  end: j,
                  scores,
                  base: allTokens.map(
                    (t) =>
                      sum(paras.map((p) => p.scores[t] || 0)) /
                      (tokenCounts[t] || 1)
                  ),
                  score: sum(scores) * lenFactor,
                });
              }
            }
          }
        }
        const best = options.sort((a, b) => b.score - a.score)[0];
        res.push(best);
        groups.push(
          ...groupIndices(group.filter((k) => k < best.start || best.end < k))
        );
      }
    }
  }
  const filtered =
    filter === "All Writings and Prayers"
      ? res
      : filter === "All Prayers"
      ? res.filter((d) => data[d.doc].type === "Prayer")
      : res.filter((d) => data[d.doc].author === filter);
  const res2 = filtered
    .map((d) => ({
      ...d,
      score: d.score * (itemFactors[d.doc] || 1),
    }))
    .sort((a, b) => b.score - a.score || a.doc - b.doc || a.start - b.start)
    .slice(0, 50);
  return res2.map((d) => getDocByKey(data, d.doc, d.start, d.end));
};
