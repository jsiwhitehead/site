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
              ].includes(d.author) && d.path?.[0] !== "Additional"
          )
          .filter(
            (d) =>
              !author ||
              allAuthors.includes(d.author) ||
              allAuthors.includes(d.epoch)
          )
          .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
          .map(({ paragraphs, ...info }) => info)
          .slice(0, 500)
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
