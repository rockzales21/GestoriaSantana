// const jwt = require('jsonwebtoken');

// // Clave secreta (mismo valor que en las rutas de usuario)
// const JWT_SECRET = 'secret_key';

// function verifyToken(req, res, next) {
//     const token = req.header('Authorization')?.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ message: 'Acceso denegado' });
//     }

//     try {
//         const verified = jwt.verify(token, JWT_SECRET);
//         req.user = verified; // Agregar el usuario al objeto `req`
//         next(); // Continuar con la siguiente función
//     } catch (error) {
//         res.status(400).json({ message: 'Token no válido' });
//     }
// }

// module.exports = verifyToken;



const jwt = require('jsonwebtoken');

// Clave secreta (mismo valor que en las rutas de usuario)
const JWT_SECRET = 'secret_key';

function verifyToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado' });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified; // Agregar el usuario al objeto `req`
        next(); // Continuar con la siguiente función
    } catch (error) {
        res.status(400).json({ message: 'Token no válido' });
    }
}

module.exports = verifyToken;