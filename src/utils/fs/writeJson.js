const fs = require('fs/promises');

const writeJson = async (path, data) => {
  await fs.writeFile(path, JSON.stringify(data), (err) => {
    if (err) throw err;
  }); 
};

module.exports = writeJson;