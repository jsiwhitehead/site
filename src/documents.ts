// import getTokens from "../data/tokens";
import { distinctCitations, getDocByKey } from "../data/utils";

// const synonyms = [[getTokens("meet")[0], getTokens("gather")[0]]];

// export const getSynonyms = (token) =>
//   synonyms.find((s) => s.includes(token)) || [token];

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

const sum = (x) => x.reduce((res, a) => res + a, 0);

export const getSearchDocs = (data, searchIndex, tokens) => {
  const matchSets = tokens
    .map((t) => searchIndex[t] || [])
    .filter((matches) => matches.length > 0);
  const matchItems = matchSets
    .map((matches) => matches.map((m) => /([^:]*):?(.*)/.exec(m)![1]))
    .reduce((a, b) => a.filter((x) => b.includes(x)));
  const doubles = tokens.slice(0, -1).flatMap((t1, i) => {
    const t2 = tokens[i + 1];
    return searchIndex[`${t1}_${t2}`] || [];
  });
  return matchItems
    .map((x) => {
      const counts = [] as any;
      const scoreLists = matchSets.map((matches, i) => {
        const m = matches.find((m) => m.startsWith(x));
        const [count, ...res] = /([^:]*):?(.*)/
          .exec(m)![2]
          .split(",")
          .map((x) => parseInt(x, 10));
        counts[i] = count;
        return res;
      });
      const doublesCounts = [] as any;
      const doublesLists = doubles
        .filter((m) => m.startsWith(x))
        .map((m, i) => {
          const [count, ...res] = /([^:]*):?(.*)/
            .exec(m)![2]
            .split(",")
            .map((x) => parseInt(x, 10));
          doublesCounts[i] = count;
          return res;
        });

      const mins = scoreLists.reduce((res, l) =>
        res.map((a, i) => Math.min(a, l[i]))
      );
      let score = scoreLists[0].length && Math.max(...mins);
      if (score > 0) {
        const index = mins.indexOf(score);
        score += sum(doublesLists.map((l) => l[index]));
      }

      const score2 = sum(counts) + sum(doublesCounts);

      return { key: x, score: Math.max(score, score2) };
    })
    .sort(
      (a, b) => (b.score || 0) - (a.score || 0) || a.key.localeCompare(b.key)
    )
    .slice(0, 50)
    .map((d) => getDocByKey(data, d.key));
};
