const express = require('express');
const AuthController = require('../controllers/auth-controller');

const router = express.Router();

router.post('/login', AuthController.authenticate);

module.exports = router;
