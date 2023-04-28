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

const validateDate = (req, res, next) => {
  const { query: { date }, filterParams } = req;
  const regex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/(19|20)\d{2}$/;
  if (date !== undefined) {
    if (date.length > 0 && !(regex.test(date))) {
      return res.status(400)
        .json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
    }
    const filter = filterParams.filter((e) => e.talk.watchedAt.includes(date));
    req.filterParams = filter;
    return next();
  }
  next();
};

module.exports = { 
  validateRate,
  validateDate,
};
