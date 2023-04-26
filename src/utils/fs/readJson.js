const fs = require('fs').promises;

const readJson = async (path) => {
  try {
    const data = await fs.readFile(path);
    return JSON.parse(data);
  } catch (err) {
    console.error(err.message);
    throw new Error(err.message);
  }
};

module.exports = readJson;