import { getAuthors } from "./utils";

import writings from "../data/writings.json";

export const handler = async ({ body = "{}" }) => {
  try {
    const { author } = JSON.parse(body);
    const allAuthors = getAuthors(author);
    return {
      statusCode: 200,
      body: JSON.stringify(
        writings
          .filter(
            (d) =>
              ![
                "The Ruhi Institute",
                "Compilation",
                "The Bible",
                "Muḥammad",
              ].includes(d.author)
          )
          .filter(
            (d) =>
              !author ||
              allAuthors.includes(d.author) ||
              allAuthors.includes(d.epoch)
          )
          .filter((d) => d.time.length > 1)
          .flatMap((d) => d.paragraphs)
          .filter((p) => p.score > 0)
          .sort(
            (a, b) =>
              b.score - a.score || a.id.localeCompare(b.id) || a.index - b.index
          )
          .map(({ paragraphs, ...info }) => info)
          .slice(0, 250)
      ),
      headers: { "Content-Type": "application/json" },
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e,
    };
  }
};
