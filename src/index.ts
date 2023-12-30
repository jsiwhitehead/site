import { doubleMetaphone } from "double-metaphone";

import getTokens from "../data/tokens";
import stem from "../data/stem";
import { getParagraphText } from "../data/utils";

import initialDocs from "../data/json/initial.json";
import pairs from "../data/json/pairs.json";

import maraca, { atom, effect } from "./maraca";
import render from "./render";
import { getSearchDocs } from "./documents";

import "./style.css";

const $data = import("../data/json/data.json");
const $searchIndex = import("../data/json/search.json");

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

const highlightDoc = (doc, tokens) => {
  const texts = doc.paragraphs.map((para) => getParagraphText(para));
  const highlighted = texts.map((text) => {
    const phrases = text.split(/([.,;:!?](?=$|[^a-z]* [^a-z]*[a-z])|—)/gi);
    const split = phrases.flatMap((phrase, i) => {
      if (i % 2 === 1) return [{ text: phrase, highlight: false }];
      const allParts = phrase.split(/([ ‑])/g);
      const words = allParts.filter((_, j) => j % 2 === 0);
      const joins = allParts.filter((_, j) => j % 2 === 1);
      const cleaned = words.map((w) =>
        w
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .normalize("NFC")
          .replace(/[^ a-z0-9‑’']/gi, "")
      );
      const highlight = cleaned.map((c, j) =>
        tokens.includes(
          stem(c, cleaned.slice(0, j).reverse(), cleaned.slice(j + 1))
        )
      );
      return words.flatMap((w, j) => [
        { text: w, highlight: highlight[j] },
        { text: joins[j] || "", highlight: false },
      ]);
    });
    const res = [{ text: "" }];
    for (const s of split) {
      if (s.highlight) res.push(s, { text: "" });
      else res[res.length - 1].text += s.text;
    }
    return res;
  });
  return {
    ...doc,
    paragraphs: highlighted,
  };
};

let searchTimer;
const searchAtom = atom([]);

const compiled = maraca(
  {
    // document: (id) => getDocument(data, id),
    passages: (search, filter) => {
      clearTimeout(searchTimer);

      const baseTokens = search
        .split(/ +/g)
        .filter((x) => x)
        .map((x) => getTokens(x)[0]);

      if (baseTokens.length === 0) {
        searchAtom.set(initialDocs.map((d) => highlightDoc(d, [])));
      } else {
        searchTimer = setTimeout(() => {
          Promise.all([$data, $searchIndex]).then(([data, searchIndex]) => {
            const tokens = baseTokens.map((t) =>
              searchIndex[t] ? t : [...new Set(doubleMetaphone(t))].join("|")
            );
            const docs = getSearchDocs(
              data.default,
              searchIndex.default,
              tokens,
              filter
            );
            searchAtom.set(docs.map((d) => highlightDoc(d, tokens)));
          });
        }, 250);
      }

      return searchAtom;
    },
    similar: (search) => {
      const allPairs = {};
      const pairCounts = {};
      const tokens = getTokens(search);
      for (const t of tokens) {
        for (const p of pairs[t] || []) {
          if (!tokens.includes(p.key)) {
            allPairs[p.word] = (allPairs[p.word] || 0) + p.score;
            pairCounts[p.word] = (pairCounts[p.word] || 0) + 1;
          }
        }
      }
      for (const k of Object.keys(allPairs)) {
        allPairs[k] = allPairs[k] / pairCounts[k];
      }
      return Object.keys(allPairs)
        .sort((a, b) => allPairs[b] - allPairs[a])
        .slice(0, 10);
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
