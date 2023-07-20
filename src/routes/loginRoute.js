const express = require('express');
const generateToken = require('../utils/generateToken');
const checkEmail = require('../middlewares/checkEmail');
const checkPassword = require('../middlewares/checkPassword');

const router = express.Router();

router.post('/', 
  checkEmail,
  checkPassword,
  (req, res) => {
    const userToken = generateToken();
    res.status(200).json({ token: userToken });
});

module.exports = router;