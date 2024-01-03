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

const pairs = new Map();
readLines("/pairs.txt", (line) => {
  const [key, data] = line.split("=");
  pairs.set(
    key,
    data.split(",").map((x) => {
      const [key, score] = x.split(":");
      return { key, score: parseInt(score, 10) };
    })
  );
});

const stemWords = new Map();
readLines("/stemWords.txt", (line) => {
  const [key, value] = line.split("=");
  stemWords.set(key, value);
});

let tokens;
let done = true;
const attempt = () => {
  if (
    loadedUrls["/stemWords.txt"] &&
    (loadedUrls["/pairs.txt"] || tokens.every((t) => pairs.has(t)))
  ) {
    const allPairs = {};
    const pairCounts = {};
    for (const t of tokens) {
      for (const p of pairs.get(t) || []) {
        if (!tokens.includes(p.key)) {
          const word = stemWords.get(p.key);
          allPairs[word] = (allPairs[word] || 0) + p.score;
          pairCounts[word] = (pairCounts[word] || 0) + 1;
        }
      }
    }
    for (const k of Object.keys(allPairs)) {
      allPairs[k] = allPairs[k] / pairCounts[k];
    }
    postMessage(
      Object.keys(allPairs)
        .sort((a, b) => allPairs[b] - allPairs[a])
        .slice(0, 10)
    );
  }
};

onmessage = (e) => {
  tokens = e.data.tokens;
  done = false;
  attempt();
};
