const express = require('express');
const router = express.Router();
const pool = require('../db');
const verifyToken = require('./middleware/verifyToken');

// Endpoint para obtener datos según la consulta
// router.get('/pendientes', async (req, res) => {
router.get('/pendientes', verifyToken, async (req, res) => {
  const userId = req.user.id_usuario; // ID del usuario autenticado
  const userType = req.user.tipo; // Tipo de usuario autenticado

  try {
    const values = [];
    let conditions = '';

    // Filtrar por el ID del usuario si no es tipo 3 (administrador)
    if (userType !== 3) {
      values.push(userId);
      conditions = ` AND (c.id_asesor = $${values.length} OR u.jefe = $${values.length})`;
    }

    const query = `
      WITH honorarios_cte AS (
        SELECT monto AS honorario FROM honorarios
      ),
      clientes_aseguramiento AS (
        SELECT 
          id_cliente,
          CASE
            WHEN monto >= 25000 THEN 2000
            WHEN monto >= 15000 AND monto < 25000 THEN 1700
            WHEN monto < 15000 THEN 1500
          END AS aseguramiento
        FROM clientes
        WHERE status = 'Liquidado'
      )
      SELECT 
        p.nombres || ' ' || p.apellido_p || ' ' || p.apellido_m AS nombre,
        c.monto AS monto,
        h.honorario*100 AS porcentaje,
        ROUND(ca.aseguramiento::numeric, 3) AS aseguramiento,
        ROUND((h.honorario * c.monto::numeric + ca.aseguramiento::numeric), 3) AS cobroCliente,
        ROUND(((h.honorario * c.monto::numeric + ca.aseguramiento::numeric) - ca.aseguramiento::numeric), 3) AS Servicios,
        ROUND((c.monto::numeric * 0.0614), 3) AS Asesor,
        ROUND(((h.honorario * c.monto::numeric + ca.aseguramiento::numeric) - (c.monto::numeric * 0.0614)), 3) AS total
      FROM 
        public.clientes c
      INNER JOIN 
        public.personas p ON c.id_persona = p.id_persona
      INNER JOIN 
        honorarios_cte h ON true
      INNER JOIN 
        clientes_aseguramiento ca ON c.id_cliente = ca.id_cliente
      INNER JOIN Usuarios u ON u.id_usuario = c.id_asesor
      WHERE DATE_PART('year', c.fecha_registro) = DATE_PART('year', CURRENT_DATE)
      ${conditions}
      ORDER BY 
        c.id_cliente;
    `;
    
    
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      return res.status(404).send('No se encontraron resultados');
    }

    res.json(result.rows);
  } catch (err) {
    console.error('Error ejecutando la consulta:', err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
