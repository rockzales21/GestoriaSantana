const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Usuarios u INNER JOIN Personas p ON p.id_persona = u.id_persona');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM Usuarios u 
       INNER JOIN Personas p ON p.id_persona = u.id_persona 
       WHERE u.id_usuario = $1`, [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombres, apellido_p, apellido_m, curp, nss, rfc, telefono, email, ciudad, estado, codigo_postal, calle, numero_interior, numero_exterior, colonia, status, tipo } = req.body;

  try {
    // Inicia una transacción para asegurar que ambos cambios suceden juntos
    await pool.query('BEGIN');

    // Actualiza la tabla Personas
    await pool.query(
      `UPDATE Personas SET nombres = $1, apellido_p = $2, apellido_m = $3, curp = $4, nss = $5, rfc = $6, telefono = $7, email = $8, ciudad = $9, estado = $10, codigo_postal = $11
       WHERE id_persona = (SELECT id_persona FROM Usuarios WHERE id_usuario = $12)`,
      [nombres, apellido_p, apellido_m, curp, nss, rfc, telefono, email, ciudad, estado, codigo_postal, id]
    );

    await pool.query(
      `UPDATE Usuarios SET calle = $1, numero_interior = $2, numero_exterior = $3, colonia = $4, status = $5, tipo = $6
       WHERE id_usuario = $7`,
      [calle, numero_interior, numero_exterior, colonia, status, tipo, id]
    );


    // Puedes incluir otras actualizaciones específicas de Usuarios aquí

    // Finaliza la transacción
    await pool.query('COMMIT');

    res.json({ message: 'Usuario actualizado con éxito' });
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});


module.exports = router;
