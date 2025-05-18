const express = require('express');
const router = express.Router();
const pool = require('../db');
const verifyToken = require('./middleware/verifyToken');

// Función auxiliar para validar datos
function validateData(data) {
  const requiredFields = ['nombres', 'apellido_p', 'apellido_m', 'curp', 'nss', 'rfc', 'telefono', 'calle', 'numero_interior', 'numero_exterior', 'colonia', 'codigo_postal', 'ciudad', 'estado',
    'nombresTestigo1', 'apellido_pTestigo1', 'apellido_mTestigo1', 'parentescoTestigo1', 'telefonoTestigo1',
    'nombresTestigo2', 'apellido_pTestigo2', 'apellido_mTestigo2', 'parentescoTestigo2', 'telefonoTestigo2'
  ];

  for (const field of requiredFields) {
    if (!data[field]) {
      return false;
    }
  }

  return true;
}

// Registrar nuevo asesor
router.post('/', verifyToken, async (req, res) => {
  try {
    const id_jefe = req.user.id_usuario;

    const {
      nombres, apellido_p, apellido_m, curp, nss, rfc,
      telefono, email, calle, numero_interior, numero_exterior, colonia,
      codigo_postal, ciudad, estado,
      nombresTestigo1, apellido_pTestigo1, apellido_mTestigo1, parentescoTestigo1, telefonoTestigo1,
      nombresTestigo2, apellido_pTestigo2, apellido_mTestigo2, parentescoTestigo2, telefonoTestigo2
    } = req.body;

    // Validación de datos
    if (!validateData(req.body)) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Buscar persona por CURP
    let persona = await pool.query(
      `SELECT id_persona FROM Personas WHERE curp = $1`,
      [curp]
    );

    let id_persona;
    if (persona.rows.length > 0) {
      // Si existe, actualizar datos
      id_persona = persona.rows[0].id_persona;
      await pool.query(
        `UPDATE Personas SET nombres=$1, apellido_p=$2, apellido_m=$3, nss=$4, rfc=$5, telefono=$6, email=$7, codigo_postal=$8, ciudad=$9, estado=$10
         WHERE id_persona=$11`,
        [nombres, apellido_p, apellido_m, nss, rfc, telefono, email || null, codigo_postal, ciudad, estado, id_persona]
      );
    } else {
      // Si no existe, insertar
      const newPersona = await pool.query(
        `INSERT INTO Personas (nombres, apellido_p, apellido_m, curp, nss, rfc, telefono, email, codigo_postal, ciudad, estado)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id_persona`,
        [nombres, apellido_p, apellido_m, curp, nss, rfc, telefono, email || null, codigo_postal, ciudad, estado]
      );
      id_persona = newPersona.rows[0].id_persona;
    }

    // Insertar en tabla Usuarios
    const newUsuario = await pool.query(
      `INSERT INTO Usuarios (id_persona, calle, numero_interior, numero_exterior, colonia, status, tipo, fecha_registro, jefe)
       VALUES ($1, $2, $3, $4, $5, 1, 1, NOW(), $6) RETURNING id_usuario`,
      [id_persona, calle, numero_interior, numero_exterior, colonia, id_jefe]
    );

    // Insertar el primer testigo
    const newTestigo1 = await pool.query(
      `INSERT INTO Testigos (nombres, apellido_p, apellido_m, parentesco, telefono, id_persona)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_testigo`,
      [nombresTestigo1, apellido_pTestigo1, apellido_mTestigo1, parentescoTestigo1, telefonoTestigo1, id_persona]
    );

    // Insertar el segundo testigo
    const newTestigo2 = await pool.query(
      `INSERT INTO Testigos (nombres, apellido_p, apellido_m, parentesco, telefono, id_persona)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_testigo`,
      [nombresTestigo2, apellido_pTestigo2, apellido_mTestigo2, parentescoTestigo2, telefonoTestigo2, id_persona]
    );

    res.json({
      msg: 'Asesor registrado correctamente',
      id_usuario: newUsuario.rows[0].id_usuario,
      testigos: [
        { id_testigo1: newTestigo1.rows[0].id_testigo },
        { id_testigo2: newTestigo2.rows[0].id_testigo }
      ]
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al registrar asesor: ' + err.message });
  }
});

module.exports = router;
