import { getDocByKey } from "../data/utils";

import itemFactors from "../data/factors.json";
import itemLengths from "../data/lengths.json";
import tokenCounts from "../data/counts.json";

const sum = (x) => x.reduce((res, a) => res + a, 0);

const sqrts = {};
const getSqrt = (x) => sqrts[x] || (sqrts[x] = Math.sqrt(x));

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

export const getSearchDocs = (data, searchIndex, tokens) => {
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
  const max = tokens.length === 1 ? 13 : 13 / Math.pow(tokens.length, 0.3);
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
    docs[doc].push({
      index: parseInt(para, 10),
      scores: Object.keys(scores).reduce(
        (res, t) => ({
          ...res,
          [t]: Math.pow(
            (scores[t] / (getSqrt(tokenCounts[t]) || 1)) * 100,
            0.3
          ),
          // [t]: Math.min(
          //   (scores[t] / (getSqrt(tokenCounts[t]) || 1)) * 100,
          //   max
          // ),
        }),
        {}
      ),
      // scores,
      // divided: Object.keys(scores).reduce(
      //   (res, k) => ({
      //     ...res,
      //     [k]: ((scores[k] || 0) / (getSqrt(tokenCounts[k]) || 1)) * 100,
      //   }),
      //   {}
      // ),
      // score: sum(
      //   allTokens.map((t) =>
      //     Math.min(
      //       ((scores[t] || 0) / (getSqrt(tokenCounts[t]) || 1)) * 100,
      //       max
      //     )
      //   )
      // ),
      // length: itemLengths[doc][para],
    });
  }
  const res = [] as any;
  for (const docStr of Object.keys(docs)) {
    const doc = parseInt(docStr, 10);
    const indices = Array.from({ length: itemLengths[doc].length })
      .map((_, i) => i)
      .filter((i) => docs[doc].some((d) => Math.abs(d.index - i) <= 3));
    // const indices = docs[doc].map((d) => d.index);
    if (doc === 4641 || doc === 4659) {
      // if (doc === "4312") {
      console.log("test");
    }
    const groups = groupIndices(indices);
    while (groups.length > 0) {
      const group = groups.shift();
      if (group.some((i) => docs[doc].some((d) => d.index === i))) {
        const options = [] as any[];
        for (let i = group[0]; i <= group[group.length - 1]; i++) {
          for (let j = i; j <= group[group.length - 1]; j++) {
            const paras = docs[doc].filter((d) => i <= d.index && d.index <= j);
            if (
              paras.length > 0 &&
              paras.find((p) => p.index === i) &&
              paras.find((p) => p.index === j)
            ) {
              const len = sum(
                group
                  .filter((k) => i <= k && k <= j)
                  .map((k) => itemLengths[doc][k])
              );
              const lenFactor = 1 / Math.pow(Math.max(len, 80), 0.75);
              const scores = allTokens.map((t) =>
                Math.min(sum(paras.map((p) => p.scores[t] || 0)), max)
              );
              options.push({
                doc,
                start: i,
                end: j,
                scores,
                score:
                  sum(
                    scores
                    // scores.map((s) => Math.min(s, max))
                    // allTokens.map((t) =>
                    //   Math.min(
                    //     (sum(paras.map((p) => p.scores[t] || 0)) /
                    //       (getSqrt(tokenCounts[t]) || 1)) *
                    //       100 *
                    //       lenFactor,
                    //     max
                    //   )
                    // )
                  ) * lenFactor,
              });
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
  const res2 = res
    .map((d) => ({ ...d, score: d.score * (itemFactors[d.doc] || 1) }))
    .sort((a, b) => b.score - a.score || a.doc - b.doc || a.start - b.start)
    .slice(0, 50);
  return res2.map((d) => getDocByKey(data, d.doc, d.start, d.end));
};
