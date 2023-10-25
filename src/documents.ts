import getTokens from "../data/tokens";
import { compileDoc } from "../data/utils";

import data from "../data/base.json";
import initialDocs from "../data/initial.json";
import searchIndex from "../data/search.json";

const synonyms = [[getTokens("meet")[0], getTokens("gather")[0]]];

export const getSynonyms = (token) =>
  synonyms.find((s) => s.includes(token)) || [token];

export const getDocument = (id) => compileDoc(data, id);

const getDocByKey = (key) => {
  const [id, para] = key.split("_");
  const doc = compileDoc(data, id);
  if (!para) return doc;
  const paragraph = doc.paragraphs[parseInt(para, 10)];
  return { ...doc, paragraphs: [paragraph], citations: paragraph.citations };
};

export const getSearchDocs = (tokens) => {
  if (tokens.length === 0) {
    return initialDocs.map((key) => getDocByKey(key));
  }

  const matchSets = tokens.map((t) => [
    ...new Set(getSynonyms(t).flatMap((t) => searchIndex[t] || [])),
  ]);
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
      return { ...getDocByKey(x), score, score2 };
    })
    .sort(
      (a, b) =>
        (b.score || 0) - (a.score || 0) ||
        (b.score2 || 0) - (a.score2 || 0) ||
        (b.citations || 0) - (a.citations || 0) ||
        a.id.localeCompare(b.id)
    );
};
