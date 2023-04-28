const fs = require('fs');
const path = require('path');

const talkersPath = path.resolve(__dirname, './talker.json');

const addTalkerToFile = async (req, res, next) => {
  const { name, age, talk } = req.body;
  const talker = {
    name,
    age,
    talk: {
      watchedAt: talk.watchedAt,
      rate: talk.rate,
    },
  };
  const fileContent = JSON.stringify(talker);
  await fs.writeFile(talkersPath, fileContent, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ocorreu um erro ao adicionar o palestrante.' });
    }
    next();
  });
};

module.exports = {
  addTalkerToFile,
};
