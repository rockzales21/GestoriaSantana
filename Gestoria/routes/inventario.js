const express = require('express');
const router = express.Router();
const pool = require('../db'); // Asegúrate de que tienes configurada la conexión a la base de datos en este archivo

// Obtener todos los elementos del inventario
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventario');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Agregar un nuevo elemento al inventario
router.post('/', async (req, res) => {
  try {
    const { sku, descripcion, serie, status, cantidad, observaciones } = req.body;
    const result = await pool.query(
      'INSERT INTO inventario (sku, descripcion, serie, status, cantidad, observaciones) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [sku, descripcion, serie, status, cantidad, observaciones]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Actualizar un elemento del inventario
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { sku, descripcion, serie, status, cantidad, observaciones } = req.body;

    const result = await pool.query(
      'UPDATE inventario SET sku = $1, descripcion = $2, serie = $3, status = $4, cantidad = $5, observaciones = $6 WHERE id_item = $7 RETURNING *',
      [sku, descripcion, serie, status, cantidad, observaciones, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Elemento no encontrado');
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
