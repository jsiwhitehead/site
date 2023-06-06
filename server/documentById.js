import writings from "../data/writings.json";

export const handler = async ({ body = "{}" }) => {
  try {
    const { id } = JSON.parse(body);
    return {
      statusCode: 200,
      body: JSON.stringify(writings.find((d) => d.id === id)),
      headers: { "Content-Type": "application/json" },
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e,
    };
  }
};
