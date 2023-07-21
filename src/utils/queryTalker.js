const fs = require('fs').promises;
const path = require('path');

const TALKER_FILE = path.join(__dirname, '..', 'talker.json');

const queryTalker = async (term) => {
  try {
    const data = await fs.readFile(TALKER_FILE, 'utf-8');
    const res = JSON.parse(data);
    const queryData = res
      .filter((talker) => talker.name.toLowerCase().includes(term.toLowerCase()));
    return queryData;
  } catch (error) {
    return console.log(error);
  }
};

module.exports = { queryTalker };