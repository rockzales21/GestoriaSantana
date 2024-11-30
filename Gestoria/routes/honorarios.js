const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT monto FROM honorarios');
    if (result.rows.length > 0) {
      res.json({ monto: result.rows[0].monto }); // Envía solo el monto directamente
    } else {
      res.status(404).json({ error: 'No se encontró el monto de honorarios' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
