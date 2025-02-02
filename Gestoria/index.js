const express = require('express');
const path = require('path');
const app = express();
// const port = 5000;
const port = process.env.PORT || 3000;
// Importar rutas
const indexRoutes = require('./routes/index');
const pool = require('./db');

const cors = require('cors');



// Importar otras rutas
const aforesRuta = require('./routes/afores');
const clientesRuta = require('./routes/clientes');
const fechasTramitesRuta = require('./routes/fechasTramites');
const inventarioRuta = require('./routes/inventario');
const personasRuta = require('./routes/personas');
const sucursalesRuta = require('./routes/sucursales');
const testigosRuta = require('./routes/testigos');
const usuariosRuta = require('./routes/usuarios');
const registrarAsesorRuta = require('./routes/registrarAsesor');
const honorariosRuta = require('./routes/honorarios');
const registrarClienteRuta = require('./routes/registrarCliente');
const liquidacionesRuta = require('./routes/liquidaciones');
const usersRuta = require('./routes/users'); // Importa la ruta
const schedule = require('./jobs/scheduler');

// Verificar conexión a la base de datos
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error al conectarse a la base de datos:', err);
  } else {
    console.log('Conexión exitosa:', res.rows);
  }
});



// Usar CORS antes de las rutas
// app.use(cors());
app.use(cors({
  origin: 'https://gestoria-santana.vercel.app'
}));

// Usar middleware para parsear JSON
app.use(express.json());

// Usar las rutas
app.use('/', indexRoutes);
app.use('/imagenes/afores', express.static(path.join(__dirname, 'afores'))); // Servir imágenes
app.use('/afores', aforesRuta);
app.use('/clientes', clientesRuta);
app.use('/fechasTramites', fechasTramitesRuta);
app.use('/inventario', inventarioRuta);
app.use('/personas', personasRuta);
app.use('/sucursales', sucursalesRuta);
app.use('/testigos', testigosRuta);
app.use('/usuarios', usuariosRuta);
app.use('/registrarAsesor', registrarAsesorRuta);
app.use('/honorarios', honorariosRuta);
app.use('/imagenes/afores', express.static(path.join(__dirname, 'imagenes/afores')));
app.use('/registrarCliente', registrarClienteRuta);
app.use('/liquidaciones', liquidacionesRuta);
app.use('/users', usersRuta); // Usa la ruta con el prefijo '/users'

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
