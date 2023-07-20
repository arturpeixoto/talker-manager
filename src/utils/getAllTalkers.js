const fs = require('fs').promises;
const path = require('path');

const TALKER_FILE = path.join(__dirname, '..', 'talker.json');

const getAllTalkers = async () => {
  try {
    const data = await fs.readFile(TALKER_FILE, 'utf-8');
    const res = JSON.parse(data);
    return res;
  } catch (error) {
    return console.log(error);
  }
};

module.exports = { getAllTalkers };