// const express = require('express');
// const router = express.Router();

// router.get('/', (req, res) => {
//   res.send('¡Hola Mundo desde la ruta!');
// });

// module.exports = router;

// const express = require('express');
// // const pool = require('../db');
// const pool = require('../db');
// const app = express();

// router.get('/', (req, res) => {
//   res.send('¡Hola Mundo desde la ruta!');
// });

// app.get('/test-db', async (req, res) => {
//     try {
//         const result = await pool.query('SELECT NOW()');
//         res.json({ success: true, timestamp: result.rows[0] });
//     } catch (err) {
//         console.error('Error en la conexión:', err.message);
//         res.status(500).json({ success: false, error: err.message });
//     }
// });

// app.listen(3000, () => {
//     console.log('Servidor ejecutándose en http://localhost:3000');
// });



const express = require('express');
const pool = require('../db'); // Asegúrate de que el archivo esté en esta ubicación
const router = express.Router();

router.get('/', (req, res) => {
    res.send('¡Hola Mundo desde la ruta!');
});

router.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ success: true, timestamp: result.rows[0] });
    } catch (err) {
        console.error('Error en la conexión:', err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
