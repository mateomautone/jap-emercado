const jwt = require('jsonwebtoken');
const modules = require('../modules/modules');

const secreto = 'secreto';

const login = (req, res) => {
  const { username, password } = req.body;

  const user = modules.getUser(username, password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  const token = jwt.sign({ username: user.username }, secreto, { expiresIn: '1h' });

  res.json({ token });
};

module.exports = {
  login,
};