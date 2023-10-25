import webfont from "webfontloader";

import getTokens from "../data/tokens";

import maraca, { effect } from "./maraca";
import render from "./render";
import { getDocument, getSearchDocs, getSynonyms } from "./documents";

import "./style.css";

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

const compiled = maraca(
  {
    document: (id) => getDocument(id),
    passages: (search) => {
      const tokens = getTokens(search);
      const docs = getSearchDocs(tokens);
      const allTokens = tokens.flatMap((t) => getSynonyms(t));
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
