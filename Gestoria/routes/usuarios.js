const express = require('express');
const router = express.Router();
const pool = require('../db');
const verifyToken = require('./middleware/verifyToken');

router.use(verifyToken);

router.get('/', async (req, res) => {
  const userId = req.user.id_usuario; // Asumiendo que el middleware de autenticación agrega el ID del usuario a req.user
  const userType = req.user.tipo; // Asumiendo que el middleware de autenticación agrega el tipo de usuario a req.user

  let query = `
    SELECT u.*, p.*, s.direccion 
    FROM Usuarios u 
    INNER JOIN Personas p ON p.id_persona = u.id_persona 
    INNER JOIN Usuarios uJefe ON u.jefe = uJefe.id_usuario
    INNER JOIN Personas pJefe ON pJefe.id_persona = uJefe.id_persona
    INNER JOIN Sucursales s ON s.encargado = pJefe.id_persona
  `;

  const values = [];
  if (userType !== 3) {
    query += ` WHERE u.jefe = $1`;
    values.push(userId);
  }

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

router.get('/asesores', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id_usuario, nombres || ' ' || apellido_p || ' ' || apellido_m AS nombre
      FROM Usuarios u 
      INNER JOIN Personas p ON p.id_persona = u.id_persona
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

router.get('/encargados', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT u.id_usuario, nombres || ' ' || apellido_p || ' ' || apellido_m AS nombre
      FROM Usuarios u 
      INNER JOIN Personas p ON p.id_persona = u.id_persona
      INNER JOIN public.users us ON us.id_usuario = u.id_usuario
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

router.get('/asesores2', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id_usuario, nombres || ' ' || apellido_p || ' ' || apellido_m AS nombre
      FROM Usuarios u 
      INNER JOIN Personas p ON p.id_persona = u.id_persona
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

router.get('/produccionYear', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.nombres || ' ' || p.apellido_p || ' ' || p.apellido_m AS nombre, COUNT(c.id_cliente)
      FROM  Usuarios u 
      INNER JOIN Personas p ON p.id_persona = u.id_persona
      INNER JOIN clientes c ON c.id_asesor = u.id_usuario
      WHERE DATE_PART('year', c.fecha_registro) = DATE_PART('year', CURRENT_DATE)
      GROUP BY p.nombres || ' ' || p.apellido_p || ' ' || p.apellido_m
      ORDER BY COUNT(c.id_cliente)
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

router.get('/produccionSemana', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
      DATE_PART('week', c.fecha_registro) AS semana,
      COUNT(c.id_cliente) AS total_clientes
      FROM clientes c
      WHERE DATE_PART('year', c.fecha_registro) = DATE_PART('year', CURRENT_DATE)
      GROUP BY DATE_PART('week', c.fecha_registro)
      ORDER BY semana
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

router.get('/produccionMes', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT CASE 
              WHEN DATE_PART('month', c.fecha_registro) = 1 THEN 'Enero'
              WHEN DATE_PART('month', c.fecha_registro) = 2 THEN 'Febrero'
              WHEN DATE_PART('month', c.fecha_registro) = 3 THEN 'Marzo'
              WHEN DATE_PART('month', c.fecha_registro) = 4 THEN 'Abril'
              WHEN DATE_PART('month', c.fecha_registro) = 5 THEN 'Mayo'
              WHEN DATE_PART('month', c.fecha_registro) = 6 THEN 'Junio'
              WHEN DATE_PART('month', c.fecha_registro) = 7 THEN 'Julio'
              WHEN DATE_PART('month', c.fecha_registro) = 8 THEN 'Agosto'
              WHEN DATE_PART('month', c.fecha_registro) = 9 THEN 'Septiembre'
              WHEN DATE_PART('month', c.fecha_registro) = 10 THEN 'Octubre'
              WHEN DATE_PART('month', c.fecha_registro) = 11 THEN 'Noviembre'
              WHEN DATE_PART('month', c.fecha_registro) = 12 THEN 'Diciembre'
              END AS mes,
              COUNT(c.id_cliente) AS total_clientes
              FROM clientes c
              WHERE DATE_PART('year', c.fecha_registro) = DATE_PART('year', CURRENT_DATE)
              GROUP BY DATE_PART('month', c.fecha_registro)
              ORDER BY DATE_PART('month', c.fecha_registro)
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

router.get('/produccionAnio', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
    COUNT(c.id_cliente) AS total_clientes
FROM 
    clientes c
WHERE 
    DATE_PART('year', c.fecha_registro) = DATE_PART('year', CURRENT_DATE)
    `);
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
      `SELECT u.*, p.*,s.direccion FROM Usuarios u 
       INNER JOIN Personas p ON p.id_persona = u.id_persona 
       INNER JOIN Personas pJefe ON pJefe.id_persona = u.jefe
       INNER JOIN Sucursales s ON s.encargado = pJefe.id_persona
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

    // Finaliza la transacción
    await pool.query('COMMIT');

    res.json({ message: 'Usuario actualizado con éxito' });
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

router.get('/detalle/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT p.nombres || ' ' || p.apellido_p || ' ' || p.apellido_m AS nombreCompleto,
              p.nss, p.curp, p.nss, p.rfc, p.telefono, p.email, 
              u.calle || ', Int:' || u.numero_interior || ', Ext:' || u.numero_exterior || ', ' || u.colonia || ', ' || p.ciudad || ', ' || p.estado || '. CP: ' || p.codigo_postal AS direccionCompleta,
              pJefe.nombres || ' ' || pJefe.apellido_p || ' ' || pJefe.apellido_m AS aCargo,
              s.oficina
       FROM Usuarios u 
       INNER JOIN Personas p ON p.id_persona = u.id_persona 
       INNER JOIN Usuarios uJefe ON u.jefe = uJefe.id_usuario
       INNER JOIN Personas pJefe ON pJefe.id_persona = uJefe.id_persona
       INNER JOIN Sucursales s ON s.encargado = pJefe.id_persona
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


router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Actualiza el campo status a 0 para "eliminar" el usuario
    const result = await pool.query(
      `UPDATE Usuarios SET status = 0 WHERE id_usuario = $1`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario eliminado con éxito' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});


module.exports = router;
