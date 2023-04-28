const express = require('express');
const crypto = require('crypto');

const path = require('path');
const readJson = require('./utils/fs/readJson');
const { validateEmail, validatePassword } = require('./middleware/userValidation');
const { authenticateToken } = require('./middleware/tokenValidation');
const validateAll = require('./middleware/postValidations');
const addTalker = require('./utils/addTalker');
const writeJson = require('./utils/fs/writeJson');

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

// Login

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const tokenCreator = crypto.randomBytes(8).toString('hex');
  const token = { token: tokenCreator };
  res.status(HTTP_OK_STATUS).json(token);
});

app.post('/talker', authenticateToken, validateAll, async (req, res) => {
    const talker = req.body;
    const newTalker = await addTalker(talkersPath, talker);
    return res.status(201).json(newTalker);
});

app.put('/talker/:id', authenticateToken, validateAll, async (req, res) => {
  const id = Number(req.params.id);
  const talkers = await readJson(talkersPath);
  const talker = talkers.find((t) => t.id === id);
  if (!talker) {
    return res.status(404)
     .json({ message: 'Pessoa palestrante não encontrada' });
  } 
  const index = talkers.indexOf(talker);
  const updated = { ...talker, ...req.body };
  talkers.splice(index, 1, updated);
  await writeJson(talkersPath, talkers);
  res.status(200).json(updated);
});

app.delete('/talker/:id', authenticateToken, async (req, res) => {
  const id = Number(req.params.id);
  const talkers = await readJson(talkersPath);
  const talker = talkers.find((t) => t.id === id);
  if (talker) {
    const index = talkers.indexOf(talker);
    talkers.splice(index, 1);
    await writeJson(talkersPath, talker);
  }
  res.sendStatus(204);
});