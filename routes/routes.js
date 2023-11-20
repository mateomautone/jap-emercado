const express = require('express');
const controller = require('../controllers/controllers');
const router = express.Router();


router.post('/login', controller.login);

module.exports = router;