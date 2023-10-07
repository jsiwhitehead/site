import webfont from "webfontloader";
import { createBrowserHistory, Action } from "history";

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

export const history = createBrowserHistory();
const getUrlBlock = (location) => ({
  __type: "block",
  values: Object.fromEntries([
    ...(location.hash ? [["", location.hash.slice(1)]] : []),
    ...new URLSearchParams(location.search),
  ]),
  items: location.pathname.split(/\//g).filter((x) => x),
});
const url = atom(getUrlBlock(history.location), (v) => {
  let path = "/";
  path += v.items.join("/");
  if (Object.keys(v.values).filter((x) => x).length > 0) {
    path +=
      "?" +
      Object.keys(v.values)
        .filter((x) => x)
        .map((k) => `${k}=${v.values[k]}`)
        .join("&");
  }
  if (v.values[""] !== undefined) {
    path += "#" + v.values[""];
  }
  if (path !== location.pathname + location.search + location.hash) {
    history.push(path);
  }
  return v;
});

history.listen(({ action, location }) => {
  url.set(getUrlBlock(location));
  if (history.location.hash) {
    setTimeout(() => {
      const elem = document.getElementById(history.location.hash.slice(1));
      if (elem) {
        const top = elem.getBoundingClientRect().top;
        const navHeight = document
          .getElementById("nav")!
          .getBoundingClientRect().height;
        window.scrollBy(0, top - navHeight - 30);
      }
    });
  } else if (action === Action.Push) {
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

const cachedDocs = {};
const api = (path, req = {} as any) => {
  if (path === "documentById" && cachedDocs[req.id]) {
    return cachedDocs[req.id];
  }
  const res = atom(null);
  fetch(`/.netlify/functions/${path}`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((data) => {
      if (path === "documentById") cachedDocs[req.id] = data;
      res.set(data);
    });
  return res;
};

const filterText = (text, min) => {
  const res = text.reduce((res, t) => {
    if (t.count >= min) {
      return [...res, t];
    }
    if (typeof res[res.length - 1] !== "string") res.push("");
    res[res.length - 1] = res[res.length - 1] + t.text;
    return res;
  }, []);
  const mapped = res.map((x, i) =>
    typeof x === "string"
      ? {
          text:
            !/\w/.test(x) ||
            (i > 0 && i < res.length - 1 && x.trim().split(" ").length === 1)
              ? x
              : " . . . ",
        }
      : x
  );
  if (mapped.length === 1 && mapped[0].text === " . . . ") return null;
  if (mapped[0].text === " . . . ") {
    mapped[0].text = ". . . ";
  }
  if (mapped[mapped.length - 1].text === " . . . ") {
    mapped[mapped.length - 1].text = " . . .";
  }
  return mapped;
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
            return {
              full: {
                ...p,
                lines: p.lines.map((l) => filterText(l, 1)),
              },
              partial: {
                ...p,
                lines: p.lines.map((l) => filterText(l, (p.max * 2) / 3)),
              },
              author: p.author,
              id: p.id,
              initial: p.initialLong,
              path: p.path,
            };
          }
          return {
            full: { ...p, text: filterText(p.text, 1) },
            partial: { ...p, text: filterText(p.text, (p.max * 2) / 3) },
            author: p.author,
            id: p.id,
            initial: p.initialLong,
            path: p.path,
          };
        });
      });
    },
    documents: (author) => api("documents", { author }),
    compilations: (author) => api("compilations", { author }),
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
      block === null
        ? null
        : Array.isArray(block)
        ? block.length
        : block.items.length,
    rgb: (...args) =>
      `#${args.map((x) => x.toString(16).padStart(2, "0")).join("")}`,
  },
  source
);
const renderer = render(document.getElementById("app"), history);

effect((effect) => {
  renderer(effect, compiled);
});
