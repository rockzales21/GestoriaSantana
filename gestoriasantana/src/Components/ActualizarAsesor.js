import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ActualizarAsesor = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtiene el ID de la URL
  const [formData, setFormData] = useState({
    nombres: '', apellido_p: '', apellido_m: '', curp: '', nss: '', rfc: '',
    telefono: '', email: '', calle: '', numero_interior: '', numero_exterior: '',
    colonia: '', codigo_postal: '', ciudad: '', estado: '', status: '', tipo: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Carga los datos actuales del asesor para editar
    const fetchUserData = async () => {
      try {
        // const response = await fetch(`http://localhost:5000/usuarios/${id}`);
        const response = await fetch(`https://gestoriasantana-production.up.railway.app/usuarios/${id}`);
        //https://gestoriasantana-production.up.railway.app/
        const data = await response.json();
        if (response.ok) {
          setFormData(data);
        } else {
          // setMessage('Error al cargar los datos del usuario');
          toast.error('Error al cargar los datos del usuario');
        }
      } catch (error) {
        console.error('Error:', error);
        //setMessage('Error al cargar los datos del usuario');
        toast.error('Error al cargar los datos del usuario');
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch(`http://localhost:5000/usuarios/${id}`, {
        const response = await fetch(`https://gestoriasantana-production.up.railway.app/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        // setMessage('Usuario actualizado correctamente');
        toast.success('Usuario actualizado correctamente');
        setTimeout(() => navigate('/asesores'), 3000);
      } else {
        // setMessage(`Error al actualizar el usuario: ${data.message}`);
        toast.error(`Error al actualizar el usuario: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      // setMessage('Error al actualizar el usuario');
      toast.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6">
      <div className="mb-4 text-center text-red-600">{message && <p>{message}</p>}</div>
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="text" name="nombres" value={formData.nombres} onChange={handleChange} required
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600">
          Nombres:
        </label>
      </div>
      {/* Añadir el resto de los campos de formulario aquí */}

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="apellido_p"
            value={formData.apellido_p}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Apellido paterno:
          </label>
        </div>
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="apellido_m"
            value={formData.apellido_m}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Apellido materno:
          </label>
        </div>
      </div>


      {/* CURP y NSS */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="curp"
            value={formData.curp}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            CURP:
          </label>
        </div>
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="nss"
            value={formData.nss}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            NSS:
          </label>
        </div>
      </div>


      {/* RFC y Teléfono */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="rfc"
            value={formData.rfc}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            RFC:
          </label>
        </div>
        <div className="relative z-0 w-full group">
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Teléfono:
          </label>
        </div>
      </div>

      {/* Email */}
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
          placeholder=" "
        />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Email:
        </label>
      </div>


      {/* Calle */}
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="text"
          name="calle"
          value={formData.calle}
          onChange={handleChange}
          required
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
          placeholder=" "
        />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Calle:</label>
      </div>


      {/* Número Interior y Exterior */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="numero_interior"
            value={formData.numero_interior}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Número Interior:
            </label>
        </div>
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="numero_exterior"
            value={formData.numero_exterior}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Número Exterior:
            </label>
        </div>
      </div>


      {/* Colonia y Código Postal */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="colonia"
            value={formData.colonia}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Colonia:</label>
        </div>
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="codigo_postal"
            value={formData.codigo_postal}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Código Postal:</label>
        </div>
      </div>

      {/* Ciudad y Estado */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Ciudad:</label>
        </div>
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Estado:</label>
        </div>
      </div>


      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="relative z-0 w-full group">
          <select
          id="tipo"
          name="tipo"
          className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.tipo} // Cambiado a formData
          onChange={handleChange} // Cambiado a handleChange
          >
            <option value="">Seleccione el parentesco</option>
            <option value="1">Cotizador</option>
            <option value="2">Encargado</option>
            <option value="3">Administrador</option>
          </select>

        </div>
        <div className="relative z-0 w-full group">
        <select
          id="status"
          name="status"
          className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.status} // Cambiado a formData
          onChange={handleChange} // Cambiado a handleChange
          >
            <option value="">Seleccione el parentesco</option>
            <option value="1">Activo</option>
            <option value="2">Inactivo</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Actualizar Asesor
      </button>
    </form>
  );
};

export default ActualizarAsesor;
