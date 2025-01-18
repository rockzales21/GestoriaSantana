import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import { useNavigate } from 'react-router-dom';

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  border: "none", // Elimina los bordes
  width: 'auto',
  height: 'auto',
  boxShadow: "none", // Elimina las sombras
};

const buttonStyles = {
  minWidth: '100px',  // Establece un ancho mínimo para todos los botones
  marginRight: '8px', // Añade un margen entre los botones
};

const Asesores = () => {
  const [asesores, setAsesores] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    //https://gestoriasantana-production.up.railway.app/
    // fetch('http://localhost:5000/usuarios')
    fetch('https://gestoriasantana-production.up.railway.app/usuarios')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los asesores');
        }
        return response.json();
      })
      .then((data) => {
        setAsesores(data);
      })
      .catch((error) => {
        console.error('Error al obtener los asesores:', error);
      });
  }, []);


  const handleEdit = (id) => {
    // Navega a la ruta de edición con el ID del asesor
    navigate(`/asesores/editar/${id}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Asesores
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {asesores.map((asesor) => (
              <React.Fragment key={asesor.id_usuario}>
                <TableRow>
                  <TableCell sx={{ ...commonStyles }}>Asesor:</TableCell>
                  <TableCell sx={{ ...commonStyles }}>{asesor.nombres}</TableCell>
                  <TableCell sx={{ ...commonStyles }}>CURP:</TableCell>
                  <TableCell sx={{ ...commonStyles }}>{asesor.curp}</TableCell>
                  <TableCell sx={{ ...commonStyles }}>NSS:</TableCell>
                  <TableCell sx={{ ...commonStyles }}>{asesor.nss}</TableCell>
                  <TableCell sx={{ ...commonStyles }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<DescriptionIcon />}
                      sx={buttonStyles}  // Aplica el estilo aquí para ajustar el tamaño
                      onClick={() => handleEdit(asesor.id_usuario)} // Pasa el ID al hacer clic
                    >
                      Contrato
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Teléfono:</TableCell>
                  <TableCell>{asesor.telefono}</TableCell>
                  <TableCell>Email:</TableCell>
                  <TableCell>{asesor.email}</TableCell>
                  <TableCell>Status:</TableCell>
                  <TableCell>{asesor.status === 1 ? 'Activo' : 'Inactivo'}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="space-between">
                    <Button
      variant="contained"
      color="secondary"
      startIcon={<EditIcon />}
      sx={buttonStyles}
      onClick={() => handleEdit(asesor.id_usuario)}  // Aquí pasas el ID del asesor
    >
                        Editar
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Asesores;
