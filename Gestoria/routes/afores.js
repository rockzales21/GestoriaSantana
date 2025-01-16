const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('../db');

const router = express.Router();

// Configuración de multer para almacenar imágenes en la carpeta 'afores'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = path.join(__dirname, '../afores');
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath); // Crear carpeta si no existe
    }
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    // Nombre temporal para multer; se actualizará después de obtener el ID del registro
    cb(null, `temp-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Obtener todos los afores
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM afores ORDER BY nombre');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener los afores:', err.message);
    res.status(500).send('Error del servidor');
  }
});

router.get('/afores', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id_afore, nombre FROM Afores
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Obtener un Afore por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM afores WHERE id_afore = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Afore no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener el afore:', err.message);
    res.status(500).send('Error del servidor');
  }
});


// Crear un nuevo afore con imagen
router.post('/', upload.single('imagen'), async (req, res) => {
  const { nombre, link, telefono } = req.body;

  try {
    // Insertar el nuevo registro
    const result = await pool.query(
      'INSERT INTO afores (nombre, link, telefono) VALUES ($1, $2, $3) RETURNING id_afore',
      [nombre, link, telefono]
    );

    const idAfore = result.rows[0].id_afore;

    // Si hay una imagen, renombrarla con el ID del registro
    if (req.file) {
      const nuevoNombre = `${idAfore}.png`;
      const nuevaRuta = path.join(__dirname, '../imagenes/afores', nuevoNombre);

      fs.renameSync(req.file.path, nuevaRuta); // Renombrar la imagen cargada
    }

    res.json({ message: 'Afore creado exitosamente', id_afore: idAfore });
  } catch (err) {
    console.error('Error al crear el afore:', err.message);
    res.status(500).send('Error del servidor');
  }
});

// Actualizar un afore con imagen
router.put('/:id', upload.single('imagen'), async (req, res) => {
  const { id } = req.params;
  const { nombre, link, telefono } = req.body;

  try {
    // Actualizar el registro del Afore
    const result = await pool.query(
      'UPDATE afores SET nombre = $1, link = $2, telefono = $3 WHERE id_afore = $4 RETURNING *',
      [nombre, link, telefono, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Afore no encontrado' });
    }

    // Si hay una imagen nueva, procesarla
    if (req.file) {
      const nuevoNombre = `${id}-${req.file.originalname}`;
      const nuevaRuta = path.join(__dirname, '../afores', nuevoNombre);

      // Eliminar imagen previa si existe
      const carpeta = path.join(__dirname, '../afores');
      fs.readdirSync(carpeta).forEach((file) => {
        if (file.startsWith(`${id}-`)) {
          fs.unlinkSync(path.join(carpeta, file));
        }
      });

      // Renombrar la nueva imagen cargada
      fs.renameSync(req.file.path, nuevaRuta);
    }

    res.json({ message: 'Afore actualizado exitosamente', afore: result.rows[0] });
  } catch (err) {
    console.error('Error al actualizar el afore:', err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
