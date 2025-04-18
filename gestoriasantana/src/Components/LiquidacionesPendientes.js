import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LiquidacionesPendientes = () => {
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalSum, setTotalSum] = useState(0);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL_PROD; // O REACT_APP_API_URL_TEST según el entorno
  const apiTest = process.env.REACT_APP_API_URL_TEST; // Para pruebas, si es necesario
  //REACT_APP_API_URL_TEST

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Recuperar el token del almacenamiento local
      if (!token) {
        navigate('/login'); // Redirigir al inicio de sesión si no hay token
        return;
      }

        const response = await axios.get(`${apiUrl}/liquidaciones/pendientes`, {
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
          },
        });
        setData(response.data);

        // Calcular la suma de los totales
        const sum = response.data.reduce((acc, item) => acc + parseFloat(item.total), 0);
        setTotalSum(sum.toFixed(3)); // Redondear a 3 decimales
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);

      // Manejar el caso de 404
      if (err.response && err.response.status === 404) {
        setError('Sin liquidaciones');
      } else {
        setError('Error al cargar los datos.');
      }
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-4">Cargando datos...</div>;
  if (error) return <div className="text-center text-red-500 mt-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Liquidaciones</h1>

      {/* Mostrar la suma total */}
      <div className="text-lg font-semibold text-gray-700 text-center mb-6">
        Suma Total: <span className="text-blue-500">${totalSum}</span>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 shadow-md bg-white hover:shadow-lg"
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Cliente: {item.nombre}
            </h2>
            <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1">
              {/* Campos alternados con colores */}
              <div className="font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
                Monto:
              </div>
              <div className="bg-gray-50 px-2 py-1 rounded-md">{item.monto}</div>

              <div className="font-medium text-gray-600 bg-white px-2 py-1 rounded-md">
                Porcentaje:
              </div>
              <div className="bg-white px-2 py-1 rounded-md">{item.porcentaje}%</div>

              <div className="font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
                Aseguramiento:
              </div>
              <div className="bg-gray-50 px-2 py-1 rounded-md">{item.aseguramiento}</div>

              <div className="font-medium text-gray-600 bg-white px-2 py-1 rounded-md">
                Cobro Cliente:
              </div>
              <div className="bg-white px-2 py-1 rounded-md">{item.cobrocliente}</div>

              <div className="font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
                Servicios:
              </div>
              <div className="bg-gray-50 px-2 py-1 rounded-md">{item.servicios}</div>

              <div className="font-medium text-gray-600 bg-white px-2 py-1 rounded-md">
                Asesor:
              </div>
              <div className="bg-white px-2 py-1 rounded-md">{item.asesor}</div>

              <div className="font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
                Total:
              </div>
              <div className="bg-gray-50 px-2 py-1 rounded-md">{item.total}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LiquidacionesPendientes;
