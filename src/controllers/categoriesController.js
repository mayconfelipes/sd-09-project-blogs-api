const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ item: 'ok' });
});

router.post('/', (req, res) => {
  res.status(200).json({ item: 'ok' });
});

module.exports = router;
