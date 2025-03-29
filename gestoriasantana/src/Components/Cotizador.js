import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Cotizador = () => {
  const [inputValue, setInputValue] = useState('');
  const [honorarios, setHonorarios] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL_PROD; // O REACT_APP_API_URL_TEST según el entorno

  useEffect(() => {
    const fetchHonorarios = async () => {
      try {
        // const response = await fetch('https://gestoriasantana-production.up.railway.app/honorarios');
        const response = await fetch(`${apiUrl}/honorarios`);
        const data = await response.json();
        if (response.ok) {
          setHonorarios(parseFloat(data.monto));
        } else {
          toast.error('Error al cargar el monto de honorarios');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error al cargar el monto de honorarios');
      }
    };

    fetchHonorarios();
  }, []);

  const formatoPesos = (cantidad) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(cantidad);
  };

  const total = parseFloat(inputValue) || 0;
  let aseguramientoCalculo = total < 15000 ? 1500 : total < 25000 ? 1700 : 2000;
  const honorario = isNaN(honorarios) ? 0 : total * honorarios;
  const aseguramiento = aseguramientoCalculo;
  const totalPagar = honorario + aseguramiento;
  const totalCliente = total - totalPagar;

  return (
    <div className="p-6 rounded-lg shadow-lg w-80 mx-auto mt-10 bg-white">
      <h2 className="text-lg font-semibold mb-4">Cotizador</h2>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border border-gray-300 p-2 rounded w-full mb-4"
        placeholder="Cantidad a retirar"
        autoFocus
      />
      <div className="results text-justify">
        <p><strong>Cantidad total:</strong> {formatoPesos(total)}</p>
        <p><strong>Honorarios:</strong> {formatoPesos(honorario)}</p>
        <p><strong>Aseguramiento:</strong> {formatoPesos(aseguramiento)}</p>
        <p><strong>Total a pagar:</strong> {formatoPesos(totalPagar)}</p>
        <p><strong>Cliente recibe:</strong> {formatoPesos(totalCliente)}</p>
      </div>
    </div>
  );
};

export default Cotizador;