import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FechasTramites = () => {
    const [semanas, setSemanas] = useState([]);

    useEffect(() => {
        const fetchSemanas = async () => {
            //https://gestoriasantana-production.up.railway.app/
            // const response = await axios.get('http://localhost:5000/fechasTramites/semanas');
            const response = await axios.get('https://gestoriasantana-production.up.railway.app/fechasTramites/semanas');
            const semanasConFormato = response.data.map((semana) => ({
                ...semana,
                fecha_tramite: semana.fecha_tramite ? semana.fecha_tramite.split('T')[0] : '', // Extrae solo la fecha
            }));
            setSemanas(semanasConFormato);
        };

        fetchSemanas();
    }, []);

    const handleChange = (index, field, value) => {
        const updatedSemanas = [...semanas];
        updatedSemanas[index][field] = value;
        setSemanas(updatedSemanas);
    };

    const handleSave = async (index) => {
        const { numero_semana, fecha_tramite, observaciones } = semanas[index];
        
        try {
            //https://gestoriasantana-production.up.railway.app/
            // const response = await axios.post('http://localhost:5000/fechasTramites/semanas', { numero_semana, fecha_tramite, observaciones });
            const response = await axios.post('https://gestoriasantana-production.up.railway.app/fechasTramites/semanas', { numero_semana, fecha_tramite, observaciones });

            if (response.data.message.includes("Semana guardada correctamente.")) {
                alert('Semana guardada correctamente.');
            } else {
                alert('Semana actualizada correctamente.');
            }
        } catch (error) {
            alert('Error al guardar la semana.');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Fechas de tramites</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border border-gray-200 shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left border-b border-gray-200">Número de Semana</th>
                            <th className="px-4 py-2 text-left border-b border-gray-200">Fecha Trámite</th>
                            <th className="px-4 py-2 text-left border-b border-gray-200">Observaciones</th>
                            <th className="px-4 py-2 text-left border-b border-gray-200">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {semanas.map((semana, index) => (
                            <tr key={semana.numero_semana} className="even:bg-gray-50">
                                <td className="px-4 py-2 border-b border-gray-200">{semana.numero_semana}</td>
                                <td className="px-4 py-2 border-b border-gray-200">
                                    <input
                                        type="date"
                                        value={semana.fecha_tramite || ''}
                                        onChange={(e) => handleChange(index, 'fecha_tramite', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </td>
                                <td className="px-4 py-2 border-b border-gray-200">
                                    <input
                                        type="text"
                                        value={semana.observaciones || ''}
                                        onChange={(e) => handleChange(index, 'observaciones', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </td>
                                <td className="px-4 py-2 border-b border-gray-200">
                                    <button
                                        onClick={() => handleSave(index)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                                    >
                                        Guardar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FechasTramites;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const FechasTramites = () => {
//   const [semanas, setSemanas] = useState([]);

//   useEffect(() => {
//     const fetchSemanas = async () => {
//       const response = await axios.get('http://localhost:5000/fechasTramites/semanas');
//       const semanasConFormato = response.data.map((semana) => ({
//         ...semana,
//         fecha_tramite: semana.fecha_tramite ? semana.fecha_tramite.split('T')[0] : '', // Extrae solo la fecha
//       }));
//       setSemanas(semanasConFormato);
//     };

//     fetchSemanas();
//   }, []);

//   const handleChange = (index, field, value) => {
//     const updatedSemanas = [...semanas];
//     updatedSemanas[index][field] = value;
//     setSemanas(updatedSemanas);
//   };

//   const handleSave = async (index) => {
//     const { numero_semana, fecha_tramite, observaciones } = semanas[index];
//     await axios.post('http://localhost:5000/fechasTramites/semanas', { numero_semana, fecha_tramite, observaciones });
//     alert('Semana guardada correctamente.');
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold text-center mb-6">Módulo de Semanas</h1>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border border-gray-200 shadow-lg rounded-lg">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="px-4 py-2 text-left border-b border-gray-200">Número de Semana</th>
//               <th className="px-4 py-2 text-left border-b border-gray-200">Fecha Trámite</th>
//               <th className="px-4 py-2 text-left border-b border-gray-200">Observaciones</th>
//               <th className="px-4 py-2 text-left border-b border-gray-200">Acciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {semanas.map((semana, index) => (
//               <tr key={semana.numero_semana} className="even:bg-gray-50">
//                 <td className="px-4 py-2 border-b border-gray-200">{semana.numero_semana}</td>
//                 <td className="px-4 py-2 border-b border-gray-200">
//                   <input
//                     type="date"
//                     value={semana.fecha_tramite || ''}
//                     onChange={(e) => handleChange(index, 'fecha_tramite', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//                   />
//                 </td>
//                 <td className="px-4 py-2 border-b border-gray-200">
//                   <input
//                     type="text"
//                     value={semana.observaciones || ''}
//                     onChange={(e) => handleChange(index, 'observaciones', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//                   />
//                 </td>
//                 <td className="px-4 py-2 border-b border-gray-200">
//                   <button
//                     onClick={() => handleSave(index)}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
//                   >
//                     Guardar
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default FechasTramites;
