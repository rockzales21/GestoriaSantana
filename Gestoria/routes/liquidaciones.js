const express = require('express');
const router = express.Router();
const pool = require('../db');

// Endpoint para obtener datos según la consulta
router.get('/pendientes', async (req, res) => {
  try {


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
        WHERE status = 'En tramite'
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
      ORDER BY 
        c.id_cliente;
    `;
    /*const query = `
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
        WHERE status = 'En tramite'
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
      WHERE 
        c.status = 'En tramite'
      ORDER BY 
        c.id_cliente;
    `;*/
    
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('Error ejecutando la consulta:', err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
