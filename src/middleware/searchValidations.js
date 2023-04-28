const validateRate = async (req, res, next) => {
  const { query: { rate }, filterParams } = req;
  if (rate !== undefined) {
    if (!([1, 2, 3, 4, 5].includes(Number(rate)))) {
      return res.status(400)
        .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    const filter = filterParams.filter((e) => Number(e.talk.rate) === Number(rate));
    req.filterParams = filter;
    return next();
  }
  next();
};

module.exports = { 
  validateRate,
};
