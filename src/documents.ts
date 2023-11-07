// import getTokens from "../data/tokens";
import { getDocByKey } from "../data/utils";

import itemLengths from "../data/lengths.json";

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

export const getSearchDocs = (data, searchIndex, tokens) => {
  const matches = [
    ...tokens,
    ...tokens.slice(0, -1).map((t1, i) => `${t1}_${tokens[i + 1]}`),
  ].flatMap((token) =>
    (searchIndex[token] || []).map((m) => {
      const [key, score] = m.split(":");
      return { token, key, score: parseInt(score || 2, 10) };
    })
  );
  return [...new Set(matches.map((m) => m.key))]
    .map((key) => ({
      key,
      score:
        sum(matches.filter((m) => m.key === key).map((m) => m.score)) *
        itemLengths[key],
    }))
    .sort(
      (a, b) => (b.score || 0) - (a.score || 0) || a.key.localeCompare(b.key)
    )
    .slice(0, 50)
    .map((d) => getDocByKey(data, d.key));
};
