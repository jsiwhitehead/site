import { getAuthors } from "./utils";

import writings from "../data/writings.json";

export const handler = async ({ body = "{}" }) => {
  try {
    const { author } = JSON.parse(body);
    const allAuthors = getAuthors(author);
    const docs = writings
      .filter(
        (d) =>
          ![
            "The Ruhi Institute",
            "Compilation",
            "The Bible",
            "Muḥammad",
          ].includes(d.author) &&
          !(
            d.path?.[0] === "Bahá’í Prayers" && d.author === "Shoghi Effendi"
          ) &&
          d.type !== "Prayer" &&
          !d.compilation &&
          JSON.stringify(d.path) !== '["The Most Holy Book","Notes"]' &&
          JSON.stringify(d.path) !== '["Citadel of Faith","In Memoriam"]' &&
          ![
            "Foreword",
            "Preface",
            "Introduction",
            "A Description of the Kitáb‑i‑Aqdas by Shoghi Effendi",
          ].includes(d.title)
      )
      .filter(
        (d) =>
          !author ||
          allAuthors.includes(d.author) ||
          allAuthors.includes(d.epoch)
      )
      .sort((a, b) =>
        ["The Báb", "Bahá’u’lláh", "‘Abdu’l‑Bahá"].includes(a.author)
          ? // b.time.length - a.time.length ||
            b.score - a.score || a.id.localeCompare(b.id)
          : // b.time.length - a.time.length ||
            b.score - a.score ||
            (b.years[0] + b.years[1]) / 2 - (a.years[0] + a.years[1]) / 2 ||
            a.id.localeCompare(b.id)
      )
      .map(({ paragraphs, ...info }) =>
        info.time.length === 1 ? { paragraphs, ...info } : info
      );
    return {
      statusCode: 200,
      body: JSON.stringify([
        docs.filter((d) => d.time.length === 1),
        docs.filter((d) => d.time.length === 2),
        docs.filter((d) => d.time.length === 3),
        docs.filter((d) => d.time.length === 4),
        // docs.filter((d) => d.time.length === 5),
      ]),
      headers: { "Content-Type": "application/json" },
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e,
    };
  }
};
