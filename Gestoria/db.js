// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'admin',
//   host: 'localhost',
//   database: 'gestoria',
//   password: 'root',
//   port: 5432, // Este es el puerto predeterminado de PostgreSQL
// });

// module.exports = pool;



const { Pool } = require('pg');
require('dotenv').config(); // Cargar las variables del archivo .env

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Necesario para Railway
});

module.exports = pool;
