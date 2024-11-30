import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function AforeForm() {
  const { id } = useParams();
  const navigate = useNavigate();

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
      const response = await axios.get(`http://localhost:5000/afores/${id}`);
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
        await axios.put(`http://localhost:5000/afores/${id}`, data);
        alert('Afore actualizado correctamente');
      } else {
        await axios.post('http://localhost:5000/afores', data);
        alert('Afore creado correctamente');
      }
      navigate('/afores');
    } catch (error) {
      console.error('Error al guardar el afore:', error);
      alert('Ocurrió un error');
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
    </form>
  );
}

export default AforeForm;
