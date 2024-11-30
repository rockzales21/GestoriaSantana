const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('¡Hola Mundo desde la ruta!');
});

module.exports = router;

