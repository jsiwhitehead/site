import { getDocByKey, loadDoc } from "../data/utils";

import itemFactors from "../data/json/factors.json";
import itemLengths from "../data/json/lengths.json";
import tokenCounts from "../data/json/counts.json";
import scoredParas from "../data/json/scoredParas.json";
import specialPrayers from "../data/json/specialPrayers.json";

const sum = (x) => x.reduce((res, a) => res + a, 0);

const countFunc = (x) => {
  const y = x * 100;
  return y / (1 + y);
};
// const countFunc = (x) => Math.pow(x, 0.2);

const lenFunc = (x) => 1 / (1 + Math.exp(x / 60 - 5));

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
  if (tokens.length === 0) {
    if (filter === "All Prayers") {
      const res = scoredParas
        .filter(
          (d) =>
            loadDoc(data, d.doc).type === "Prayer" &&
            !specialPrayers.includes(d.doc)
        )
        .map((p) => ({
          ...p,
          score:
            (p.score || 0) *
            (itemFactors[p.doc] || 1) *
            lenFunc(itemLengths[p.doc].reduce((res, x) => res + x[0], 0)),
        }))
        .sort(
          (a, b) =>
            b.score - a.score ||
            console.log(b.score, a.score) ||
            a.doc - b.doc ||
            a.para - b.para
        );
      const res2 = [] as any;
      for (const r of res) {
        if (!res2.find((r2) => r2.doc === r.doc)) res2.push(r);
      }
      return res2.slice(0, 50).map((p) => getDocByKey(data, p.doc));
    }
    const res = (
      filter === "All Writings and Prayers"
        ? scoredParas
        : filter === "All Prayers"
          ? scoredParas.filter((p) => loadDoc(data, p.doc).type === "Prayer")
          : scoredParas.filter((p) => loadDoc(data, p.doc).author === filter)
    )
      .map((p) => ({
        ...p,
        score:
          (p.score || 0) *
          (itemFactors[p.doc] || 1) *
          lenFunc(itemLengths[p.doc][p.para][p.level]),
      }))
      .sort((a, b) => b.score - a.score || a.doc - b.doc || a.para - b.para);
    return res
      .slice(0, 50)
      .map((p) => getDocByKey(data, p.doc, p.para, p.para, p.level));
  }
  const doubles = tokens
    .slice(0, -1)
    .map((t1, i) => [t1, tokens[i + 1]].sort().join("_"));
  const allTokens = [...tokens, ...doubles];
  const matches = {};
  for (const token of allTokens) {
    for (const s of searchIndex.get(token) || []) {
      const [rest, level = 0] = s.split("|");
      const [key, score = 2] = rest.split(":");
      const [doc, para] = key.split("_");
      if (!matches[doc]) matches[doc] = {};
      if (!matches[doc][para]) matches[doc][para] = {};
      matches[doc][para][token] = {
        score: parseInt(score, 10),
        level: parseInt(level, 10),
      };
    }
  }
  const res = [] as any;
  for (const docStr of Object.keys(matches)) {
    const doc = parseInt(docStr, 10);
    if (!(filter === "All Prayers" && specialPrayers.includes(doc))) {
      const docParas = Object.keys(matches[doc]).map((p) => parseInt(p, 10));
      const groups =
        filter === "All Prayers"
          ? [Array.from({ length: itemLengths[doc].length }).map((_, i) => i)]
          : groupIndices(
              Array.from({ length: itemLengths[doc].length })
                .map((_, i) => i)
                .filter((i) => docParas.some((p) => Math.abs(p - i) <= 3))
            );
      while (groups.length > 0) {
        const group = groups.shift();
        if (group.some((i) => docParas.includes(i))) {
          const options = [] as any[];
          for (let i = group[0]; i <= group[group.length - 1]; i++) {
            for (let j = i; j <= group[group.length - 1]; j++) {
              if (
                filter !== "All Prayers" ||
                (i === 0 && j === group[group.length - 1])
              ) {
                const paras = docParas.filter((p) => i <= p && p <= j);
                if (
                  filter === "All Prayers" ||
                  (paras.length > 0 &&
                    paras.some((p) => p === i) &&
                    paras.some((p) => p === j))
                ) {
                  const level =
                    i !== j
                      ? 0
                      : Math.min(
                          ...allTokens
                            .filter(
                              (t) =>
                                !t.includes("_") && matches[doc][paras[0]][t]
                            )
                            .map((t) => matches[doc][paras[0]][t].level)
                        );
                  const len = sum(
                    group
                      .filter((k) => i <= k && k <= j)
                      .map((k) => itemLengths[doc][k][level])
                  );
                  // Math.pow(len / 40 + 1, 0.3) / (1 + Math.exp(len / 40 - 5));
                  const scores = allTokens.map(
                    (t) =>
                      countFunc(
                        sum(paras.map((p) => matches[doc][p][t]?.score || 0)) /
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
                    // scores,
                    // base: allTokens.map(
                    //   (t) =>
                    //     sum(paras.map((p) => p.scores[t] || 0)) /
                    //     (tokenCounts[t] || 1)
                    // ),
                    level,
                    score: sum(scores) * lenFunc(len),
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
  }
  const filtered =
    filter === "All Writings and Prayers"
      ? res
      : filter === "All Prayers"
        ? res.filter((d) => loadDoc(data, d.doc).type === "Prayer")
        : res.filter((d) => loadDoc(data, d.doc).author === filter);
  const res2 = filtered
    .map((d) => ({
      ...d,
      score: d.score * (itemFactors[d.doc] || 1),
    }))
    .sort((a, b) => b.score - a.score || a.doc - b.doc || a.start - b.start)
    .slice(0, 50);
  return res2.map((d) => getDocByKey(data, d.doc, d.start, d.end, d.level));
};
