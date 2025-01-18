import React, { useEffect, useState } from 'react';
import axios from 'axios';
const LiquidacionesPendientes = () => {
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //https://gestoriasantana-production.up.railway.app/
        // const response = await axios.get('http://localhost:5000/liquidaciones/pendientes');
        const response = await axios.get('https://gestoriasantana-production.up.railway.app/liquidaciones/pendientes');
        setData(response.data);

        // Calcular la suma de los totales
        const sum = response.data.reduce((acc, item) => acc + parseFloat(item.total), 0);
        setTotalSum(sum.toFixed(3)); // Redondear a 3 decimales
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-4">Cargando datos...</div>;
  if (error) return <div className="text-center text-red-500 mt-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Liquidaciones Pendientes</h1>

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

// const LiquidacionesPendientes = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/liquidaciones/pendientes');
//         setData(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Error al cargar los datos.');
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) return <div className="text-center mt-4">Cargando datos...</div>;
//   if (error) return <div className="text-center text-red-500 mt-4">{error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold text-center mb-4">Liquidaciones Pendientes</h1>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
//               <th className="border border-gray-300 px-4 py-2 text-right">Monto</th>
//               <th className="border border-gray-300 px-4 py-2 text-right">Porcentaje</th>
//               <th className="border border-gray-300 px-4 py-2 text-right">Aseguramiento</th>
//               <th className="border border-gray-300 px-4 py-2 text-right">Cobro Cliente</th>
//               <th className="border border-gray-300 px-4 py-2 text-right">Servicios</th>
//               <th className="border border-gray-300 px-4 py-2 text-right">Asesor</th>
//               <th className="border border-gray-300 px-4 py-2 text-right">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item, index) => (
//               <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                 <td className="border border-gray-300 px-4 py-2">{item.nombre}</td>
//                 <td className="border border-gray-300 px-4 py-2 text-right">{item.monto}</td>
//                 <td className="border border-gray-300 px-4 py-2 text-right">{item.porcentaje}%</td>
//                 <td className="border border-gray-300 px-4 py-2 text-right">{item.aseguramiento}</td>
//                 <td className="border border-gray-300 px-4 py-2 text-right">{item.cobrocliente}</td>
//                 <td className="border border-gray-300 px-4 py-2 text-right">{item.servicios}</td>
//                 <td className="border border-gray-300 px-4 py-2 text-right">{item.asesor}</td>
//                 <td className="border border-gray-300 px-4 py-2 text-right">{item.total}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default LiquidacionesPendientes;
