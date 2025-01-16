const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM fechas_tramites');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Obtener todas las semanas del año actual
router.get('/semanas', async (req, res) => {
  const getNumberOfWeeks = (year) => {
    const lastDay = new Date(year, 11, 31);
    const dayOfWeek = lastDay.getDay();
    return dayOfWeek === 4 || (year % 4 === 0 && dayOfWeek === 3) ? 53 : 52;
  };

  try {
    const year = new Date().getFullYear();
    const numWeeks = getNumberOfWeeks(year);
    const semanas = [];

    for (let i = 1; i <= numWeeks; i++) {
      semanas.push({ numero_semana: i, fecha_tramite: null, observaciones: null });
    }

    const registros = await pool.query(
      'SELECT numero_semana, fecha_tramite, observaciones FROM fechas_tramites WHERE EXTRACT(YEAR FROM fecha_tramite) = $1',
      [year]
    );

    registros.rows.forEach((registro) => {
      const index = semanas.findIndex((s) => s.numero_semana === registro.numero_semana);
      if (index !== -1) {
        semanas[index].fecha_tramite = registro.fecha_tramite;
        semanas[index].observaciones = registro.observaciones;
      }
    });

    res.json(semanas);
  } catch (error) {
    console.error('Error al obtener las semanas:', error.message);
    res.status(500).send('Error al obtener las semanas.');
  }
});

// Actualizar/insertar semana
router.post('/semanas', async (req, res) => {
  const { numero_semana, fecha_tramite, observaciones } = req.body;

  try {
      // Verificamos si ya existe un registro para esa semana en el año actual
      const existingSemana = await pool.query(`
          SELECT * FROM fechas_tramites 
          WHERE numero_semana = $1 AND EXTRACT(year FROM fecha_tramite) = EXTRACT(year FROM CURRENT_DATE)
      `, [numero_semana]);

      if (existingSemana.rows.length > 0) {
          // Si ya existe un registro, actualizamos
          await pool.query(`
              UPDATE fechas_tramites
              SET fecha_tramite = $1, observaciones = $2
              WHERE numero_semana = $3 AND EXTRACT(year FROM fecha_tramite) = EXTRACT(year FROM CURRENT_DATE)
          `, [fecha_tramite, observaciones, numero_semana]);

          res.json({ message: 'Semana actualizada correctamente.' });
      } else {
          // Si no existe, hacemos una inserción
          await pool.query(`
              INSERT INTO fechas_tramites (numero_semana, fecha_tramite, observaciones)
              VALUES ($1, $2, $3)
          `, [numero_semana, fecha_tramite, observaciones]);

          res.json({ message: 'Semana guardada correctamente.' });
      }
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Error del servidor');
  }
});


// router.post('/semanas', async (req, res) => {
//   try {
//     const { numero_semana, fecha_tramite, observaciones } = req.body;

//     if (!numero_semana || numero_semana < 1 || numero_semana > 53) {
//       return res.status(400).send('Número de semana inválido.');
//     }

//     if (fecha_tramite && isNaN(new Date(fecha_tramite).getTime())) {
//       return res.status(400).send('Fecha de trámite inválida.');
//     }

//     await pool.query(
//       `INSERT INTO fechas_tramites (numero_semana, fecha_tramite, observaciones)
//        VALUES ($1, $2, $3)`,
//       [numero_semana, fecha_tramite, observaciones]
//     );

//     res.status(200).send('Semana actualizada correctamente.');
//   } catch (error) {
//     console.error('Error al actualizar la semana:', error.message);
//     res.status(500).send('Error al actualizar la semana.');
//   }
// });

module.exports = router;
