// import getTokens from "../data/tokens";
import { getDocByKey } from "../data/utils";

import itemFactors from "../data/factors.json";
import tokenCounts from "../data/counts.json";

// const synonyms = [[getTokens("meet")[0], getTokens("gather")[0]]];

// export const getSynonyms = (token) =>
//   synonyms.find((s) => s.includes(token)) || [token];

// export const getDocument = (data, index) => compileDoc(data, index);

// const getDocInfo = (data, key) => {
//   const [id, para] = key.split("_");
//   const doc = data[id];
//   if (!para) {
//     return {
//       ...doc,
//       citations: Math.max(
//         doc.paragraphs.map(
//           (para) => distinctCitations(data, para.citations || []).length
//         )
//       ),
//     };
//   }
//   const paragraph = doc.paragraphs[parseInt(para, 10)];
//   return {
//     ...doc,
//     paragraphs: [paragraph],
//     citations: distinctCitations(data, paragraph.citations || []).length,
//   };
// };

const sum = (x) => x.reduce((res, a) => res + a, 0);

const sqrts = {};
const getSqrt = (x) => {
  return sqrts[x] || (sqrts[x] = Math.sqrt(x));
};

export const getSearchDocs = (data, searchIndex, tokens) => {
  const doubles = tokens
    .slice(0, -1)
    .map((t1, i) => [t1, tokens[i + 1]].sort().join("_"));
  const matches = [...tokens, ...doubles].flatMap((token) =>
    (searchIndex[token] || []).map((m) => {
      const [key, score] = m.split(":");
      return { token, key, score: parseInt(score || 2, 10) };
    })
  );
  const max = tokens.length === 1 ? 10000 : 20 / Math.pow(tokens.length, 0.3);
  const res = [...new Set(matches.map((m) => m.key))]
    .map((key) => {
      const scores = {};
      for (const m of matches) {
        if (m.key === key) {
          if (!scores[m.token]) scores[m.token] = 0;
          scores[m.token] += m.score;
        }
      }
      return {
        key,
        scores,
        divided: Object.keys(scores).reduce(
          (res, k) => ({
            ...res,
            [k]: ((scores[k] || 0) / (getSqrt(tokenCounts[k]) || 1)) * 100,
          }),
          {}
        ),
        score:
          // sum(matches.filter((m) => m.key === key).map((m) => m.score)) *
          sum(
            // [...tokens, ...doubles].map((t) => Math.min(scores[t] || 0, max))
            [...tokens, ...doubles].map((t) =>
              Math.min(
                ((scores[t] || 0) / (getSqrt(tokenCounts[t]) || 1)) * 100,
                max
              )
            )
          ) * itemFactors[key],
      };
    })
    .sort(
      (a, b) => (b.score || 0) - (a.score || 0) || a.key.localeCompare(b.key)
    )
    .slice(0, 50);
  return res.map((d) => getDocByKey(data, d.key));
};
