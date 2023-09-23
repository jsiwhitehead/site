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
          .filter((d) => d.author === "Compilation")
          .filter((d) => !author || allAuthors.includes(d.epoch))
          .sort((a, b) => a.title.localeCompare(b.title))
          .map(({ paragraphs, ...info }) => info)
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
