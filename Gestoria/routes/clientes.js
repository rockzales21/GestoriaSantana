const express = require('express');
const router = express.Router();
const pool = require('../db');
const verifyToken = require('./middleware/verifyToken');

router.get('/cliente/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT 
        nombres || ' ' || apellido_p || ' ' || apellido_m AS nombre, 
        nss, curp, c.direccion || ', ' || ciudad || ', ' || estado AS direccion_completa, codigo_postal
        , c.monto, 
		    s.direccion || s.tel_oficina AS direccion_sucursal
      FROM public.Personas p
      INNER JOIN public.clientes c ON p.id_persona = c.id_persona
      INNER JOIN public.usuarios u ON u.id_usuario = c.id_asesor
	    INNER JOIN public.sucursales s ON s.encargado = u.jefe
      WHERE c.id_cliente = $1
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    console.log(result.rows[0]);

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener el cliente:', err.message);
    res.status(500).send('Error del servidor');
  }
});


router.get('/detalle/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT p.id_persona, 
             p.nombres || ' ' || p.apellido_p || ' ' || p.apellido_m AS nombre, 
             fecha_alta,
             monto,
             p.curp,
             p.nss,
             p.email,
             p.rfc,
             semanas_cotizadas,
             semanas_descontadas,
             fecha_baja,
             c.direccion || ', ' || p.ciudad || ', ' || p.estado || ', CP: ' || p.codigo_postal AS direccionCompleta,
             p.telefono,
             c.status,
             s.oficina AS ZONA,
             pu.nombres || ' ' || pu.apellido_p || ' ' || pu.apellido_m AS ACTUALIZO,
             fecha_solucion,
             observaciones,
             fecha_baja
      FROM public.Personas p
      INNER JOIN public.clientes c ON p.id_persona = c.id_persona
      INNER JOIN public.usuarios u ON u.id_usuario = c.id_asesor
      INNER JOIN public.Personas pu ON pu.id_persona = u.id_persona
      INNER JOIN public.sucursales s ON s.encargado = u.jefe
      WHERE c.id_cliente = $1
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener el detalle del cliente:', err.message);
    res.status(500).send('Error del servidor');
  }
});


