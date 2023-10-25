import getTokens from "../data/tokens";
import { distinctCitations, getDocByKey } from "../data/utils";

const synonyms = [[getTokens("meet")[0], getTokens("gather")[0]]];

export const getSynonyms = (token) =>
  synonyms.find((s) => s.includes(token)) || [token];

// export const getDocument = (data, index) => compileDoc(data, index);

const getDocInfo = (data, key) => {
  const [id, para] = key.split("_");
  const doc = data[id];
  if (!para) {
    return {
      ...doc,
      citations: Math.max(
        doc.paragraphs.map(
          (para) => distinctCitations(data, para.citations || []).length
        )
      ),
    };
  }
  const paragraph = doc.paragraphs[parseInt(para, 10)];
  return {
    ...doc,
    paragraphs: [paragraph],
    citations: distinctCitations(data, paragraph.citations || []).length,
  };
};

export const getSearchDocs = (data, searchIndex, tokens) => {
  const matchSets = tokens
    .map((t) => [
      ...new Set(getSynonyms(t).flatMap((t) => searchIndex[t] || [])),
    ])
    .filter((matches) => matches.length > 0);
  const matchItems = matchSets
    .map((matches) => matches.map((m) => /([^:]*):?(.*)/.exec(m)![1]))
    .reduce((a, b) => a.filter((x) => b.includes(x)));
  return matchItems
    .map((x) => {
      const scoreLists = matchSets.map((matches) => {
        const m = matches.find((m) => m.startsWith(x));
        return /([^:]*):?(.*)/
          .exec(m)![2]
          .split(",")
          .filter((x) => x);
      });
      const score =
        scoreLists[0].length &&
        Math.max(
          ...scoreLists.reduce((res, l) => res.map((a, i) => Math.min(a, l[i])))
        );
      const score2 =
        scoreLists[0].length &&
        Math.max(
          ...scoreLists.reduce((res, l) => res.map((a, i) => Math.max(a, l[i])))
        );
      const info = getDocInfo(data, x);
      return { key: x, score, score2, citations: info.citations };
    })
    .sort(
      (a, b) =>
        (b.score || 0) - (a.score || 0) ||
        (b.score2 || 0) - (a.score2 || 0) ||
        (b.citations || 0) - (a.citations || 0) ||
        a.key.localeCompare(b.key)
    )
    .slice(0, 50)
    .map((d) => getDocByKey(data, d.key));
};
