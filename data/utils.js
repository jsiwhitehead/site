const unique = (x) => [...new Set(x)];

const splitParts = (parts, splits) => {
  const sortedSplits = [...new Set(splits)].sort((a, b) => a - b);
  const res = [];
  let index = 0;
  for (const p of parts) {
    let next = index + p.text.length;
    const partSplits = [
      ...new Set([
        0,
        ...sortedSplits
          .filter((c) => index <= c && c <= next)
          .map((c) => c - index),
        p.text.length,
      ]),
    ];
    res.push(
      ...partSplits
        .slice(1)
        .map((c, i) => ({ ...p, text: p.text.slice(partSplits[i], c) }))
    );
    index = next;
  }
  return res;
};
const sliceParts = (parts, start, end) => {
  const res = [];
  let index = 0;
  for (const p of splitParts(parts, [start, end])) {
    let next = index + p.text.length;
    if (next > start && index < end) res.push(p);
    index = next;
  }
  return res;
};

export const getPath = (doc, paras) => {
  const indices = paras.map((p) => doc.paragraphs[p].index).filter((x) => x);
  if (doc.path?.[0] === "Additional") {
    return [doc.author];
  }
  return unique(
    [
      doc.author,
      ...(doc.path || []).filter(
        (p) =>
          ![
            "Selections from the Writings of the Báb",
            "Part Two: Letters from Shoghi Effendi",
            "Selected Messages of the Universal House of Justice",
            "Additional",
          ].includes(p)
      ),
      doc.title || (doc.item && `#${doc.item}`),
      indices.length > 0 &&
        (indices.length === 1
          ? `para ${indices[0]}`
          : `paras ${Math.min(...indices)}‑${Math.max(...indices)}`),
    ].filter((x) => x)
  );
};

const getParaParts = (data, para) => {
  if (para.section) throw new Error();
  return para.parts.flatMap((p) => {
    if (typeof p === "string") return [{ text: p }];
    return sliceParts(
      getParaParts(data, data[p.doc].paragraphs[p.paragraph]),
      p.start,
      p.end
    ).map((part) =>
      part.doc
        ? part
        : {
            doc: p.doc,
            paragraph: p.paragraph,
            ...part,
          }
    );
  });
};

const getFirstChar = (index, text) => {
  if (index !== 1) return false;
  if (text.startsWith(". . .")) return false;
  const result = /[a-z]/i.exec(text)?.index;
  return result === undefined ? false : result + 1;
};

export const distinctCitations = (data, citations) => [
  ...new Set(
    citations.map((c) =>
      data[c.doc].id.startsWith("compilations") &&
      data[c.doc].id !== "compilations-bahai-org-001"
        ? "compilations"
        : data[c.doc].id.startsWith("ruhi")
        ? "ruhi"
        : data[c.doc].id
    )
  ),
];

export const compileParagraph = (data, para, withFirst) => {
  if (para.section) return para;
  const baseParts = getParaParts(data, para);
  const text = baseParts.map((p) => p.text).join("");
  const first = withFirst && getFirstChar(!para.lines && para.index, text);
  const split = splitParts(baseParts, [
    ...(first ? [first] : []),
    ...(para.citations || []).flatMap((c) => [c.start, c.end]),
    ...(para.lines || []).flatMap((l) => [l - 1, l]),
  ]);
  let index = 0;
  const parts = split.map((p) => {
    const start = index;
    const end = (index += p.text.length);
    const partCitations = [
      ...new Set(
        (para.citations || []).filter((c) => c.start <= start && end <= c.end)
      ),
    ];
    return {
      ...p,
      ...(first !== undefined && end <= first ? { first: true } : {}),
      ...(partCitations.length > 0
        ? {
            citations: distinctCitations(data, partCitations).length,
            allCitations: partCitations.length,
          }
        : {}),
    };
  });
  const paraCitations = Math.max(...parts.map((p) => p.citations || 0));
  if (para.lines) {
    return {
      ...para,
      lines: para.lines.slice(0, -1).map((start, j) => {
        const end = para.lines[j + 1] - 1;
        let index = 0;
        return parts.filter((p) => {
          const pStart = index;
          const pEnd = (index += p.text.length);
          return start <= pStart && pEnd <= end;
        });
      }),
      parts: undefined,
      citations: undefined,
      ...(paraCitations > 0 ? { citations: paraCitations } : {}),
    };
  }
  return {
    ...para,
    parts,
    citations: undefined,
    ...(paraCitations > 0 ? { citations: paraCitations } : {}),
  };
};

export const getParagraphText = (para) => {
  if (para.section) return para.title || "* * *";
  if (!para.lines) return para.parts.map((p) => p.text).join("");
  return para.lines.map((parts) => parts.map((p) => p.text).join("")).join(" ");
};

const getLength = (text) => {
  const words = text.split(" ").length;
  const time = words / 238;
  if (time < 1) return 1;
  if (time < 5) return 2;
  if (time < 30) return 3;
  return 4;
};

export const compileDoc = (data, index, withFirst) => {
  const paragraphs = data[index].paragraphs.map((para) =>
    compileParagraph(data, para, withFirst)
  );
  return {
    ...data[index],
    paragraphs,
    length: getLength(
      paragraphs.map((para) => getParagraphText(para)).join(" ")
    ),
    citations: Math.max(...paragraphs.map((para) => para.citations)),
    allSpecial: paragraphs.every((para) => para.type || para.lines),
  };
};

export const getDocByKey = (data, docIndex, paraStart, paraEnd = paraStart) => {
  const doc = data[docIndex];
  // if (!para) {
  //   return {
  //     ...doc,
  //     path: !doc.title ? [...doc.path, `#${doc.item}`] : doc.path,
  //     paragraphs: doc.paragraphs.map((para) =>
  //       compileParagraph(data, para, true)
  //     ),
  //     citedBy: unique(
  //       doc.paragraphs.flatMap((para) =>
  //         (para.citations || []).map((c) => c.doc)
  //       )
  //     )
  //       .sort((a, b) => a - b)
  //       .map((index) => getPath(data[index], [])),
  //   };
  // }
  const paras = doc.paragraphs.filter((_, i) => paraStart <= i && i <= paraEnd);
  return {
    ...doc,
    path: !doc.title ? [...doc.path, `#${doc.item}`] : doc.path,
    paragraphs: paras.map((para) => compileParagraph(data, para, true)),
    citedBy: unique(
      paras.flatMap((para) => (para.citations || []).map((c) => c.doc))
    )
      .sort((a, b) => a - b)
      .map((index) => getPath(data[index], [])),
    // [compileParagraph(data, doc.paragraphs[para], true)],
    // citedBy: unique((doc.paragraphs[para].citations || []).map((c) => c.doc))
    //   .sort((a, b) => a - b)
    //   .map((index) => getPath(data[index], [])),
  };
};