router.get('/clientes', verifyToken, async (req, res) => {
  const { status, semana, año, mes, asesor } = req.query;
  const userId = req.user.id_usuario; // Asumiendo que el middleware de autenticación agrega el ID del usuario a req.user
  const userType = req.user.tipo; // Asumiendo que el middleware de autenticación agrega el tipo de usuario a req.user

  let query = `
  SELECT p.id_persona, c.id_cliente, 
    p.nombres || ' ' || p.apellido_p || ' ' || p.apellido_m AS nombre, 
    p.curp, p.nss, c.monto, c.id_afore, a.nombre AS nombreAfore, c.fecha_registro, 
    c.semanas_cotizadas, c.id_asesor, c.fecha_ultimo_retiro, 
    c.semanas_descontadas, c.status,
    pAsesor.nombres || ' ' || pAsesor.apellido_p || ' ' || pAsesor.apellido_m AS nombreAsesor,
    c.tipo_tramite
    FROM Personas p 
    INNER JOIN Clientes c ON p.id_persona = c.id_persona
    INNER JOIN Usuarios u ON u.id_usuario = c.id_asesor
    INNER JOIN Personas pAsesor ON pAsesor.id_persona = u.id_persona 
    INNER JOIN Afores a ON a.id_afore = c.id_afore
  `;

  const conditions = [];
  const values = [];


  // Filtrar por el ID del usuario si no es tipo 3 (administrador)
  if (userType !== 3) {
    values.push(userId);
    conditions.push(`c.id_asesor = $${values.length} OR u.jefe = $${values.length}`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`;
  }

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

router.put('/cliente/:id/status', async (req, res) => {
  const { id } = req.params;
  const { nuevoStatus } = req.body;

  try {
    // Actualizar el estado del cliente
    const updateQuery = `UPDATE clientes SET status = $1 WHERE id_cliente = $2`;
    await pool.query(updateQuery, [nuevoStatus, id]);

    res.json({ message: 'Estado actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar el estado del cliente:', err.message);
    res.status(500).send('Error del servidor');
  }
});

router.put('/cliente/:id/fecha_baja', async (req, res) => {
  const { id } = req.params;
  const { fecha_baja } = req.body;

  try {
    // Actualizar el campo fecha_baja del cliente
    const updateQuery = `UPDATE clientes SET fecha_baja = $1 WHERE id_cliente = $2`;
    await pool.query(updateQuery, [fecha_baja, id]);

    res.json({ message: 'Fecha de baja actualizada correctamente' });
  } catch (err) {
    console.error('Error al actualizar la fecha de baja del cliente:', err.message);
    res.status(500).send('Error del servidor');
  }
});

router.get('/cliente/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT 
        nombres || ' ' || apellido_p || ' ' || apellido_m AS nombre, 
        nss, curp, c.direccion || ', ' || ciudad || ', ' || estado AS direccion_completa, codigo_postal
        , c.monto, 
		    s.direccion || s.tel_oficina AS direccion_sucursal
      FROM public.Personas p
      INNER JOIN public.clientes c ON p.id_persona = c.id_persona
      INNER JOIN public.usuarios u ON u.id_usuario = c.id_asesor
	    INNER JOIN public.sucursales s ON s.encargado = u.jefe
      WHERE c.id_cliente = $1
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    console.log(result.rows[0]);

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener el cliente:', err.message);
    res.status(500).send('Error del servidor');
  }
});

router.get('/clienteInfoActualizacion/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT p.nombres, p.apellido_p, p.apellido_m, p.curp, p.nss, p.rfc, p.telefono, p.email, p.codigo_postal, p.ciudad, p.estado,
      c.id_persona, c.semanas_cotizadas, c.semanas_descontadas, c.id_asesor, c.id_afore, c.direccion, 
      c.infonavit, c.observaciones, c.fecha_registro, c.status, c.tipo_tramite, c.fecha_ultimo_retiro, 
      c.monto, c.fecha_ultima_baja, c.fecha_solucion, c.fecha_alta, c.fecha_baja, c.fecha_fin_tramite, 
		  c.salario, c.empleo, c.forma_pago
      FROM Personas p
      INNER JOIN Clientes c ON c.id_persona = p.id_persona
      WHERE c.id_cliente = $1
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    console.log(result.rows[0]);

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener el cliente:', err.message);
    res.status(500).send('Error del servidor');
  }
});



// Función auxiliar para validar datos
function validateData(data) {
  const requiredFields = ['nombres', 'apellido_p', 'apellido_m', 'curp', 'nss', 'rfc', 'telefono', 
  'codigo_postal', 'ciudad', 'estado',
  'semanas_cotizadas', 'semanas_descontadas', 'id_afore', 'direccion', 'tipo_tramite',
  'id_asesor'
  ];

  let errors = {};

  // Verifica los campos obligatorios
  for (const field of requiredFields) {
    if (!data[field]) {
      errors[field] = `${field} es obligatorio.`;
    }
  }


  return true;
}

// Actualizar cliente existente
router.put('/cliente/:id', async (req, res) => {
  const client = await pool.connect();
  const { id } = req.params;
  try {
    const {
      nombres, apellido_p, apellido_m, curp, nss, rfc, telefono, email, 
      codigo_postal, ciudad, estado, semanas_cotizadas, semanas_descontadas, 
      id_asesor, id_afore, direccion, infonavit, observaciones, tipo_tramite, 
      fecha_ultimo_retiro, monto, fecha_ultima_baja, fecha_solucion, fecha_alta,
      fecha_fin_tramite, salario, empleo, forma_pago, fecha_registro
    } = req.body;

    // Validación de datos
    if (!validateData(req.body)) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    await client.query('BEGIN');

    // Actualizar en tabla Personas
    try {
      await client.query(
        `UPDATE Personas SET nombres = $1, apellido_p = $2, apellido_m = $3, curp = $4, nss = $5, rfc = $6, telefono = $7, email = $8, codigo_postal = $9, ciudad = $10, estado = $11 WHERE id_persona = (SELECT id_persona FROM Clientes WHERE id_cliente = $12)`,
        [nombres, apellido_p, apellido_m, curp, nss, rfc, telefono, email || null, codigo_postal, ciudad, estado, id]
      );
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('Error al actualizar en Personas:', err.message);
      return res.status(500).json({ error: 'Error al actualizar en Personas: ' + err.message });
    }

    // Actualizar en tabla Clientes
    try {
      await client.query(
        `UPDATE Clientes SET 
          semanas_cotizadas = $1, semanas_descontadas = $2, id_asesor = $3, id_afore = $4, 
          direccion = $5, infonavit = $6, observaciones = $7, tipo_tramite = $8, 
          fecha_ultimo_retiro = $9, monto = $10, fecha_ultima_baja = $11, fecha_solucion = $12, 
          fecha_alta = $13, fecha_fin_tramite = $14, salario = $15, empleo = $16, 
          forma_pago = $17, fecha_registro = $18 WHERE id_cliente = $19`,
        [semanas_cotizadas, semanas_descontadas, id_asesor, id_afore, direccion, infonavit || null, observaciones || null, tipo_tramite, fecha_ultimo_retiro || null, monto || null, fecha_ultima_baja || null, fecha_solucion || null, fecha_alta || null, fecha_fin_tramite || null, salario || null, empleo || null, forma_pago || null, fecha_registro || null, id]
      );
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('Error al actualizar en Clientes:', err.message);
      return res.status(500).json({ error: 'Error al actualizar en Clientes: ' + err.message });
    }

    await client.query('COMMIT');

    res.json({ msg: 'Cliente actualizado correctamente' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error general:', err.message);
    res.status(500).json({ error: 'Error general: ' + err.message });
  } finally {
    client.release();
  }
});


module.exports = router;
