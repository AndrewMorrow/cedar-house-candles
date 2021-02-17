const express = require('express');
const router = express.Router();

router.get('/me', (req, res) => {
  const { _id, name, email, date } = req.user;

  return res.json({ _id, name, email, date });
});

module.exports = router;
