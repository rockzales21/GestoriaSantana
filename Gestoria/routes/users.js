// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const pool = require('../db'); // Conexión a tu base de datos
// const router = express.Router();

// // Clave secreta para JWT (puedes almacenarla en un archivo .env)
// const JWT_SECRET = 'secret_key';

// // Ruta de registro
// router.post('/register', async (req, res) => {
//     const { username, email, password } = req.body;

//     try {
//         // Verificar si el usuario ya existe
//         const userExist = await pool.query(
//             'SELECT * FROM users WHERE email = $1',
//             [email]
//         );

//         if (userExist.rows.length > 0) {
//             return res.status(400).json({ message: 'El usuario ya existe' });
//         }

//         // Encriptar la contraseña
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Insertar nuevo usuario
//         const newUser = await pool.query(
//             'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
//             [username, email, hashedPassword]
//         );

//         res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser.rows[0] });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Ruta de login
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Buscar al usuario
//         const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

//         if (user.rows.length === 0) {
//             return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
//         }

//         // Verificar contraseña
//         const validPassword = await bcrypt.compare(password, user.rows[0].password);
//         if (!validPassword) {
//             return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
//         }

//         // Crear token JWT
//         const token = jwt.sign({ id: user.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });

//         res.json({ message: 'Inicio de sesión exitoso', token });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// module.exports = router;

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // Conexión a la base de datos
const router = express.Router();

// Clave secreta para JWT (guárdala en .env en producción)
const JWT_SECRET = 'secret_key';

// Ruta de registro
router.post('/register', async (req, res) => {
    const { username, password, id_usuario } = req.body; // Se agrega id_usuario

    try {
        // Verificar si el usuario ya existe
        const userExist = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (userExist.rows.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Verificar si el id_usuario existe en la tabla usuarios
        const usuarioExist = await pool.query(
            'SELECT * FROM usuarios WHERE id_usuario = $1',
            [id_usuario]
        );

        if (usuarioExist.rows.length === 0) {
            return res.status(400).json({ message: 'El id_usuario no existe' });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insertar nuevo usuario en users
        const newUser = await pool.query(
            'INSERT INTO users (username, password, id_usuario) VALUES ($1, $2, $3) RETURNING *',
            [username, hashedPassword, id_usuario]
        );

        res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta de login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar al usuario
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // Verificar contraseña
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // Crear token JWT con el id_usuario
        const token = jwt.sign(
            { id: user.rows[0].id, id_usuario: user.rows[0].id_usuario },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
