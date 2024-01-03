import { doubleMetaphone } from "double-metaphone";

import { getDocByKey } from "../data/utils";

import { getSearchDocs } from "./documents";
import highlightDoc from "./highlight";

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

const textDecoder = new TextDecoder();
const loadedUrls = {};
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
    if (!done) attempt();
  }
  loadedUrls[url] = true;
  process(buffer);
  if (!done) attempt();
}

const allStems = new Set();
readLines("/stems.txt", (line) => {
  allStems.add(line);
});

const searchIndex = new Map();
readLines("/search.txt", (line) => {
  const [key, data, count = 1] = line.split("=");
  searchIndex.set(key, { data: data.split(","), count });
});

const cited = [] as any;
let citedIndex = 0;
readLines("/cited.txt", (line) => {
  if (line) {
    const d = JSON.parse(line);
    for (const p of Object.keys(d)) {
      cited.push({
        doc: citedIndex,
        para: parseInt(p, 10),
        score: d[p][0],
        level: d[p][1],
      });
    }
  }
  citedIndex++;
});

const data = [] as any;
readLines("/data.txt", (line) => {
  const i = line.indexOf(":");
  data[line.slice(0, i)] = line.slice(i + 1);
});

let tokens;
let filter;
let docs;
let res = [] as any;
let done = true;
const attempt = () => {
  if (
    loadedUrls["/stems.txt"] &&
    loadedUrls["/cited.txt"] &&
    (loadedUrls["/search.txt"] ||
      (tokens.length === 1 && tokens.every((t) => searchIndex.has(t))))
  ) {
    const mappedTokens = tokens.map((t) =>
      /[0A-Z]/.test(t) || allStems.has(t)
        ? t
        : [...new Set(doubleMetaphone(t))].join("|")
    );
    docs = docs || getSearchDocs(searchIndex, cited, mappedTokens, filter, 30);

    let loaded = loadedUrls["/data.txt"]
      ? 30
      : docs.findIndex((d) => !data[d.doc]);
    if (loaded === -1) loaded = 30;
    if (loaded > res.length) {
      res = [
        ...res,
        ...docs
          .slice(res.length, loaded)
          .map((d) =>
            highlightDoc(
              getDocByKey(data, d.doc, d.start, d.end, d.levels),
              mappedTokens
            )
          ),
      ];
      if (loaded === 30) done = true;
      postMessage(loaded === 30 ? res : [...res, false]);
    }
  }
};

onmessage = (e) => {
  tokens = e.data.tokens;
  filter = e.data.filter;
  docs = null;
  res = [];
  done = false;
  attempt();
};
