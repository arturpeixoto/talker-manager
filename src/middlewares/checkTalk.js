module.exports = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || typeof talk !== 'object') {
    return res
      .status(400)
      .json({ message: 'O campo "talk" é obrigatório' });
  }
  if (!('watchedAt' in talk)) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!('rate' in talk)) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" é obrigatório' });
  }
  next();
};
