import webfont from "webfontloader";
import { createBrowserHistory } from "history";

import maraca, { atom, derived, effect, resolve } from "./maraca";
import render from "./render";

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

const history = createBrowserHistory();
const getUrlBlock = (location) => ({
  __type: "block",
  values: Object.fromEntries([
    ...(location.hash ? [["", location.hash.slice(1)]] : []),
    ...new URLSearchParams(location.search),
  ]),
  items: location.pathname.split(/\//g).filter((x) => x),
});
const url = atom(getUrlBlock(history.location), (v) => {
  const path = `/${v.items.join("/")}`;
  if (path !== location.pathname) history.push(path);
  return v;
});
history.listen(({ location }) => {
  url.set(getUrlBlock(location));
  if (location.hash) {
    setTimeout(() => {
      document.getElementById(location.hash.slice(1))!.scrollIntoView();
      window.scrollBy(0, -25);
    });
  } else {
    setTimeout(() => {
      window.scroll(0, 0);
    });
  }
});
document.addEventListener("click", (e: any) => {
  if (!e.metaKey) {
    const origin = e.target.closest("a");
    if (
      origin &&
      origin.role !== "button" &&
      origin.host === window.location.host
    ) {
      e.preventDefault();
      history.push(origin.href);
    }
  }
});

const api = (path, req = {}) => {
  const res = atom(null);
  fetch(`/.netlify/functions/${path}`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((data) => res.set(data));
  return res;
};

const filterText = (text, max) => {
  const res = text.reduce((res, t) => {
    if (t.count >= max) {
      return [...res, t];
    }
    if (res[res.length - 1]?.text !== " . . . ") {
      return [...res, t.text === " " ? t : { text: " . . . " }];
    }
    return res;
  }, []);
  if (res.length === 1 && res[0].text === " . . . ") return null;
  if (res[0].text === " . . . ") {
    res[0].text = ". . . ";
  }
  if (res[res.length - 1].text === " . . . ") {
    res[res.length - 1].text = " . . .";
  }
  return res;
};

const compiled = maraca(
  {
    allParagraphs: (author, top) => {
      const $paras = api("paragraphs", { author });
      if (!top) return $paras;
      return derived(() => {
        const paras = resolve($paras);
        if (!paras) return paras;
        return paras.map((p) => {
          if (p.type === "lines") {
            const max = Math.max(
              ...p.lines.flatMap((l) => l.map((t) => t.count))
            );
            return {
              ...p,
              lines: p.lines.map((l) => filterText(l, (max * 2) / 3)),
            };
          }
          const max = Math.max(...p.text.map((t) => t.count));
          return { ...p, text: filterText(p.text, (max * 2) / 3) };
        });
      });
    },
    documents: (author) => api("documents", { author }),
    prayers: (author) => {
      const $prayers = api("prayers", { author });
      return derived(() => {
        const prayers = resolve($prayers);
        if (!prayers) return prayers;
        const res = {};
        for (const p of prayers) {
          res[p.category] = [...(res[p.category] || []), p];
        }
        console.log(res);
        return res;
      });
    },
    documentById: (id) => id && api("documentById", { id }),
    url,
    includes: (list, item) => list.items.includes(item),
    length: (block) =>
      Array.isArray(block) ? block.length : block.items.length,
    rgb: (...args) =>
      `#${args.map((x) => x.toString(16).padStart(2, "0")).join("")}`,
  },
  source
);
const renderer = render(document.getElementById("app"));

effect((effect) => {
  renderer(effect, compiled);
});
