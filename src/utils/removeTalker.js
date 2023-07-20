const fs = require('fs').promises;
const path = require('path');

const TALKER_FILE = path.join(__dirname, '..', 'talker.json');

const removeTalker = async (id) => {
  try {
    const data = await fs.readFile(TALKER_FILE, 'utf-8');
    const res = JSON.parse(data);
    const personFound = res.find((person) => Number(person.id) === Number(id));
    if (!personFound) {
      throw new Error(`O talker com ID ${id} não foi encontrado`);
    }
    const arrayRemoved = res.filter((person) => Number(person.id) !== Number(id));
    await fs.writeFile(TALKER_FILE, JSON.stringify(arrayRemoved));
    return;
    } catch (error) {
    return console.log(error);
  } 
};

module.exports = { removeTalker };