const { filterDate } = require('../utils/filterDate');
const { filterRate } = require('../utils/filterRate');
const { getAllTalkers } = require('../utils/getAllTalkers');
const { queryTalker } = require('../utils/queryTalker');

module.exports = async (req, res, next) => {
  try {
    const { q, rate, date } = req.query;
    let response;
    if (q) {
      response = await queryTalker(q);
    } else {
      response = await getAllTalkers();
    } if (rate) {
      response = filterRate(response, rate);
    } if (date) {
      response = filterDate(response, date);
    }
    req.array = response;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};