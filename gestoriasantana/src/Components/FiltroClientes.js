

import React, { useEffect, useState } from "react";
import axios from "axios";

const FiltroClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [asesores, setAsesores] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [semanaFilter, setSemanaFilter] = useState({ semana: "", año: "" });
  const [mesFilter, setMesFilter] = useState({ mes: "", año: "" });
  const [asesorFilter, setAsesorFilter] = useState("");
  const [nombreFilter, setNombreFilter] = useState("");
  const [showFilters, setShowFilters] = useState(true); // Control de visibilidad de filtros

  useEffect(() => {
    const fetchAsesores = async () => {
      try {
        //https://gestoriasantana-production.up.railway.app/
        // const response = await axios.get("http://localhost:5000/usuarios/asesores");
        const response = await axios.get("https://gestoriasantana-production.up.railway.app/usuarios/asesores");
        setAsesores(response.data);
      } catch (error) {
        console.error("Error al cargar los asesores:", error);
      }
    };

    fetchAsesores();
  }, []);

  const handleFilter = async (type) => {
    try {
      // let url = "http://localhost:5000/clientes/clientes?";
      let url = "https://gestoriasantana-production.up.railway.app/clientes/clientes?";
      if (type === "status") url += `status=${statusFilter}`;
      if (type === "semana") url += `semana=${semanaFilter.semana}&año=${semanaFilter.año}`;
      if (type === "mes") url += `mes=${mesFilter.mes}&año=${mesFilter.año}`;
      if (type === "asesor") url += `asesor=${asesorFilter}`;
      if (type === "nombre") url += `nombre=${nombreFilter}`;

      const response = await axios.get(url);
      setClientes(response.data);
    } catch (error) {
      console.error("Error al filtrar clientes:", error);
    }
  };

  const formatFecha = (fecha) => {
    if (!fecha) return "No disponible";
    const opciones = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(fecha).toLocaleDateString("es-MX", opciones);
  };

  const formatMonto = (monto) => `$${monto.toLocaleString("es-MX")}`;

//     const handleNombreFilter = (nombre) => {
//     setNombreFilter(nombre);
//     const filtered = clientes.filter((cliente) =>
//       cliente.nombre.toLowerCase().includes(nombre.toLowerCase())
//     );
//     setClientesFiltrados(filtered);
//   };

  const handleNombreFilter = (nombre) => {
    setNombreFilter(nombre);
    if (nombre.trim() === "") {
      setClientesFiltrados([]); // Restablece a la lista original
    } else {
      const filtered = clientes.filter((cliente) =>
        cliente.nombre.toLowerCase().includes(nombre.toLowerCase())
      );
      setClientesFiltrados(filtered);
    }
  };
  

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Filtros de Clientes</h1>
      {/* <button
        className={`bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-700 mb-4 transition-all duration-300 ${
          showFilters ? "transform rotate-0" : "transform rotate-180"
        }`}
        onClick={toggleFilters}
      >
        {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
      </button> */}

      <button
  className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-700 mb-4 transition-all duration-300 flex items-center gap-2"
  onClick={toggleFilters}
>
  {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
  <span
    className={`transition-transform duration-300 ${
      showFilters ? "rotate-180" : "rotate-0"
    }`}
  >
    ▼
  </span>
</button>


      {/* Filtros */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          showFilters ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Filtro por Nombre */}
        <div className="mb-4">
          <h2 className="font-bold">Filtro por Nombre</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ingrese el nombre"
              className="border p-2 rounded w-full"
              value={nombreFilter}
              onChange={(e) => handleNombreFilter(e.target.value)}
            />
          </div>
        </div>
        {/* Filtros existentes */}
        <div className="mb-4">
            <h2 className="font-bold">Filtro por Status</h2>
            <div className="flex gap-2">
              {["Alta", "En espera", "En trámite", "Liquidado", "Fallido", "Activo", "Inactivo"].map((status) => (
                <button
                  key={status}
                  className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700"
                  onClick={() => {
                    setStatusFilter(status);
                    handleFilter("status");
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
         <h2 className="font-bold">Filtro por Semana</h2>
         <div className="flex gap-2 items-center">
           <input
             type="number"
             placeholder="Semana"
             className="border p-2 rounded"
             value={semanaFilter.semana}
            onChange={(e) => setSemanaFilter({ ...semanaFilter, semana: e.target.value })}
          />
          <input
            type="number"
             placeholder="Año"
             className="border p-2 rounded"
             value={semanaFilter.año}
             onChange={(e) => setSemanaFilter({ ...semanaFilter, año: e.target.value })}
           />
           <button
             className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700"
             onClick={() => handleFilter("semana")}
           >
             Buscar
           </button>
         </div>
       </div>

       <div className="mb-4">
         <h2 className="font-bold">Filtro por Mes</h2>
         <div className="flex gap-2 items-center">
           <select
             className="border p-2 rounded"
             value={mesFilter.mes}
             onChange={(e) => setMesFilter({ ...mesFilter, mes: e.target.value })}
           >
             <option value="">Seleccione un mes</option>
             {["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"].map((mes, index) => (
               <option key={index} value={index + 1}>
                 {mes}
               </option>
             ))}
           </select>
           <input
             type="number"
             placeholder="Año"
             className="border p-2 rounded"
             value={mesFilter.año}
             onChange={(e) => setMesFilter({ ...mesFilter, año: e.target.value })}
           />
           <button
             className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700"
             onClick={() => handleFilter("mes")}
           >
             Buscar
           </button>
         </div>
       </div>

       {/* Filtro por Asesor */}
       <div className="mb-4">
         <h2 className="font-bold">Filtro por Asesor</h2>
         <div className="flex gap-2 items-center">
           <select
             className="border p-2 rounded"
             value={asesorFilter}
             onChange={(e) => setAsesorFilter(e.target.value)}
           >
             <option value="">Seleccione un asesor</option>
             {asesores.map((asesor) => (
               <option key={asesor.id_usuario} value={asesor.id_usuario}>
                 {asesor.nombre}
               </option>
             ))}
           </select>
           <button
             className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700"
             onClick={() => handleFilter("asesor")}
           >
             Buscar
           </button>
         </div>
         </div>

          
      </div>

      {/* Resultados */}
      <div className="grid gap-4">
  {(clientesFiltrados.length > 0 ? clientesFiltrados : clientes).map((cliente) => (
    <div key={cliente.id_cliente} className="border rounded-lg p-4 shadow-md bg-white">
      <p className="font-bold">Cliente:</p> <p>{cliente.nombre}</p>
      <p className="font-bold">Monto:</p> <p>{formatMonto(cliente.monto)}</p>
      <p className="font-bold">Fecha de trámite:</p> <p>{formatFecha(cliente.fecha_registro)}</p>
    </div>
  ))}
</div>

      {/* <div className="grid gap-4">
         {clientes.map((cliente) => (
           <div key={cliente.id_cliente} className="border rounded-lg p-4 shadow-md bg-white">
             <p className="font-bold">Cliente:</p> <p>{cliente.nombre}</p>
             <p className="font-bold">Monto:</p> <p>{formatMonto(cliente.monto)}</p>
             <p className="font-bold">Fecha de trámite:</p> <p>{formatFecha(cliente.fecha_registro)}</p>
           </div>
         ))}
       </div> */}
     </div>
  );
};

export default FiltroClientes;
