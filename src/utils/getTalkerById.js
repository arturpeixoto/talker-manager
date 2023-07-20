const fs = require('fs').promises;
const path = require('path');

const TALKER_FILE = path.join(__dirname, '..', 'talker.json');

const getTalkerById = async (id) => {
  try {
    const data = await fs.readFile(TALKER_FILE, 'utf-8');
    const res = JSON.parse(data);
    const chosenTalker = res.find((talker) => Number(talker.id) === Number(id));
    if (!chosenTalker) {
      throw new Error(`O talker com ID ${id} não foi encontrado`);
    }
    return chosenTalker;
  } catch (error) {
    return console.log(error);
  }
};

module.exports = { getTalkerById };