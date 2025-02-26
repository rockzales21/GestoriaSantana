const express = require('express');
const router = express.Router();
const pool = require('../db');

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


router.get('/clientes', async (req, res) => {
  const { status, semana, año, mes, asesor } = req.query;

  let query = `
    SELECT p.id_persona, c.id_cliente, 
           nombres || ' ' || apellido_p || ' ' || apellido_m AS nombre, 
           curp, nss, monto, id_afore, fecha_registro, 
           semanas_cotizadas, id_asesor, fecha_ultimo_retiro, 
           semanas_descontadas, status 
    FROM Personas p 
    INNER JOIN Clientes c ON p.id_persona = c.id_persona
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


module.exports = router;
