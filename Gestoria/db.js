const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'gestoria',
  password: 'root',
  port: 5432, // Este es el puerto predeterminado de PostgreSQL
});

module.exports = pool;

