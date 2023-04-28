const readJson = require('./fs/readJson');
const writeJson = require('./fs/writeJson');

const addTalker = async (path, data) => {
  const database = await readJson(path);
  const id = database[database.length - 1].id + 1;
  const newTalker = { id, ...data };
  const updatedDB = [...database, newTalker];
  await writeJson(path, updatedDB);
  return newTalker;
};

module.exports = addTalker;