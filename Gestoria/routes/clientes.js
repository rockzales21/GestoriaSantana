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
             observaciones
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


// router.get('/clientes', async (req, res) => {
//   const { status, semana, año, mes, asesor } = req.query;

//   let query = `
//     SELECT p.id_persona, c.id_cliente, 
//     p.nombres || ' ' || p.apellido_p || ' ' || p.apellido_m AS nombre, 
//     p.curp, p.nss, c.monto, id_afore, c.fecha_registro, 
//     c.semanas_cotizadas, c.id_asesor, c.fecha_ultimo_retiro, 
//     c.semanas_descontadas, c.status ,
//     pAsesor.nombres || ' ' || pAsesor.apellido_p || ' ' || pAsesor.apellido_m AS nombreAsesor
//     FROM Personas p 
//     INNER JOIN Clientes c ON p.id_persona = c.id_persona
//     INNER JOIN Usuarios u ON u.id_usuario = c.id_asesor
//     INNER JOIN Personas pAsesor ON pAsesor.id_persona = u.id_persona 
//   `;

//   const conditions = [];
//   const values = [];

//   if (status) {
//     values.push(status);
//     conditions.push(`status = $${values.length}`);
//   }
//   if (semana && año) {
//     values.push(semana, año);
//     conditions.push(`EXTRACT(WEEK FROM fecha_registro) = $${values.length - 1} AND EXTRACT(YEAR FROM fecha_registro) = $${values.length}`);
//   }
//   if (mes && año) {
//     values.push(mes, año);
//     conditions.push(`EXTRACT(MONTH FROM fecha_registro) = $${values.length - 1} AND EXTRACT(YEAR FROM fecha_registro) = $${values.length}`);
//   }
//   if (asesor) {
//     values.push(asesor);
//     conditions.push(`id_asesor = $${values.length}`);
//   }

//   if (conditions.length > 0) {
//     query += ` WHERE ${conditions.join(' AND ')}`;
//   }

//   try {
//     const result = await pool.query(query, values);
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Error del servidor');
//   }
// });
router.get('/clientes', verifyToken, async (req, res) => {
  const { status, semana, año, mes, asesor } = req.query;
  const userId = req.user.id_usuario; // Asumiendo que el middleware de autenticación agrega el ID del usuario a req.user
  const userType = req.user.tipo; // Asumiendo que el middleware de autenticación agrega el tipo de usuario a req.user

  let query = `
    SELECT p.id_persona, c.id_cliente, 
    p.nombres || ' ' || p.apellido_p || ' ' || p.apellido_m AS nombre, 
    p.curp, p.nss, c.monto, id_afore, c.fecha_registro, 
    c.semanas_cotizadas, c.id_asesor, c.fecha_ultimo_retiro, 
    c.semanas_descontadas, c.status,
    pAsesor.nombres || ' ' || pAsesor.apellido_p || ' ' || pAsesor.apellido_m AS nombreAsesor
    FROM Personas p 
    INNER JOIN Clientes c ON p.id_persona = c.id_persona
    INNER JOIN Usuarios u ON u.id_usuario = c.id_asesor
    INNER JOIN Personas pAsesor ON pAsesor.id_persona = u.id_persona 
  `;

  const conditions = [];
  const values = [];

  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }
  if (semana && año) {
    values.push(semana, año);
    conditions.push(`EXTRACT(WEEK FROM fecha_registro) = $${values.length - 1} AND EXTRACT(YEAR FROM fecha_registro) = $${values.length}`);
  }
  if (mes && año) {
    values.push(mes, año);
    conditions.push(`EXTRACT(MONTH FROM fecha_registro) = $${values.length - 1} AND EXTRACT(YEAR FROM fecha_registro) = $${values.length}`);
  }
  if (asesor) {
    values.push(asesor);
    conditions.push(`id_asesor = $${values.length}`);
  }

  // Filtrar por el ID del usuario si no es tipo 3 (administrador)
  if (userType !== 3) {
    values.push(userId);
    conditions.push(`c.id_asesor = $${values.length}`);
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

module.exports = router;
