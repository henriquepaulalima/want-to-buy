const express = require('express');
const router = express.Router();
const { items } = require('../models/index');

router.get('/', async (req, res) => {
  try {
    const allItems = await items.findAll();
    res.json(allItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
