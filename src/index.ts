import webfont from "webfontloader";

import getTokens from "../search";

import maraca, { effect } from "./maraca";
import render from "./render";

import "./style.css";

import data from "../data/writings.json";
import searchIndex from "../data/search.json";

webfont.load({
  google: {
    families: [
      "Atkinson Hyperlegible",
      "Atkinson Hyperlegible:italic",
      "Atkinson Hyperlegible:bold",
      "Atkinson Hyperlegible:bolditalic",
    ],
  },
});

const set = (obj, path, value) =>
  path.reduce(
    (res, k, i) => (res[k] = i === path.length - 1 ? value : res[k] || {}),
    obj
  );
// @ts-ignore
const app = import.meta.glob("../app/**", { eager: true, as: "raw" });
const source = Object.keys(app).reduce((res, k) => {
  const p = k
    .slice(3, -3)
    .split(/[\\\\\\/]/)
    .slice(1);
  set(res, p, app[k]);
  return res;
}, {});

const synonyms = [[getTokens("meet")[0], getTokens("gather")[0]]];

const getSearchDocs = (tokens) => {
  if (tokens.length === 0) {
    const shortDocs = (data as any).filter((d) => d.length === 1);
    const paras = (data as any)
      .filter((d) => d.length > 1)
      .flatMap((d) =>
        d.paragraphs.map((p) => ({
          ...d,
          paragraphs: [p],
          citations: p.citations,
        }))
      );
    return [...shortDocs, ...paras].sort(
      (a, b) => (b.citations || 0) - (a.citations || 0)
    );
  }

  const matchSets = tokens.map((t) => [
    ...new Set(
      (synonyms.find((s) => s.includes(t)) || [t]).flatMap(
        (t) => searchIndex[t] || []
      )
    ),
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
      if (!x.includes("-")) {
        return { ...data[parseInt(x, 10)], score, score2 };
      }
      const [i, j] = x.split("-").map((y) => parseInt(y, 10));
      return {
        ...data[i],
        paragraphs: [data[i].paragraphs[j]],
        citations: data[i].paragraphs[j].citations,
        score,
        score2,
      };
    })
    .sort(
      (a, b) =>
        (b.score || 0) - (a.score || 0) ||
        (b.score2 || 0) - (a.score2 || 0) ||
        (b.citations || 0) - (a.citations || 0) ||
        a.id.localeCompare(b.id)
    );
};

const compiled = maraca(
  {
    document: (id) => (data as any).find((d) => d.id === id),
    passages: (search) => {
      const tokens = getTokens(search);
      const docs = getSearchDocs(tokens);
      const allTokens = tokens.flatMap(
        (t) => synonyms.find((s) => s.includes(t)) || [t]
      );
      return docs.slice(0, 50).map((d) => {
        const texts = d.paragraphs.map((para) =>
          para.lines
            ? para.lines
                .map((parts) => parts.map((p) => p.text).join(""))
                .join(" ")
            : para.parts.map((p) => p.text).join("")
        );
        const highlighted = texts.map((text) => {
          const split = text.split(/([a-zA-Z0-9]+)/g).map((t) => ({
            text: t,
            highlight: allTokens.includes(getTokens(t)[0]),
          }));
          const res = [{ text: "" }];
          for (const s of split) {
            if (s.highlight) res.push(s, { text: "" });
            else res[res.length - 1].text += s.text;
          }
          return res;
        });
        return {
          ...d,
          paragraphs: highlighted,
        };
      });
    },
    length: (block) => {
      if (!block) return null;
      if (Array.isArray(block)) return block.length;
      return block.items.length;
    },
  },
  source
);
const renderer = render(document.getElementById("app"));

effect((effect) => {
  renderer(effect, compiled);
});
