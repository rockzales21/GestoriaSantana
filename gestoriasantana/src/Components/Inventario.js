import React, { useState, useEffect, useContext } from 'react';
import { FaPlus, FaEdit } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "./auth/AuthContext";
import 'react-toastify/dist/ReactToastify.css';

const Inventario = () => {
  const [inventario, setInventario] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { profile } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    id_item: null,
    sku: '',
    descripcion: '',
    serie: '',
    status: true,
    cantidad: '',
    observaciones: '',
  });

  // Obtener datos del inventario
  useEffect(() => {
    const fetchInventario = async () => {
      try {
        //https://gestoriasantana-production.up.railway.app/
        // const response = await fetch('http://localhost:5000/inventario');
        const response = await fetch('https://gestoriasantana-production.up.railway.app/inventario');
        const data = await response.json();
        setInventario(data);
      } catch (error) {
        toast.error('Error al cargar el inventario');
      }
    };

    fetchInventario();
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
      // const endpoint = isEditing
      //   ? `http://localhost:5000/inventario/${formData.id_item}`
      //   : 'http://localhost:5000/inventario';

      const endpoint = isEditing
         ? `https://gestoriasantana-production.up.railway.app/inventario/${formData.id_item}`
         : 'https://gestoriasantana-production.up.railway.app/inventario';
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newItem = await response.json();
        if (isEditing) {
          setInventario((prevInventario) =>
            prevInventario.map((item) =>
              item.id_item === newItem.id_item ? newItem : item
            )
          );
          toast.success('Elemento editado correctamente');
        } else {
          setInventario((prevInventario) => [...prevInventario, newItem]);
          toast.success('Elemento agregado correctamente');
        }
        setIsModalOpen(false);
      } else {
        toast.error('Error al guardar el elemento');
      }
    } catch (error) {
      toast.error('Error en el servidor');
    }
  };

  // Abrir el modal en modo agregar
  const openAddModal = () => {
    setIsEditing(false);
    setFormData({
      id_item: null,
      sku: '',
      descripcion: '',
      serie: '',
      status: true,
      cantidad: '',
      observaciones: '',
    });
    setIsModalOpen(true);
  };

  // Abrir el modal en modo edición
  const openEditModal = (item) => {
    setIsEditing(true);
    setFormData(item);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-center" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-4">Inventario</h1>

      <button
        onClick={openAddModal}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded flex items-center"
      >
        <FaPlus className="mr-2" /> Agregar Nuevo
      </button>

      <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">SKU</th>
            <th className="py-2 px-4 border-b">Descripción</th>
            <th className="py-2 px-4 border-b">Serie</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Cantidad</th>
            <th className="py-2 px-4 border-b">Observaciones</th>
            {profile && profile.tipo === 3 && (
            <th className="py-2 px-4 border-b">Acciones</th>
            )}
          </tr>
        </thead>
        <tbody>
          {inventario.map((item) => (
            <tr key={item.id_item} className="text-center">
              <td className="py-2 px-4 border-b">{item.sku}</td>
              <td className="py-2 px-4 border-b">{item.descripcion}</td>
              <td className="py-2 px-4 border-b">{item.serie}</td>
              <td className="py-2 px-4 border-b">
                {item.status ? 'Activo' : 'Inactivo'}
              </td>
              <td className="py-2 px-4 border-b">{item.cantidad}</td>
              <td className="py-2 px-4 border-b">{item.observaciones}</td>
              <td className="py-2 px-4 border-b">
              {profile && profile.tipo === 3 && (
                <button
                  onClick={() => openEditModal(item)}
                  className="text-yellow-500"
                >
                  <FaEdit />
                </button>
              )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">
              {isEditing ? 'Editar Elemento' : 'Agregar Elemento'}
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="sku"
                placeholder="SKU"
                value={formData.sku}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                required
              />
              <input
                type="text"
                name="descripcion"
                placeholder="Descripción"
                value={formData.descripcion}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                required
              />
              <input
                type="text"
                name="serie"
                placeholder="Serie"
                value={formData.serie}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full mb-2"
              />
              <input
                type="number"
                name="cantidad"
                placeholder="Cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                required
              />
              <textarea
                name="observaciones"
                placeholder="Observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full mb-2"
              ></textarea>
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

export default Inventario;
