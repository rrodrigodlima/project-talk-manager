const express = require('express');

const path = require('path');
const readJson = require('./utils/fs/readJson');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// Talker Route

const talkersPath = path.resolve(__dirname, './talker.json');

app.get('/talker', async (_req, res) => {
  const talkers = await readJson(talkersPath);
  if (talkers.length === 0) return res.status(HTTP_OK_STATUS).json([]);
  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
    const talkers = await readJson(talkersPath);
    const talker = talkers.find(({ id }) => id === Number(req.params.id));
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(HTTP_OK_STATUS).json(talker);
});