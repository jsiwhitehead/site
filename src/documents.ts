import itemFactors from "../data/json/factors.json";
import itemLengths from "../data/json/lengths.json";
// import specialPrayers from "../data/json/specialPrayers.json";
import dataInfo from "../data/json/info.json";

const sum = (x) => x.reduce((res, a) => res + a, 0);

const countFunc = (x) => {
  const y = x * 100;
  return y / (1 + y);
};
// const countFunc2 = (x) => {
//   const y = x * 5;
//   return y / (1 + y);
// };
// const countFunc = (x) => Math.pow(x, 0.2);

const lenFunc = (x) => 1 / (1 + Math.exp(x / 60 - 5));
// const lenFunc2 = (x) => 1 / (1 + Math.exp(x / 20 - 5));

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

const randomSelection = (items, getWeight, limit) => {
  const cumulative = [] as any;
  let total = 0;
  for (const item of items) {
    total += getWeight(item);
    cumulative.push(total);
  }
  const res = new Set<any>();
  while (res.size < limit) {
    const r = Math.random() * total;
    res.add(cumulative.findIndex((c) => c >= r));
  }
  return [...res].map((i) => items[i]);
};

const prayersList = dataInfo
  .map((d, i) => ({ ...d, index: i }))
  .filter((d) => d.type === "Prayer" && !([] as any).includes(d.index))
  .map((d) => d.index);

