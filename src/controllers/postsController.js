const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ item: 'ok' });
});

router.get('/:id', (req, res) => {
  res.status(200).json({ item: 'ok' });
});

router.get('/search', (req, res) => {
  res.status(200).json({ item: 'ok' });
});

router.post('/', (req, res) => {
  res.status(200).json({ item: 'ok' });
});

router.put('/:id', (req, res) => {
  res.status(200).json({ item: 'ok' });
});

router.delete('/id', (req, res) => {
  res.status(200).json({ item: 'ok' });
});

module.exports = router;