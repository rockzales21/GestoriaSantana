import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentIdUsuario, setCurrentIdUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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
    navigate(`/asesores/editar/${id}`);
  };

  const openModal = (id_usuario) => {
    setCurrentIdUsuario(id_usuario);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setUsername('');
    setPassword('');
  };

  const handleCreateUser = async () => {
    if (username && password) {
      try {
        const response = await fetch('https://gestoriasantana-production.up.railway.app/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password, id_usuario: currentIdUsuario }),
        });

        if (response.ok) {
          toast.success('Usuario creado con éxito', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: 'bg-green-500 text-white',
          });
          closeModal();
        } else {
          const errorData = await response.json();
          toast.error(`Error: ${errorData.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: 'bg-red-500 text-white',
          });
        }
      } catch (error) {
        console.error('Error al crear el usuario:', error);
        toast.error('Error al crear el usuario', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: 'bg-red-500 text-white',
        });
      }
    } else {
      toast.warn('Nombre de usuario y contraseña son requeridos', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'bg-yellow-500 text-white',
      });
    }
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
                      sx={buttonStyles}
                      onClick={() => navigate(`/asesores/contrato/${asesor.id_usuario}`)}
                    >
                      Contrato
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<EditIcon />}
                      sx={buttonStyles}
                      onClick={() => handleEdit(asesor.id_usuario)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={buttonStyles}
                      onClick={() => openModal(asesor.id_usuario)}
                    >
                      Crear Usuario
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
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Crear Usuario"
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl mb-4">Crear Usuario</h2>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <div className="flex justify-end">
            <Button
              variant="contained"
              color="secondary"
              onClick={closeModal}
              className="mr-2"
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateUser}
            >
              Crear
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Asesores;
// import React, { useState, useEffect } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Button, Box } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DescriptionIcon from '@mui/icons-material/Description';
// import { useNavigate } from 'react-router-dom';
// import Contrato from './Contrato'; // Ajusta la ruta según sea necesario


// const commonStyles = {
//   bgcolor: 'background.paper',
//   m: 1,
//   border: "none", // Elimina los bordes
//   width: 'auto',
//   height: 'auto',
//   boxShadow: "none", // Elimina las sombras
// };

// const buttonStyles = {
//   minWidth: '100px',  // Establece un ancho mínimo para todos los botones
//   marginRight: '8px', // Añade un margen entre los botones
// };

// const Asesores = () => {
//   const [asesores, setAsesores] = useState([]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     //https://gestoriasantana-production.up.railway.app/
//     // fetch('http://localhost:5000/usuarios')
//     fetch('https://gestoriasantana-production.up.railway.app/usuarios')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Error al obtener los asesores');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setAsesores(data);
//       })
//       .catch((error) => {
//         console.error('Error al obtener los asesores:', error);
//       });
//   }, []);


//   const handleEdit = (id) => {
//     // Navega a la ruta de edición con el ID del asesor
//     navigate(`/asesores/editar/${id}`);
//   };
  

//   return (
//     <div style={{ padding: '20px' }}>
//       <Typography variant="h4" gutterBottom>
//         Asesores
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableBody>
//             {asesores.map((asesor) => (
//               <React.Fragment key={asesor.id_usuario}>
//                 <TableRow>
//                   <TableCell sx={{ ...commonStyles }}>Asesor:</TableCell>
//                   <TableCell sx={{ ...commonStyles }}>{asesor.nombres}</TableCell>
//                   <TableCell sx={{ ...commonStyles }}>CURP:</TableCell>
//                   <TableCell sx={{ ...commonStyles }}>{asesor.curp}</TableCell>
//                   <TableCell sx={{ ...commonStyles }}>NSS:</TableCell>
//                   <TableCell sx={{ ...commonStyles }}>{asesor.nss}</TableCell>
//                   <TableCell sx={{ ...commonStyles }}>
//                   <Button
//   variant="contained"
//   color="primary"
//   startIcon={<DescriptionIcon />}
//   sx={buttonStyles}
//   onClick={() => navigate(`/asesores/contrato/${asesor.id_usuario}`)}
// >
//   Contrato
// </Button>


//                   </TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>Teléfono:</TableCell>
//                   <TableCell>{asesor.telefono}</TableCell>
//                   <TableCell>Email:</TableCell>
//                   <TableCell>{asesor.email}</TableCell>
//                   <TableCell>Status:</TableCell>
//                   <TableCell>{asesor.status === 1 ? 'Activo' : 'Inactivo'}</TableCell>
//                   <TableCell>
//                     <Box display="flex" justifyContent="space-between">
//                     <Button
//       variant="contained"
//       color="secondary"
//       startIcon={<EditIcon />}
//       sx={buttonStyles}
//       onClick={() => handleEdit(asesor.id_usuario)}  // Aquí pasas el ID del asesor
//     >
//                         Editar
//                       </Button>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               </React.Fragment>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default Asesores;
