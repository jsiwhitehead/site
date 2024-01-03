import getTokens from "../data/tokens";

import initialDocs from "../data/json/initial.json";

import maraca, { atom, effect } from "./maraca";
import render from "./render";

import highlightDoc from "./highlight";

import "./style.css";

// @ts-ignore
import Worker from "./worker?worker";
const worker = new Worker();

// @ts-ignore
import WorkerRelated from "./workerRelated?worker";
const workerRelated = new WorkerRelated();

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

let searchTimer;
const searchAtom = atom([]);

const relatedAtom = atom([]);

const compiled = maraca(
  {
    // document: (id) => getDocument(data, id),
    passages: (search, filter) => {
      clearTimeout(searchTimer);

      const tokens = search
        .split(/ +/g)
        .filter((x) => x)
        .map((x) => getTokens(x)[0])
        .filter((x) => x);

      if (tokens.length === 0 && filter === "All Writings and Prayers") {
        searchAtom.set(initialDocs.map((d) => highlightDoc(d, [])));
      } else {
        searchTimer = setTimeout(() => {
          worker.postMessage({ tokens, filter });
          worker.onmessage = (e) => searchAtom.set(e.data);
        }, 250);
      }

      return searchAtom;
    },
    similar: (search) => {
      workerRelated.postMessage({ tokens: getTokens(search) });
      workerRelated.onmessage = (e) => relatedAtom.set(e.data);
      return relatedAtom;
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
