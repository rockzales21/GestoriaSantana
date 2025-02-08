const express = require('express');
const router = express.Router();
const pool = require('../db');


// Obtener todas las sucursales
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT s.id_sucursal, s.oficina, s.encargado, s.tel_oficina, s.email, s.direccion, p.telefono AS telefonoEncargado FROM Sucursales s INNER JOIN usuarios u ON s.encargado = u.id_usuario INNER JOIN personas p ON p.id_persona = u.id_persona');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Crear una nueva sucursal
router.post('/', async (req, res) => {
  const { oficina, encargado, tel_oficina, email, direccion, telefonoencargado } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO Sucursales (oficina, encargado, tel_oficina, email, direccion, celular) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [oficina, encargado, tel_oficina, email, direccion, telefonoencargado]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Actualizar una sucursal existente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { oficina, encargado, tel_oficina, email, direccion, telefonoencargado } = req.body;
  try {
    const result = await pool.query(
      'UPDATE Sucursales SET oficina = $1, encargado = $2, tel_oficina = $3, email = $4, direccion = $5, celular = $6 WHERE id_sucursal = $7 RETURNING *',
      [oficina, encargado, tel_oficina, email, direccion, telefonoencargado, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Eliminar una sucursal
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM Sucursales WHERE id_sucursal = $1', [id]);
    res.send('Sucursal eliminada');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});



module.exports = router;
