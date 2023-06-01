const fs = require("fs").promises;
const path = require("path");

exports.handler = async () => {
  try {
    const data = require("./data.json");
    return {
      statusCode: 200,
      body: JSON.stringify(Object.keys(data)),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e,
    };
  }
};
