const express = require('express');
const router = express.Router();
const pool = require('../db');

// Función auxiliar para validar datos
function validateData(data) {
  const requiredFields = ['nombres', 'apellido_p', 'apellido_m', 'curp', 'nss', 'rfc', 'telefono', 
        'codigo_postal', 'ciudad', 'estado',
        'semanas_cotizadas', 'semanas_descontadas', 'id_afore', 'direccion', 'status', 'tipo_tramite',
        'id_asesor',
    'nombresTestigo1', 'apellido_pTestigo1', 'apellido_mTestigo1', 'parentescoTestigo1', 'telefonoTestigo1',
      'nombresTestigo2', 'apellido_pTestigo2', 'apellido_mTestigo2', 'parentescoTestigo2', 'telefonoTestigo2'
  ];

  let errors = {};

  // Verifica los campos obligatorios
  for (const field of requiredFields) {
    if (!data[field]) {
      errors[field] = `${field} es obligatorio.`;
    }
  }

  if (!data.nombresTestigo1 || !data.apellido_pTestigo1 || !data.parentescoTestigo1) {
    return false;
  }
  if (!data.nombresTestigo2 || !data.apellido_pTestigo2 || !data.parentescoTestigo2) {
    return false;
  }


  return true;
}

// Registrar nuevo cliente
router.post('/', async (req, res) => {
  try {
    const {
        nombres, apellido_p, apellido_m, curp, nss, rfc, telefono, email, 
        codigo_postal, ciudad, estado, semanas_cotizadas, semanas_descontadas, 
        id_asesor, id_afore, direccion, infonavit, observaciones, status, tipo_tramite, 
        fecha_ultimo_retiro, monto, fecha_ultima_baja, fecha_solucion, fecha_alta, fecha_baja, 
        fecha_fin_tramite, salario, empleo, forma_pago,
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

    // Insertar en tabla Clientes
    const newCliente = await pool.query(
        `INSERT INTO Clientes (
            id_persona, semanas_cotizadas, semanas_descontadas, id_asesor, id_afore, direccion, 
            infonavit, observaciones, fecha_registro, status, tipo_tramite, fecha_ultimo_retiro, 
            monto, fecha_ultima_baja, fecha_solucion, fecha_alta, fecha_baja, fecha_fin_tramite, 
            salario, empleo, forma_pago
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, NOW(), $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
        ) RETURNING id_cliente`,
        [
            id_persona, semanas_cotizadas, semanas_descontadas, id_asesor, id_afore, direccion, 
            infonavit || null, observaciones || null, status, tipo_tramite, 
            fecha_ultimo_retiro || null, monto || null, fecha_ultima_baja || null, 
            fecha_solucion || null, fecha_alta || null, fecha_baja || null, 
            fecha_fin_tramite || null, salario || null, empleo || null, forma_pago || null
        ]
    );

    const id_cliente = newCliente.rows[0].id_cliente;

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

    res.json({ msg: 'Asesor registrado correctamente', id_cliente: newCliente.rows[0].id_cliente,
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
