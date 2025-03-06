const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // Conexión a la base de datos
const router = express.Router();
const verifyToken = require('./middleware/verifyToken');


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

        // // Actualizar el campo tipo en la tabla usuarios
        // await pool.query(
        //     'UPDATE usuarios SET tipo = 2 WHERE id_usuario = $1',
        //     [id_usuario]
        // );

        res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta de login
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         // Buscar al usuario
//         const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

//         if (user.rows.length === 0) {
//             return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
//         }

//         // Verificar contraseña
//         const validPassword = await bcrypt.compare(password, user.rows[0].password);
//         if (!validPassword) {
//             return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
//         }

//         // Crear token JWT con el id_usuario
//         const token = jwt.sign(
//             { id: user.rows[0].id, id_usuario: user.rows[0].id_usuario },
//             JWT_SECRET,
//             { expiresIn: '1h' }
//         );

//         res.json({ message: 'Inicio de sesión exitoso', token });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
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

        // Obtener el tipo de usuario
        const userType = await pool.query('SELECT tipo FROM usuarios WHERE id_usuario = $1', [user.rows[0].id_usuario]);

        // Crear token JWT con el id_usuario y tipo
        const token = jwt.sign(
            { id_usuario: user.rows[0].id_usuario, tipo: userType.rows[0].tipo },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener los datos del usuario en sesión
router.get('/profile', async (req, res) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado' });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        const userId = verified.id_usuario;

        const userProfile = await pool.query(`
            SELECT u.username, p.email, p.telefono, s.tel_oficina, s.oficina, us.tipo
            FROM public.users u
            INNER JOIN public.usuarios us ON u.id_usuario = us.id_usuario
            INNER JOIN public.personas p ON p.id_persona = us.id_persona 
            LEFT JOIN public.sucursales s ON s.encargado = us.id_usuario
            WHERE u.id_usuario = $1
        `, [userId]);

        if (userProfile.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(userProfile.rows[0]);
    } catch (error) {
        res.status(400).json({ message: 'Token no válido' });
    }
});

// Ruta para cambiar la contraseña del usuario
router.put('/change-password', verifyToken, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id; // Obtener el ID del usuario del token verificado
  
    try {
      const user = await pool.query('SELECT password FROM users WHERE id = $1', [userId]);
      if (user.rows.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Verificar la contraseña actual
      const validPassword = await bcrypt.compare(currentPassword, user.rows[0].password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Contraseña actual incorrecta' });
      }
  
      // Encriptar la nueva contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
  
      // Actualizar la contraseña en la base de datos
      await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedNewPassword, userId]);
  
      res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});


module.exports = router;
