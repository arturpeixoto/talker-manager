module.exports = (req, res, next) => {
    const { email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      res
        .status(400)
        .json({
          message: 'O campo "email" é obrigatório',
        });
    }
    if (!emailRegex.test(email)) {
      res
        .status(400)
        .json({
          message: 'O "email" deve ter o formato "email@email.com"',
        });
    }
    next();
};