export const getSearchDocs = (searchIndex, cited, tokens, filter, limit) => {
  if (tokens.length === 0) {
    if (filter === "All Prayers") {
      const res = cited
        .filter(
          (d) =>
            dataInfo[d.doc].type === "Prayer" && !([] as any).includes(d.doc)
        )
        .map((p) => ({
          ...p,
          score: p.score || 0,
        }));
      const docs = prayersList
        .map((doc) => {
          const items = res.filter((p) => p.doc === doc);
          if (items.length === 0) return { doc, score: 0.2 };
          const score =
            sum(items.map((p) => p.score)) / itemLengths[doc].length;
          return { doc, score: score + 0.2 };
        })
        .map((d) => ({
          ...d,
          score:
            d.score *
            (itemFactors[d.doc] || 1) *
            lenFunc(itemLengths[d.doc].reduce((res, x) => res + x[0], 0)),
        }));
      return randomSelection(docs, (d) => d.score, limit).map((d) => ({
        doc: d.doc,
      }));
    }
    return randomSelection(
      (filter === "All Writings and Prayers"
        ? cited
        : filter === "All Prayers"
          ? cited.filter((p) => dataInfo[p.doc].type === "Prayer")
          : cited.filter((p) => dataInfo[p.doc].author === filter)
      ).map((p) => ({
        ...p,
        score:
          (p.score || 0) *
          (itemFactors[p.doc] || 1) *
          lenFunc(itemLengths[p.doc][p.para][p.level]),
      })),
      (x) => x.score,
      limit
    ).map((p) => ({
      doc: p.doc,
      start: p.para,
      levels: { [p.para]: p.level },
    }));
  }
  // if (tokens.length === 0) {
  //   const filtered =
  //     filter === "All Writings and Prayers"
  //       ? cited
  //       : filter === "All Prayers"
  //         ? cited.filter(
  //             (p) =>
  //               dataInfo[p.doc].type === "Prayer" &&
  //               !specialPrayers.includes(p.doc)
  //           )
  //         : cited.filter((p) => dataInfo[p.doc].author === filter);
  //   const filteredDocs = [...new Set(filtered.map((p) => p.doc))] as any;
  //   const res = [] as any;
  //   for (const doc of filteredDocs) {
  //     const docParas = filtered.filter((p) => p.doc === doc);
  //     const groups =
  //       filter === "All Prayers"
  //         ? [Array.from({ length: itemLengths[doc].length }).map((_, i) => i)]
  //         : groupIndices(
  //             Array.from({ length: itemLengths[doc].length })
  //               .map((_, i) => i)
  //               .filter((i) => docParas.some((p) => Math.abs(p.para - i) <= 1))
  //           );
  //     while (groups.length > 0) {
  //       const group = groups.shift();
  //       if (group.some((i) => docParas.some((p) => p.para === i))) {
  //         const options = [] as any[];
  //         for (let i = group[0]; i <= group[group.length - 1]; i++) {
  //           for (let j = i; j <= group[group.length - 1]; j++) {
  //             if (
  //               (filter !== "All Prayers" && j - i < 3) ||
  //               (i === 0 && j === group[group.length - 1])
  //             ) {
  //               const paras = docParas.filter(
  //                 (p) => i <= p.para && p.para <= j
  //               );
  //               if (
  //                 filter === "All Prayers" ||
  //                 (paras.length > 0 &&
  //                   paras.some((p) => p.para === i) &&
  //                   paras.some((p) => p.para === j))
  //               ) {
  //                 const len = sum(
  //                   paras.map((p) => itemLengths[doc][p.para][p.level])
  //                 );
  //                 options.push({
  //                   doc,
  //                   start: i,
  //                   end: j,
  //                   levels: paras.reduce(
  //                     (res, p) => ({ ...res, [p.para]: p.level }),
  //                     {}
  //                   ),
  //                   score:
  //                     countFunc2(sum(paras.map((p) => p.score))) * lenFunc(len),
  //                 });
  //               }
  //             }
  //           }
  //         }
  //         const best = options.sort((a, b) => b.score - a.score)[0];
  //         res.push(best);
  //         groups.push(
  //           ...groupIndices(group.filter((k) => k < best.start || best.end < k))
  //         );
  //       }
  //     }
  //   }
  //   return res
  //     .map((d) => ({
  //       ...d,
  //       score: d.score * (itemFactors[d.doc] || 1),
  //     }))
  //     .sort((a, b) => b.score - a.score || a.doc - b.doc || a.start - b.start)
  //     .slice(0, limit);
  // }
  const doubles = tokens
    .slice(0, -1)
    .map((t1, i) => [t1, tokens[i + 1]].sort().join("_"));
  const allTokens = [...tokens, ...doubles].filter((t) => searchIndex.has(t));
  const matches = {};
  for (const token of allTokens) {
    for (const s of searchIndex.get(token)?.data || []) {
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
  for (const docStr of Object.keys(matches).filter((docStr) => {
    const doc = parseInt(docStr, 10);
    if (filter === "All Writings and Prayers") {
      return true;
    }
    if (filter === "All Prayers") {
      return dataInfo[doc].type === "Prayer" && !([] as any).includes(doc);
    }
    return dataInfo[doc].author === filter;
  })) {
    const doc = parseInt(docStr, 10);
    const docParas = Object.keys(matches[doc]).map((p) => parseInt(p, 10));
    const groups =
      filter === "All Prayers"
        ? [Array.from({ length: itemLengths[doc].length }).map((_, i) => i)]
        : groupIndices(
            Array.from({ length: itemLengths[doc].length })
              .map((_, i) => i)
              .filter((i) => docParas.some((p) => Math.abs(p - i) <= 1))
          );
    while (groups.length > 0) {
      const group = groups.shift();
      if (group.some((i) => docParas.includes(i))) {
        const options = [] as any[];
        for (let i = group[0]; i <= group[group.length - 1]; i++) {
          for (let j = i; j <= group[group.length - 1]; j++) {
            if (
              (filter !== "All Prayers" && j - i < 10) ||
              (i === 0 && j === group[group.length - 1])
            ) {
              const paras = docParas.filter((p) => i <= p && p <= j);
              if (
                filter === "All Prayers" ||
                (paras.length > 0 &&
                  paras.some((p) => p === i) &&
                  paras.some((p) => p === j))
              ) {
                const levels = group
                  .filter((k) => i <= k && k <= j)
                  .reduce((res, k) => {
                    if (filter === "All Prayers") {
                      res[k] = 0;
                      return res;
                    }
                    if (!matches[doc][k]) return res;
                    const opts = allTokens
                      .filter((t) => !t.includes("_") && matches[doc][k][t])
                      .map((t) => matches[doc][k][t].level);
                    if (opts.length > 0) res[k] = Math.min(...opts);
                    return res;
                  }, {});
                const len = sum(
                  paras.map((p) => itemLengths[doc][p][levels[p]])
                );
                // Math.pow(len / 40 + 1, 0.3) / (1 + Math.exp(len / 40 - 5));
                const scores = allTokens.map(
                  (t) =>
                    countFunc(
                      sum(paras.map((p) => matches[doc][p][t]?.score || 0)) /
                        (searchIndex.get(t).count || 1)
                    )
                  // Math.pow(
                  //   sum(paras.map((p) => p.scores[t] || 0)) /
                  //     (counts[t] || 1),
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
                  //     (counts[t] || 1)
                  // ),
                  levels,
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
  return res
    .map((d) => ({
      ...d,
      score: d.score * (itemFactors[d.doc] || 1),
    }))
    .sort((a, b) => b.score - a.score || a.doc - b.doc || a.start - b.start)
    .slice(0, limit);
};
