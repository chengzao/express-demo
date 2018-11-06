'use strict'
const router = require('express').Router()

router.get('/', (req, res) => {
  res.send({pah: 'Home'});
});

router.get('/login', (req, res) => {
  res.send({path: 'login'});
});

module.exports = router;