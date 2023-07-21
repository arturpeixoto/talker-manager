const filterRate = (array, numberRate) => {
  const rate = Number(numberRate);
    if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
      throw new Error('O campo "rate" deve ser um número inteiro entre 1 e 5');
    }
    return array.filter((talker) => talker.talk.rate === parseFloat(rate));
};

module.exports = { filterRate };