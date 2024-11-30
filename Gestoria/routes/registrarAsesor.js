const express = require('express');
const router = express.Router();
const pool = require('../db');

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
router.post('/', async (req, res) => {
  try {
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

    // Insertar en tabla Personas
    const newPersona = await pool.query(
      `INSERT INTO Personas (nombres, apellido_p, apellido_m, curp, nss, rfc, telefono, email, codigo_postal, ciudad, estado)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id_persona`,
      [nombres, apellido_p, apellido_m, curp, nss, rfc, telefono, email || null, codigo_postal, ciudad, estado]
    );

    const id_persona = newPersona.rows[0].id_persona;

    // Insertar en tabla Usuarios
    const newUsuario = await pool.query(
      `INSERT INTO Usuarios (id_persona, calle, numero_interior, numero_exterior, colonia, status, tipo, fecha_registro, jefe)
       VALUES ($1, $2, $3, $4, $5, 1, 1, NOW(), NULL) RETURNING id_usuario`,
      [id_persona, calle, numero_interior, numero_exterior, colonia]
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

    res.json({ msg: 'Asesor registrado correctamente', id_usuario: newUsuario.rows[0].id_usuario,
      testigos: [
        { id_testigo1: newTestigo1.rows[0].id_testigo },
        { id_testigo2: newTestigo2.rows[0].id_testigo }
      ] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al registrar asesor: ' + err.message });
  }
});

module.exports = router;
