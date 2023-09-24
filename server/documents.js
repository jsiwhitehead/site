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
          d.path?.[0] !== "Additional" &&
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
      .map(({ paragraphs, ...info }) => info)
      .slice(0, 800);
    return {
      statusCode: 200,
      body: JSON.stringify({
        books: docs.filter((d) => d.time.length === 5),
        long: docs.filter((d) => d.time.length === 4),
        short: docs.filter((d) => d.time.length < 4),
      }),
      headers: { "Content-Type": "application/json" },
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e,
    };
  }
};
