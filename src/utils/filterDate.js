const filterDate = (array, date) => {
  const isFormatDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!isFormatDate.test(date)) {
    throw new Error('O parâmetro "date" deve ter o formato "dd/mm/aaaa"');
  }
  return array.filter((talker) => talker.talk.watchedAt === date);
};

module.exports = { filterDate };