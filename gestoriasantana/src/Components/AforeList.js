import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "./auth/AuthContext";

function AforeList() {
  const [afores, setAfores] = useState([]);
  const navigate = useNavigate();
  const { profile } = useContext(AuthContext);
  const apiUrl = process.env.REACT_APP_API_URL_PROD; // Cambia a REACT_APP_API_URL_TEST si estás en pruebas

  useEffect(() => {
    fetchAfores();
  }, []);

  const fetchAfores = async () => {
    try {
      // const response = await axios.get('https://gestoriasantana-production.up.railway.app/afores');
      const response = await axios.get(`${apiUrl}/afores`);
      setAfores(response.data);
    } catch (error) {
      console.error('Error al obtener los afores:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700">Lista de Afores</h1>
        {profile && profile.tipo === 3 && (
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
          onClick={() => navigate('/crear-afore')}
        >
          Crear Nuevo Afore
        </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {afores.map((afore) => (
          <div
            key={afore.id_afore}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            {/* Mostrar imagen del Afore */}
<img
  src={`${apiUrl}/imagenes/afores/${afore.id_afore}.png`} // Ruta a la imagen
  //src={`https://gestoriasantana-production.up.railway.app/imagenes/afores/${afore.id_afore}.png`} // Ruta a la imagen
  alt={`Imagen de ${afore.nombre}`}
  className="w-full h-48 object-contain" // Cambiar a object-contain aquí
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
              {profile && profile.tipo === 3 && (
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => navigate(`/afores/${afore.id_afore}`)}
              >
                Editar
              </button>
              )}
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
