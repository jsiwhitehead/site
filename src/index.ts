import getTokens from "../data/tokens";
import { getParagraphText } from "../data/utils";

import initialDocs from "../data/initial.json";

import maraca, { atom, effect } from "./maraca";
import render from "./render";
import { getSearchDocs } from "./documents";

import "./style.css";

const $data = import("../data/data.json");
const $searchIndex = import("../data/search.json");

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
    const split = text.split(/([\w‑]+)/g).flatMap((t) => {
      const highlight = tokens.includes(getTokens(t)[0]);
      if (t.includes("‑") && !highlight) {
        return t.split(/(‑)/g).map((x) => ({
          text: x,
          highlight: tokens.includes(getTokens(x)[0]),
        }));
      }
      return [{ text: t, highlight }];
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
    passages: (search) => {
      clearTimeout(searchTimer);

      const tokens = getTokens(search);

      if (tokens.length === 0) {
        searchAtom.set(initialDocs.map((d) => highlightDoc(d, [])));
      } else {
        searchTimer = setTimeout(() => {
          Promise.all([$data, $searchIndex]).then(([data, searchIndex]) => {
            const docs = getSearchDocs(
              data.default,
              searchIndex.default,
              tokens
            );
            searchAtom.set(docs.map((d) => highlightDoc(d, tokens)));
          });
        }, 250);
      }

      return searchAtom;
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
