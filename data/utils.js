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

const getPath = (doc, paras) => {
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
  if (index !== 1) return undefined;
  if (text.startsWith(". . .")) return undefined;
  const result = /[a-z]/i.exec(text)?.index;
  return result === undefined ? result : result + 1;
};

const distinctCitations = (citations) =>
  citations && [
    ...new Set(
      citations.map((c) =>
        c.doc.startsWith("compilations") &&
        c.doc !== "compilations-bahai-org-001"
          ? "compilations"
          : c.doc.startsWith("ruhi")
          ? "ruhi"
          : c.doc
      )
    ),
  ];

const getLength = (words) => {
  const time = words / 238;
  if (time < 1) return 1;
  if (time < 5) return 2;
  if (time < 30) return 3;
  return 4;
};

export const compileDoc = (data, id) => {
  const { paragraphs, ...info } = data[id];

  const totalCitations = [];
  let words = 0;

  const paras = paragraphs.map((para) => {
    if (para.section) return para;
    const baseParts = getParaParts(data, para);
    const text = baseParts.map((p) => p.text).join("");
    words += text.split(" ").length;
    const first = getFirstChar(!para.lines && para.index, text);
    const split = splitParts(baseParts, [
      ...(first === undefined ? [] : [first]),
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
          // .map((c) => c.doc)
        ),
      ];
      return {
        ...p,
        ...(first !== undefined && end <= first ? { first: true } : {}),
        ...(partCitations.length > 0
          ? {
              citations: distinctCitations(partCitations).length,
              allCitations: partCitations.length,
            }
          : {}),
      };
    });
    totalCitations.push(...(para.citations || []));
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
        // ...(para.citations?.length > 0
        //   ? { citations: distinctCitations(para.citations).length }
        //   : {}),
        ...(paraCitations > 0 ? { citations: paraCitations } : {}),
      };
    }
    return {
      ...para,
      parts,
      citations: undefined,
      // ...(para.citations?.length > 0
      //   ? { citations: distinctCitations(para.citations).length }
      //   : {}),
      ...(paraCitations > 0 ? { citations: paraCitations } : {}),
      ...(para.quote
        ? {
            ref: unique(parts.map((p) => p.doc).filter((x) => x)).map((doc) =>
              getPath(
                data[doc],
                unique(
                  parts.filter((p) => p.doc === doc).map((p) => p.paragraph)
                )
              )
            ),
          }
        : {}),
    };
  });

  const docCitations = Math.max(...paras.map((para) => para.citations || 0));
  return {
    ...info,
    // ...(totalCitations.length > 0
    //   ? { citations: distinctCitations(totalCitations).length }
    //   : {}),
    ...(docCitations > 0 ? { citations: docCitations } : {}),
    ...(paras.every((p) => p.type || p.lines) ? { allSpecial: true } : {}),
    length: getLength(words),
    paragraphs: paras,
  };
};