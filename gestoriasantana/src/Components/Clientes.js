import React, { useEffect, useState } from 'react';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);  // Estado para almacenar la lista de clientes

  // useEffect se ejecuta cuando el componente se monta
  useEffect(() => {
    // Llamada a la API en Express para obtener los datos de clientes
    fetch('/clientes')  
      .then((response) => response.json())
      .then((data) => setClientes(data));  // Almacena los datos en el estado
  }, []);

  // Renderiza la lista de clientes en una lista no ordenada
  return (
    <div>
      <h1>Clientes</h1>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id_cliente}>
            {cliente.id_persona} - {cliente.direccion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clientes;
