const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT s.id_sucursal, s.oficina, s.encargado, s.tel_oficina, s.email, s.direccion, p.telefono AS telefonoEncargado FROM Sucursales s INNER JOIN usuarios u ON s.encargado = u.id_usuario INNER JOIN personas p ON p.id_persona = u.id_persona');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
