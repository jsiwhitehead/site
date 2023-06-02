import { getAuthors } from "./utils";

import prayers from "../data/prayers.json";

export const handler = async ({ body = "{}" }) => {
  try {
    const { author } = JSON.parse(body);
    const allAuthors = getAuthors(author);
    return {
      statusCode: 200,
      body: JSON.stringify(
        prayers.filter((d) => !author || allAuthors.includes(d.author))
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
