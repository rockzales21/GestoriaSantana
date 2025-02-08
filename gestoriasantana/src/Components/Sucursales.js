import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sucursales = () => {
  const [sucursales, setSucursales] = useState([]);
  const [asesores, setAsesores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id_sucursal: null,
    oficina: '',
    encargado: '',
    tel_oficina: '',
    email: '',
    direccion: '',
    telefonoencargado: '',
  });

  // Obtener datos de sucursales
  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const response = await fetch('https://gestoriasantana-production.up.railway.app/sucursales');
        const data = await response.json();
        setSucursales(data);
      } catch (error) {
        toast.error('Error al cargar las sucursales');
      }
    };

    const fetchAsesores = async () => {
      try {
        const response = await fetch('https://gestoriasantana-production.up.railway.app/usuarios/encargados');
        const data = await response.json();
        setAsesores(data);
      } catch (error) {
        toast.error('Error al cargar los asesores');
      }
    };

    fetchSucursales();
    fetchAsesores();
  }, []);

  // Maneja cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Maneja el envío del formulario para agregar o editar
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const endpoint = isEditing
        ? `https://gestoriasantana-production.up.railway.app/sucursales/${formData.id_sucursal}`
        : 'https://gestoriasantana-production.up.railway.app/sucursales';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newSucursal = await response.json();
        if (isEditing) {
          setSucursales((prevSucursales) =>
            prevSucursales.map((sucursal) =>
              sucursal.id_sucursal === newSucursal.id_sucursal
                ? newSucursal
                : sucursal
            )
          );
          toast.success('Sucursal editada correctamente');
        } else {
          setSucursales((prevSucursales) => [...prevSucursales, newSucursal]);
          toast.success('Sucursal creada correctamente');
        }
        setIsModalOpen(false);
      } else {
        toast.error('Error al guardar la sucursal');
      }
    } catch (error) {
      toast.error('Error en el servidor');
    }
  };

  // Abrir el modal en modo agregar
  const openAddModal = () => {
    setIsEditing(false);
    setFormData({
      id_sucursal: null,
      oficina: '',
      encargado: '',
      tel_oficina: '',
      email: '',
      direccion: '',
      telefonoencargado: '',
    });
    setIsModalOpen(true);
  };

  // Abrir el modal en modo edición
  const openEditModal = (sucursal) => {
    setIsEditing(true);
    setFormData(sucursal);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-center" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-4">Sucursales</h1>

      <button
        onClick={openAddModal}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded flex items-center"
      >
        <FaPlus className="mr-2" /> Agregar Sucursal
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sucursales.map((sucursal) => (
          <div
            key={sucursal.id_sucursal}
            className="border rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {sucursal.oficina}
            </h2>
            <div className="text-gray-600 space-y-1">
              <p>
                <strong>Encargado:</strong> {sucursal.nombre}
              </p>
              <p>
                <strong>Dirección:</strong> {sucursal.direccion}
              </p>
              <p>
                <strong>Tel. Oficina:</strong> {sucursal.tel_oficina}
              </p>
              <p>
                <strong>Cel:</strong> {sucursal.telefonoencargado}
              </p>
              <p>
                <strong>Email:</strong> {sucursal.email}
              </p>
            </div>
            <button
              onClick={() => openEditModal(sucursal)}
              className="mt-4 w-full bg-yellow-500 text-white px-4 py-2 rounded-lg flex justify-center items-center hover:bg-yellow-600 transition-colors duration-200"
            >
              <FaEdit className="mr-2" /> Editar
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">
              {isEditing ? 'Editar Sucursal' : 'Agregar Sucursal'}
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="oficina"
                placeholder="Oficina"
                value={formData.oficina}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                required
              />
              <select
                name="encargado"
                value={formData.encargado}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                required
              >
                <option value="">Seleccione un encargado</option>
                {asesores.map((asesor) => (
                  <option key={asesor.id_usuario} value={asesor.id_usuario}>
                    {asesor.nombre}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="tel_oficina"
                placeholder="Tel. Oficina"
                value={formData.tel_oficina}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                required
              />
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                value={formData.direccion}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                required
              />
              <input
                type="text"
                name="telefonoencargado"
                placeholder="Celular"
                value={formData.telefonoencargado}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                required
              />
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-red-500 font-bold mr-4"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sucursales;
// import React, { useState, useEffect } from 'react';
// import { FaPlus, FaEdit } from 'react-icons/fa';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Sucursales = () => {
//   const [sucursales, setSucursales] = useState([]);
//   const [asesores, setAsesores] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     id_sucursal: null,
//     oficina: '',
//     nombre: '',
//     tel_oficina: '',
//     email: '',
//     direccion: '',
//     telefonoencargado: '',
//   });

//   // Obtener datos de sucursales
//   useEffect(() => {
//     const fetchSucursales = async () => {
//       try {
//         const response = await fetch('https://gestoriasantana-production.up.railway.app/sucursales');
//         const data = await response.json();
//         setSucursales(data);
//       } catch (error) {
//         toast.error('Error al cargar las sucursales');
//       }
//     };

//     const fetchAsesores = async () => {
//       try {
//         const response = await fetch('https://gestoriasantana-production.up.railway.app/usuarios/encargados');
//         const data = await response.json();
//         setAsesores(data);
//       } catch (error) {
//         toast.error('Error al cargar los asesores');
//       }
//     };

//     fetchSucursales();
//     fetchAsesores();
//   }, []);

//   // Maneja cambios en el formulario
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   // Maneja el envío del formulario para agregar o editar
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const method = isEditing ? 'PUT' : 'POST';
//       const endpoint = isEditing
//         ? `https://gestoriasantana-production.up.railway.app/sucursales/${formData.id_sucursal}`
//         : 'https://gestoriasantana-production.up.railway.app/sucursales';

//       const response = await fetch(endpoint, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const newSucursal = await response.json();
//         if (isEditing) {
//           setSucursales((prevSucursales) =>
//             prevSucursales.map((sucursal) =>
//               sucursal.id_sucursal === newSucursal.id_sucursal
//                 ? newSucursal
//                 : sucursal
//             )
//           );
//           toast.success('Sucursal editada correctamente');
//         } else {
//           setSucursales((prevSucursales) => [...prevSucursales, newSucursal]);
//           toast.success('Sucursal creada correctamente');
//         }
//         setIsModalOpen(false);
//       } else {
//         toast.error('Error al guardar la sucursal');
//       }
//     } catch (error) {
//       toast.error('Error en el servidor');
//     }
//   };

//   // Abrir el modal en modo agregar
//   const openAddModal = () => {
//     setIsEditing(false);
//     setFormData({
//       id_sucursal: null,
//       oficina: '',
//       encargado: '',
//       tel_oficina: '',
//       email: '',
//       direccion: '',
//       telefonoencargado: '',
//     });
//     setIsModalOpen(true);
//   };

//   // Abrir el modal en modo edición
//   const openEditModal = (sucursal) => {
//     setIsEditing(true);
//     setFormData(sucursal);
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="p-6">
//       <ToastContainer position="top-center" autoClose={3000} />
//       <h1 className="text-2xl font-bold mb-4">Sucursales</h1>

//       <button
//         onClick={openAddModal}
//         className="mb-4 bg-blue-500 text-white px-4 py-2 rounded flex items-center"
//       >
//         <FaPlus className="mr-2" /> Agregar Sucursal
//       </button>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {sucursales.map((sucursal) => (
//           <div
//             key={sucursal.id_sucursal}
//             className="border rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
//           >
//             <h2 className="text-xl font-bold text-gray-800 mb-2">
//               {sucursal.oficina}
//             </h2>
//             <div className="text-gray-600 space-y-1">
//               <p>
//                 <strong>Encargado:</strong> {sucursal.encargado}
//               </p>
//               <p>
//                 <strong>Dirección:</strong> {sucursal.direccion}
//               </p>
//               <p>
//                 <strong>Tel. Oficina:</strong> {sucursal.tel_oficina}
//               </p>
//               <p>
//                 <strong>Cel:</strong> {sucursal.telefonoencargado}
//               </p>
//               <p>
//                 <strong>Email:</strong> {sucursal.email}
//               </p>
//             </div>
//             <button
//               onClick={() => openEditModal(sucursal)}
//               className="mt-4 w-full bg-yellow-500 text-white px-4 py-2 rounded-lg flex justify-center items-center hover:bg-yellow-600 transition-colors duration-200"
//             >
//               <FaEdit className="mr-2" /> Editar
//             </button>
//           </div>
//         ))}
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h2 className="text-lg font-semibold mb-4">
//               {isEditing ? 'Editar Sucursal' : 'Agregar Sucursal'}
//             </h2>
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="oficina"
//                 placeholder="Oficina"
//                 value={formData.oficina}
//                 onChange={handleChange}
//                 className="border border-gray-300 p-2 rounded w-full mb-2"
//                 required
//               />
//               <select
//                 name="encargado"
//                 value={formData.encargado}
//                 onChange={handleChange}
//                 className="border border-gray-300 p-2 rounded w-full mb-2"
//                 required
//               >
//                 <option value="">Seleccione un encargado</option>
//                 {asesores.map((asesor) => (
//                   <option key={asesor.id_usuario} value={asesor.id_usuario}>
//                     {asesor.nombre}
//                   </option>
//                 ))}
//               </select>
//               <input
//                 type="text"
//                 name="tel_oficina"
//                 placeholder="Tel. Oficina"
//                 value={formData.tel_oficina}
//                 onChange={handleChange}
//                 className="border border-gray-300 p-2 rounded w-full mb-2"
//                 required
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="border border-gray-300 p-2 rounded w-full mb-2"
//                 required
//               />
//               <input
//                 type="text"
//                 name="direccion"
//                 placeholder="Dirección"
//                 value={formData.direccion}
//                 onChange={handleChange}
//                 className="border border-gray-300 p-2 rounded w-full mb-2"
//                 required
//               />
//               <input
//                 type="text"
//                 name="telefonoencargado"
//                 placeholder="Celular"
//                 value={formData.telefonoencargado}
//                 onChange={handleChange}
//                 className="border border-gray-300 p-2 rounded w-full mb-2"
//                 required
//               />
//               <div className="flex justify-end mt-4">
//                 <button
//                   type="button"
//                   onClick={() => setIsModalOpen(false)}
//                   className="text-red-500 font-bold mr-4"
//                 >
//                   Cancelar
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                   Guardar
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sucursales;

// // import React, { useState, useEffect } from 'react';
// // import { FaPlus, FaEdit } from 'react-icons/fa';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // const Sucursales = () => {
// //   const [sucursales, setSucursales] = useState([]);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [formData, setFormData] = useState({
// //     id_sucursal: null,
// //     oficina: '',
// //     encargado: '',
// //     tel_oficina: '',
// //     email: '',
// //     direccion: '',
// //     telefonoencargado: '',
// //   });

// //   // Obtener datos de sucursales
// //   useEffect(() => {
// //     const fetchSucursales = async () => {
// //       try {
// //         //https://gestoriasantana-production.up.railway.app/
// //         // const response = await fetch('http://localhost:5000/sucursales');
// //         const response = await fetch('https://gestoriasantana-production.up.railway.app/sucursales');
// //         const data = await response.json();
// //         setSucursales(data);
// //       } catch (error) {
// //         toast.error('Error al cargar las sucursales');
// //       }
// //     };

// //     fetchSucursales();
// //   }, []);

// //   // Maneja cambios en el formulario
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevFormData) => ({
// //       ...prevFormData,
// //       [name]: value,
// //     }));
// //   };

// //   // Maneja el envío del formulario para agregar o editar
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const method = isEditing ? 'PUT' : 'POST';
// //       // https://gestoriasantana-production.up.railway.app/
// //       // const endpoint = isEditing
// //       //   ? `http://localhost:5000/sucursales/${formData.id_sucursal}`
// //       //   : 'http://localhost:5000/sucursales';

// //         const endpoint = isEditing
// //         ? `https://gestoriasantana-production.up.railway.app/sucursales/${formData.id_sucursal}`
// //         : 'https://gestoriasantana-production.up.railway.app/sucursales';

// //       const response = await fetch(endpoint, {
// //         method,
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(formData),
// //       });

// //       if (response.ok) {
// //         const newSucursal = await response.json();
// //         if (isEditing) {
// //           setSucursales((prevSucursales) =>
// //             prevSucursales.map((sucursal) =>
// //               sucursal.id_sucursal === newSucursal.id_sucursal
// //                 ? newSucursal
// //                 : sucursal
// //             )
// //           );
// //           toast.success('Sucursal editada correctamente');
// //         } else {
// //           setSucursales((prevSucursales) => [...prevSucursales, newSucursal]);
// //           toast.success('Sucursal creada correctamente');
// //         }
// //         setIsModalOpen(false);
// //       } else {
// //         toast.error('Error al guardar la sucursal');
// //       }
// //     } catch (error) {
// //       toast.error('Error en el servidor');
// //     }
// //   };

// //   // Abrir el modal en modo agregar
// //   const openAddModal = () => {
// //     setIsEditing(false);
// //     setFormData({
// //       id_sucursal: null,
// //       oficina: '',
// //       encargado: '',
// //       tel_oficina: '',
// //       email: '',
// //       direccion: '',
// //       telefonoencargado: '',
// //     });
// //     setIsModalOpen(true);
// //   };

// //   // Abrir el modal en modo edición
// //   const openEditModal = (sucursal) => {
// //     setIsEditing(true);
// //     setFormData(sucursal);
// //     setIsModalOpen(true);
// //   };

// //   return (
// //     <div className="p-6">
// //       <ToastContainer position="top-center" autoClose={3000} />
// //       <h1 className="text-2xl font-bold mb-4">Sucursales</h1>

// //       <button
// //         onClick={openAddModal}
// //         className="mb-4 bg-blue-500 text-white px-4 py-2 rounded flex items-center"
// //       >
// //         <FaPlus className="mr-2" /> Agregar Sucursal
// //       </button>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //       {sucursales.map((sucursal) => (
// //         <div
// //           key={sucursal.id_sucursal}
// //           className="border rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
// //         >
// //           <h2 className="text-xl font-bold text-gray-800 mb-2">
// //             {sucursal.oficina}
// //           </h2>
// //           <div className="text-gray-600 space-y-1">
// //             <p>
// //               <strong>Encargado:</strong> {sucursal.encargado}
// //             </p>
// //             <p>
// //               <strong>Dirección:</strong> {sucursal.direccion}
// //             </p>
// //             <p>
// //               <strong>Tel. Oficina:</strong> {sucursal.tel_oficina}
// //             </p>
// //             <p>
// //               <strong>Cel:</strong> {sucursal.telefonoencargado}
// //             </p>
// //             <p>
// //               <strong>Email:</strong> {sucursal.email}
// //             </p>
// //           </div>
// //           <button
// //             onClick={() => openEditModal(sucursal)}
// //             className="mt-4 w-full bg-yellow-500 text-white px-4 py-2 rounded-lg flex justify-center items-center hover:bg-yellow-600 transition-colors duration-200"
// //           >
// //             <FaEdit className="mr-2" /> Editar
// //           </button>
// //         </div>
// //       ))}
// //     </div>
// //       {/* Modal */}
// //       {isModalOpen && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
// //           <div className="bg-white p-6 rounded shadow-lg w-96">
// //             <h2 className="text-lg font-semibold mb-4">
// //               {isEditing ? 'Editar Sucursal' : 'Agregar Sucursal'}
// //             </h2>
// //             <form onSubmit={handleSubmit}>
// //               <input
// //                 type="text"
// //                 name="oficina"
// //                 placeholder="Oficina"
// //                 value={formData.oficina}
// //                 onChange={handleChange}
// //                 className="border border-gray-300 p-2 rounded w-full mb-2"
// //                 required
// //               />
// //               <input
// //                 type="text"
// //                 name="encargado"
// //                 placeholder="Encargado"
// //                 value={formData.encargado}
// //                 onChange={handleChange}
// //                 className="border border-gray-300 p-2 rounded w-full mb-2"
// //                 required
// //               />
// //               <input
// //                 type="text"
// //                 name="direccion"
// //                 placeholder="Dirección"
// //                 value={formData.direccion}
// //                 onChange={handleChange}
// //                 className="border border-gray-300 p-2 rounded w-full mb-2"
// //                 required
// //               />
// //               <input
// //                 type="text"
// //                 name="tel_oficina"
// //                 placeholder="Tel. Oficina"
// //                 value={formData.tel_oficina}
// //                 onChange={handleChange}
// //                 className="border border-gray-300 p-2 rounded w-full mb-2"
// //               />
// //               <input
// //                 type="email"
// //                 name="email"
// //                 placeholder="Email"
// //                 value={formData.email}
// //                 onChange={handleChange}
// //                 className="border border-gray-300 p-2 rounded w-full mb-2"
// //               />
// //               <div className="flex justify-end mt-4">
// //                 <button
// //                   type="button"
// //                   onClick={() => setIsModalOpen(false)}
// //                   className="text-red-500 font-bold mr-4"
// //                 >
// //                   Cancelar
// //                 </button>
// //                 <button
// //                   type="submit"
// //                   className="bg-blue-500 text-white px-4 py-2 rounded"
// //                 >
// //                   Guardar
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Sucursales;
