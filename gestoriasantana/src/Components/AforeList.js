import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AforeList() {
  const [afores, setAfores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAfores();
  }, []);

  const fetchAfores = async () => {
    try {
      //https://gestoriasantana-production.up.railway.app/
      // const response = await axios.get('http://localhost:5000/afores');
      const response = await axios.get('https://gestoriasantana-production.up.railway.app/afores');
      setAfores(response.data);
    } catch (error) {
      console.error('Error al obtener los afores:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700">Lista de Afores</h1>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
          onClick={() => navigate('/crear-afore')}
        >
          Crear Nuevo Afore
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {afores.map((afore) => (
          <div
            key={afore.id_afore}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            {/* Mostrar imagen del Afore */}
            <img
              src={`http://localhost:5000/imagenes/afores/${afore.id_afore}.png`} // Ruta a la imagen
              alt={`Imagen de ${afore.nombre}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {afore.nombre}
              </h2>
              <p className="text-gray-600 mt-2">
                <span className="font-bold">Teléfono:</span> {afore.telefono}
              </p>
              <p className="text-blue-500 mt-2">
                <a
                  href={afore.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Ver sitio web
                </a>
              </p>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => navigate(`/afores/${afore.id_afore}`)}
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {afores.length === 0 && (
        <p className="text-center text-gray-600 mt-6">
          No hay Afores disponibles.
        </p>
      )}
    </div>
  );
}

export default AforeList;
