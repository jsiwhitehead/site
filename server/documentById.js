import writings from "../data/writings.json";
import prayers from "../data/prayers.json";

export const handler = async ({ body = "{}" }) => {
  try {
    const { id } = JSON.parse(body);
    return {
      statusCode: 200,
      body: JSON.stringify(
        writings.find((d) => d.id === id) || prayers.find((d) => d.id === id)
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
