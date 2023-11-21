const jwt = require('jsonwebtoken');
const modules = require('../modules/modules');

const secreto = 'secreto';

const login = (req, res) => {
  const { username, password } = req.body;

  const token = jwt.sign({ username: username }, secreto, { expiresIn: '1h' });

  res.json({ token });
};

module.exports = {
  login,
};