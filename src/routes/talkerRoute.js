const express = require('express');
const { getAllTalkers } = require('../utils/getAllTalkers');
const { getTalkerById } = require('../utils/getTalkerById');
const { postTalker } = require('../utils/postTalker');
const { putTalker } = require('../utils/putTalker');
const checkName = require('../middlewares/checkName');
const checkAge = require('../middlewares/checkAge');
const checkTalk = require('../middlewares/checkTalk');
const checkWatchedAt = require('../middlewares/checkWatchedAt');
const checkRate = require('../middlewares/checkRate');
const auth = require('../middlewares/auth');
const { removeTalker } = require('../utils/removeTalker');
const { queryTalker } = require('../utils/queryTalker');
const { filterRate } = require('../utils/filterRate');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const talkers = await getAllTalkers();
    res.status(200).json(talkers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Houve uma má requisição' });
  }
});

router.get('/search', 
  auth,
  async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const rateNumber = req.query.rate;
    let response;
    if (searchTerm) {
      response = await queryTalker(searchTerm);
    } else {
      response = await getAllTalkers();
    }
    if (rateNumber && response.length > 0) {
      response = filterRate(response, rateNumber);
    }
    res
      .status(200)
      .json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talker = await getTalkerById(id);
    if (talker) {
      res.status(200).json(talker);
    } else {
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Houve algum problema interno' });
  }
});

router.post('/', 
  auth,
  checkName,
  checkAge,
  checkTalk,
  checkWatchedAt,
  checkRate,
  async (req, res) => {
    const talker = req.body;
    const createdTalker = await postTalker(talker);
    res.status(201).json({ ...createdTalker });
});

router.put('/:id',
  auth,
  checkName,
  checkAge,
  checkTalk,
  checkWatchedAt,
  checkRate,
  async (req, res) => {
    try {
      const { id } = req.params;
      const talker = req.body;
      const updatedTalker = await putTalker(id, talker);
      if (typeof updatedTalker === 'object') {
        res.status(200).json({ ...updatedTalker });
      } else {
        res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', 
  auth,
  async (req, res) => {
    try {
      const { id } = req.params;
      await removeTalker(id);
      res.status(204).json();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

module.exports = router;