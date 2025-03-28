import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AforeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL_PROD; // Cambia a REACT_APP_API_URL_TEST si estás en pruebas


  const [formData, setFormData] = useState({
    nombre: '',
    link: '',
    telefono: '',
    imagen: null,
  });

  useEffect(() => {
    if (id) {
      fetchAfore();
    }
  }, [id]);

  const fetchAfore = async () => {
    try {
      // const response = await axios.get(`https://gestoriasantana-production.up.railway.app/afores/${id}`);
      const response = await axios.get(`${apiUrl}/afores/${id}`);
      const { nombre, link, telefono } = response.data;
      setFormData({ nombre, link, telefono, imagen: null });
    } catch (error) {
      console.error('Error al cargar el afore:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      if (id) {
        // await axios.put(`https://gestoriasantana-production.up.railway.app/afores/${id}`, data);
        await axios.put(`${apiUrl}/afores/${id}`, data);
        toast.success("Afore actualizado correctamente.");
      } else {
        // await axios.post('https://gestoriasantana-production.up.railway.app/afores', data);
        await axios.post(`${apiUrl}/afores`, data);
        toast.success("Afore creado correctamente.");
      }
      navigate('/afores');
    } catch (error) {
      toast.error('Error al guardar el afore:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label className="block font-bold mb-1">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">Link</label>
        <input
          type="url"
          name="link"
          value={formData.link}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">Teléfono</label>
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">Imagen</label>
        <input
          type="file"
          name="imagen"
          onChange={handleChange}
          className="w-full border px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {id ? 'Actualizar' : 'Crear'}
      </button>
      <ToastContainer />
    </form>
  );
}

export default AforeForm;
