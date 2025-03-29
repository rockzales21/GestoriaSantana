import React, { useEffect, useState } from "react";

const ProduccionTables = () => {
  const [yearData, setYearData] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const [weekData, setWeekData] = useState([]);
  const [totalClientesAnio, setTotalClientesAnio] = useState(null); // Para el total de clientes por año
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL_PROD; // Cambia a REACT_APP_API_URL_TEST si estás en pruebas
  const apiTestUrl = process.env.REACT_APP_API_URL_TEST; // Cambia a REACT_APP_API_URL_PROD si estás en producción
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local
        if (!token) {
          console.error("No se encontró el token de autenticación.");
          setLoading(false);
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`, // Incluir el token en los encabezados
        };

        // Obtener producción por año
        const yearResponse = await fetch(`${apiUrl}/usuarios/produccionYear`, { headers });
        const yearResult = await yearResponse.json();
        setYearData(yearResult);

        // Obtener producción por mes
        const monthResponse = await fetch(`${apiUrl}/usuarios/produccionMes`, { headers });
        const monthResult = await monthResponse.json();
        setMonthData(monthResult);

        // Obtener producción por semana
        const weekResponse = await fetch(`${apiUrl}/usuarios/produccionSemana`, { headers });
        const weekResult = await weekResponse.json();
        setWeekData(weekResult);

        // Obtener total de clientes por año
        const totalClientesResponse = await fetch(`${apiUrl}/usuarios/produccionAnio`, { headers });
        const totalClientesResult = await totalClientesResponse.json();
        setTotalClientesAnio(totalClientesResult[0]?.total_clientes || "No disponible"); // Asignamos el valor o mensaje

        // // Obtener producción por año
        // const yearResponse = await fetch(`${apiUrl}/usuarios/produccionYear`);
        // const yearResult = await yearResponse.json();
        // setYearData(yearResult);

        // // Obtener producción por mes
        // const monthResponse = await fetch(`${apiUrl}/usuarios/produccionMes`);
        // const monthResult = await monthResponse.json();
        // setMonthData(monthResult);

        // // Obtener producción por semana
        // const weekResponse = await fetch(`${apiUrl}/usuarios/produccionSemana`);
        // const weekResult = await weekResponse.json();
        // setWeekData(weekResult);

        // // Obtener total de clientes por año
        // const totalClientesResponse = await fetch(`${apiUrl}/usuarios/produccionAnio`);
        // const totalClientesResult = await totalClientesResponse.json();
        // setTotalClientesAnio(totalClientesResult[0]?.total_clientes || "No disponible"); // Asignamos el valor o mensaje

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderTable = (data, columns, title) => (
    <div className="mb-6">
      <header className="bg-gray-800 text-white text-lg font-semibold p-4 rounded-t-lg">
        {title}
      </header>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col, index) => (
              <th
                key={index}
                className="border border-gray-200 px-4 py-2 text-left text-gray-700"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100`}
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="border border-gray-200 px-4 py-2 text-gray-600"
                >
                  {item[col.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 p-6 text-center">
            <span className="text-gray-500 text-sm">Cargando datos...</span>
          </div>
        ) : (
          <>
            {/* Sección de Total de Clientes por Año */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6 col-span-2">
              <header className="bg-green-800 text-white text-lg font-semibold p-4 rounded-t-lg">
                Total de Clientes por Año
              </header>
              <div className="p-4 text-center">
                <p className="text-gray-700 text-xl">
                  {`Total de Clientes por Año: ${totalClientesAnio}`}
                </p>
              </div>
            </div>

            {/* Primera columna: Producción por Año */}
            <div className="bg-white shadow-md rounded-lg">
              {renderTable(
                yearData,
                [
                  { header: "Asesor", field: "nombre" },
                  { header: "Total Año", field: "total_clientes" },
                ],
                "Producción por Año"
              )}
            </div>

            {/* Segunda columna: Producción por Mes y Semana */}
            <div className="space-y-6">
              {/* Producción por Mes */}
              <div className="bg-white shadow-md rounded-lg">
                {renderTable(
                  monthData,
                  [
                    { header: "Mes", field: "mes" },
                    { header: "Total Clientes", field: "total_clientes" },
                  ],
                  "Producción por Mes"
                )}
              </div>

              {/* Producción por Semana */}
              <div className="bg-white shadow-md rounded-lg">
                {renderTable(
                  weekData,
                  [
                    { header: "Semana", field: "semana" },
                    { header: "Total Clientes", field: "total_clientes" },
                  ],
                  "Producción por Semana"
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProduccionTables;
