import React, { useEffect, useState } from "react";
import axios from "axios";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        //https://gestoriasantana-production.up.railway.app/
        // const response = await axios.get("http://localhost:5000/clientes/clientes");
        const response = await axios.get("https://gestoriasantana-production.up.railway.app/clientes/clientes");
        setClientes(response.data);
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  const formatFecha = (fecha) => {
    if (!fecha) return "No disponible";
    const opciones = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(fecha).toLocaleDateString("es-MX", opciones);
  };

  const formatMonto = (monto) => {
    return `$${monto.toLocaleString("es-MX")}`;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Lista de Clientes</h1>
      <div className="grid gap-4">
        {clientes.map((cliente) => (
          <div
            key={cliente.id_cliente}
            className="border rounded-lg p-4 shadow-md bg-white"
          >
            {/* Renglón 1 */}
            <div className="flex justify-between mb-2">
              <p className="font-bold">Cliente:</p>
              <p>{cliente.nombre}</p>
              <p className="font-bold">CURP:</p>
              <p>{cliente.curp}</p>
              <p className="font-bold">NSS:</p>
              <p>{cliente.nss}</p>
            </div>

            {/* Renglón 2 */}
            <div className="flex justify-between mb-2">
              <p className="font-bold">Monto:</p>
              <p>{formatMonto(cliente.monto)}</p>
              <p className="font-bold">Fecha de trámite:</p>
              <p>{formatFecha(cliente.fecha_registro)}</p>
              <p className="font-bold">Fecha de último retiro:</p>
              <p>{formatFecha(cliente.fecha_ultimo_retiro)}</p>
            </div>

            {/* Renglón 3 */}
            <div className="flex justify-between mb-2">
              <p className="font-bold">Semanas cotizadas:</p>
              <p>{cliente.semanas_cotizadas}</p>
              <p className="font-bold">Semanas descontadas:</p>
              <p>{cliente.semanas_descontadas}</p>
              <p className="font-bold">Afore:</p>
              <p>{cliente.id_afore || "No asignado"}</p>
            </div>

            {/* Renglón 4 */}
            <div className="flex justify-between items-center">
              <p className="font-bold">Asesor:</p>
              <p>{cliente.id_asesor || "No asignado"}</p>
              <p className="font-bold">Status:</p>
              <p>{cliente.status}</p>
              <button
                className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700"
                onClick={() => alert(`Detalles de ${cliente.nombre}`)}
              >
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clientes;
