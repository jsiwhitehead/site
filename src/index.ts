import { doubleMetaphone } from "double-metaphone";

import getTokens from "../data/tokens";
import stem from "../data/stem";
import { getParagraphText } from "../data/utils";

import initialDocs from "../data/json/initial.json";
import pairs from "../data/json/pairs.json";
import stemWords from "../data/json/stemWords.json";

import maraca, { atom, effect } from "./maraca";
import render from "./render";
import { getSearchDocs } from "./documents";

import "./style.css";

const textDecoder = new TextDecoder();

ReadableStream.prototype[Symbol.asyncIterator] = async function* () {
  const reader = this.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
};

async function readLines(url, process) {
  const response = await fetch(url);
  let buffer = "";
  for await (const chunk of response.body as any) {
    buffer += textDecoder.decode(chunk);
    let pos;
    while ((pos = buffer.indexOf("\n")) !== -1) {
      process(buffer.slice(0, pos));
      buffer = buffer.slice(pos + 1);
    }
  }
  process(buffer);
  process();
}

const $data = new Promise<any>((res) => {
  const data = [] as any;
  readLines("/data.txt", (line) => {
    if (line) {
      data.push(line);
    } else {
      res(data);
    }
  });
});
const $searchIndex = new Promise<any>((res) => {
  const searchIndex = new Map();
  readLines("/search.txt", (line) => {
    if (line) {
      const [key, data] = line.split("=");
      searchIndex.set(key, data.split(","));
    } else {
      res(searchIndex);
    }
  });
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

const highlightDoc = (doc, tokens) => {
  const texts = doc.paragraphs.map((para) => getParagraphText(para));
  const highlighted = texts.map((text) => {
    const phrases = text.split(/([.,;:!?](?=$|[^a-z]* [^a-z]*[a-z])|—)/gi);
    const split = phrases.flatMap((phrase, i) => {
      if (i % 2 === 1) return [{ text: phrase, highlight: false }];
      const words = phrase.split(" ").map((w) => w.split("‑"));
      const cleaned = words.map((group) =>
        group.map((w) =>
          w
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .normalize("NFC")
            .replace(/[^ a-z0-9‑’']/gi, "")
        )
      );
      return cleaned.flatMap((group, j) => {
        const prev = cleaned.slice(0, j).reverse().flat();
        const next = cleaned.slice(j + 1).flat();
        if (
          group.length > 1 &&
          (tokens.includes(stem(group.join(""), prev, next)) ||
            group.every((c, k) =>
              tokens.includes(
                stem(
                  c,
                  [...group.slice(0, k).reverse(), ...prev],
                  [...group.slice(k + 1), ...next]
                )
              )
            ))
        ) {
          return [
            ...(j > 0 ? [{ text: " ", highlight: false }] : []),
            { text: words[j].join("‑"), highlight: true },
          ];
        }
        return [
          ...(j > 0 ? [{ text: " ", highlight: false }] : []),
          ...group.flatMap((c, k) => [
            ...(k > 0 ? [{ text: "‑", highlight: false }] : []),
            {
              text: words[j][k],
              highlight: tokens.includes(
                stem(
                  c,
                  [...group.slice(0, k).reverse(), ...prev],
                  [...group.slice(k + 1), ...next]
                )
              ),
            },
          ]),
        ];
      });
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
        .map((x) => getTokens(x)[0])
        .filter((x) => x);

      if (baseTokens.length === 0 && filter === "All Writings and Prayers") {
        searchAtom.set(initialDocs.map((d) => highlightDoc(d, [])));
      } else {
        searchTimer = setTimeout(() => {
          Promise.all([$data, $searchIndex]).then(([data, searchIndex]) => {
            const tokens = baseTokens.map((t) =>
              searchIndex.has(t)
                ? t
                : [...new Set(doubleMetaphone(t))].join("|")
            );
            const docs = getSearchDocs(data, searchIndex, tokens, filter);
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
            const word = stemWords[p.key];
            allPairs[word] = (allPairs[word] || 0) + p.score;
            pairCounts[word] = (pairCounts[word] || 0) + 1;
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
