const express = require('express');
const { getAllTalkers } = require('../utils/getAllTalkers');
const { getTalkerById } = require('../utils/getTalkerById');
const { postTalker } = require('../utils/postTalker');
const checkName = require('../middlewares/checkName');
const checkAge = require('../middlewares/checkAge');
const checkTalk = require('../middlewares/checkTalk');
const checkWatchedAt = require('../middlewares/checkWatchedAt');
const checkRate = require('../middlewares/checkRate');
const auth = require('../middlewares/auth');

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
    console.log(createdTalker);
    res.status(201).json({ ...createdTalker });
});

module.exports = router;