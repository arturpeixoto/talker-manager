const fs = require('fs').promises;
const path = require('path');

const TALKER_FILE = path.join(__dirname, '..', 'talker.json');

const postTalker = async (talker) => {
  try {
    const data = await fs.readFile(TALKER_FILE, 'utf-8');
    const res = JSON.parse(data);
    if (res === []) {
      const talkerObj1 = { id: 1, ...talker };
      res.push(talkerObj1);
      await fs.writeFile(TALKER_FILE, JSON.stringify(res));
      return talkerObj1;
    } 
      const allIDs = res.map((person) => person.id);
      const talkerID = Math.max(...allIDs);
      const talkerObj2 = { id: talkerID + 1, ...talker };
      res.push(talkerObj2);
      await fs.writeFile(TALKER_FILE, JSON.stringify(res));
      return talkerObj2;
  } catch (error) {
    return console.log(error);
  } 
};

module.exports = { postTalker };