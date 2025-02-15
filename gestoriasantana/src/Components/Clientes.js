import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import html2pdf from 'html2pdf.js';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
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

  // const handleDetallesClick = (cliente) => {
  //   navigate(`/clientes/contratoClientes/${cliente.id_cliente}`, { state: { cliente } });
  // };
  const handleDetallesClick = async (cliente) => {
    try {
      const response = await axios.get(`https://gestoriasantana-production.up.railway.app/clientes/cliente/${cliente.id_cliente}`);
      const clienteData = response.data;
      generatePDF(clienteData);
    } catch (error) {
      console.error("Error al cargar los detalles del cliente:", error);
    }
  };

  const generatePDF = (cliente) => {
    const nombreCompleto = `${cliente.nombre}`;
    const input = document.createElement('div');
    input.innerHTML = `
      <div style="width: 700px; margin: 0 auto; font-size: 15px;">
        <h6 style="text-align: justify; margin-bottom: 16px;">
          <strong>CONTRATO DE PRESTACIÓN DE SERVICIOS PROFESIONALES</strong>
        </h6>
        <p style="text-align: justify; margin-bottom: 16px;">
          Que celebran, por una parte, el consultor financiero y de seguridad social <strong>Martha Margarita Santana Ceja</strong> quien en lo sucesivo se le denominara “El Profesionista”, y por otra parte <strong>${nombreCompleto}</strong> la quien e n lo sucesivo se le denominara como “El Cliente” y de manera conjunta como “Las Partes”, de conformidad con las declaraciones y clausulas.
        </p>
        <h6 style="text-align: justify; margin-bottom: 16px;">
          <strong>DECLARACIONES</strong>
        </h6>
        <p style="text-align: justify; margin-bottom: 16px;">
          <strong>I.-</strong> DEL PROFESIONISTA
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          <strong>1.1.-</strong> Llamarse tal y como ha quedado asentado en el proemio del presente contrato.
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          <strong>1.2.-</strong> Ser persona física, mayor de edad y contar con capacidad legal plena para obligarse a nombre y por cuenta propia a lo establecido en el presente contrato.
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          <strong>1.3.-</strong> Que tiene su domicilio para el ejercicio profesional de asesoría y gestoría financiera y legal en Calle Cuernavaca no. 47 condominios Cuauhnáhuac en Cuernavaca Morelos.
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          <strong>1.4.-</strong> Que está facultado para prestar los servicios financieros y legales en materia del presente Contrato y que, por lo mismo, cuenta con la capacidad técnica y operativa suficiente para llevar a cabo el cumplimiento del objeto de este Contrato.
        </p>

        <h6 style="text-align: justify; margin-bottom: 16px;">
          <strong>II.-</strong> DEL CLIENTE
        </h6>
        <p style="text-align: justify; margin-bottom: 16px;">
          <strong>2.1.-</strong> Llamarse tal y como ha quedado asentado en el proemio del presente contrato.
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          <strong>2.2.-</strong> Ser persona física, mayor de edad y contar con capacidad legal plena para obligarse a nombre y por cuenta propia a lo establecido en el presente contrato.
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          <strong>2.3.-</strong> Contar con numero de seguridad social (NSS): ${cliente.nss}
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          <strong>2.4.-</strong> Contar con número de CURP: ${cliente.curp}
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          <strong>2.5.-</strong> Tener su domicilio ubicado en ${cliente.direccion_completa}, CP ${cliente.codigo_postal}
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          <strong>2.6.-</strong> Que es su libre voluntad la celebración de este contrato y que no tiene impedimento alguno para ello, aceptando que el servicio de asesoría financiera y materia legal del mismo está sujeto a la legislación aplicable.
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          <strong>III.-</strong> DE LAS PARTES
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          <strong>3.1.-</strong> Que es su libre voluntad la celebración de este contrato y que no tienen impedimento alguno para ello, aceptando que el servicio de asesoría financiera y legal materia de este, está sujeto a la legislación aplicable.
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          <strong>3.2.-</strong> Que se reconocen con capacidad jurídica suficiente para obligarse recíprocamente en virtud de lo anterior se someten a lo establecido en la siguientes clausulas.
        </p>
          

        <p style="text-align: justify; margin-bottom: 16px;">
        <strong>CLAUSULAS</strong>
        </p>


        <p style="text-align: justify; margin-bottom: 16px;">
          <strong>PRIMERA.–</strong> en TERMINOS DEL SERVICIO En virtud del presente contrato EL PROFESIONISTA se obliga a prestar a EL CLIENTE, los siguientes servicios profesionales independientes: ASESORIA Y CONSULTORIA DE SERVICIOS ADMINISTRATIVOS. Los trabajos resultantes de la prestación de servicios profesionales independientes antes referidos serán entregados por EL PROFESIONISTA de acuerdo con el plan de actividades y entregas que para tal efecto acuerdan las partes. 
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          <strong>SEGUNDA.–</strong> DISPOSICIÓN DEL SERVICIO EL PROFESIONISTA desarrollará las actividades que por el presente instrumento se le encomiendan en la forma, términos y con los materiales y/o herramientas que estime convenientes, de acuerdo con los conocimientos que, como profesional de la materia, ha adquirido y posee. 
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          <strong>TERCERA.–</strong> HONORARIOS DE SERVICIO EL CLIENTE se obliga a pagar a EL PROFESIONISTA sus servicios de Honorarios por:
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          ASESORIA Y CONSULTORIA:        $ _____________
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          +SERVICIOS ADMINISTRATIVOS: $ _____________     
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          Total, a recibir por servicios de Honorarios la cantidad de $ ___________
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          (___________________________________________________________ 00/100 M.N). 
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
        Que será cubierta en una exhibición al término de los servicios prestados. El lugar para la recepción del cobro será Calle Cuernavaca no. 47 Cond. Cuauhnáhuac C.P. 62430 Cuernavaca Morelos O DONDE LAS PARTES ACUERDEN.
        </p>

        <p style="text-align: justify; margin-bottom: 16px;">
          <strong>CUARTA.–</strong> VIGENCIA DEL SERVICIO Se estipula que la vigencia del presente contrato será a partir de la fecha de firma del presente documento y hasta que se concluya los servicios a realizarse; no más de un promedio máximo de 70 días naturales una vez firmado el contrato de servicios, plazo que podrá prorrogarse, previo acuerdo entre las partes siempre y cuando se presente la información completa y correcta.
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          EL PROFESIONISTA se obliga a informar periódicamente al CLIENTE el resultado de sus gestiones, lo que podrá hacer de manera personal, o a través de cualquier medio de comunicación que las partes acuerden, siempre que quede un registro del cumplimiento de esta obligación.
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          <strong>QUINTA.-</strong> EL CLIENTE acepta recibir exclusivamente del PROFESIONISTA los servicios profesionales contratados en el presente escrito.
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          EL CLIENTE podrá pedir dentro de la vigencia del contrato y cuantas veces lo requiera, la asesoría a que se refiere la presente clausula.
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          <strong>SEXTA.–</strong> Son causal de terminación del presente contrato las siguientes: 
        </p>

        <p style="text-align: justify; margin-bottom: 16px;">
          a.- Por haberse cumplido el OBJETO del contrato, 
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          b.- Por muerte o incapacidad física permanente de cualquiera de las PARTES.
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          c.- Por que el cliente se active antes de la terminación del contrato al IMSS como trabajador 
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          Cuando cualquiera de las PARTES lo solicite a la otra sin mayores requisitos que el aviso se realice por escrito y notifique a la otra parte con 15 días de anticipación y siempre y cuando no existan obligaciones pendientes de cumplimiento.
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          <strong>SEPTIMA.–</strong> Son causales de recisión de contrato las siguientes:
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          a.- El incumplimiento de las obligaciones de cualquiera de las PARTES conforme a lo establecido en el presente contrato.
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          b. – Para el caso de rescisión, la parte cliente se obliga a pagar a la parte afectada la cantidad de $2,000.00 (DOS Mil Pesos 00/100 M.N.) por concepto de pena convencional.
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          <strong>OCTAVA.–</strong> Ambas partes manifiestan que, para el caso de interpretación, cumplimiento y resolución del presente contrato se someten a la competencia de los Tribunales de la Ciudad de Cuernavaca, Morelos, renunciando a la que pudiera corresponderles con motivo del domicilio presente o futuro.
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          <strong>NOVENA.–</strong> Política de Privacidad y Confidencialidad. 
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          Los datos, documentos e información personal que el “CLIENTE” proporcione al “PROFESIONISTA” serán utilizados única y exclusivamente para lo estipulado en el presente contrato y serán resguardados en calidad de confidencial.
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          El CLIENTE se compromete a no divulgar los datos del proceso realizado por EL PROFESIONISTA mientras este en curso ni al finalizar el mismo, así como los costos y la información interna que se le proporcione a EL CLIENTE.
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          En señal de expresa conformidad y aceptación de los términos del presente contrato, y enteradas LAS PARTES de su contenido y alcances, lo firman por duplicado en Cuernavaca, Morelos el día ____   de diciembre    del 202_.
        </p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 20px;">  
          <div style="text-align: left;">
            <p style="font-size: 16px;">
              _____________________________
            </p>
            <p style="font-size: 16px;">
              ${nombreCompleto}
            </p>
          </div>
          <div style="text-align: right;">
            <p style="font-size: 16px;">
              _____________________________
            </p>  
            <p style="font-size: 16px;">
              Lic. Martha Margarita Santana Ceja
            </p>
          </div>
        </div>
        <br/>
      </div>
    `;

    const options = {
      margin: [15, 10, 20, 10],
      filename: `contrato_${nombreCompleto}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 3, letterRendering: false, useCORS: true },
      jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };

    html2pdf().set(options).from(input).toPdf().get('pdf').then((pdf) => {
      const totalPages = pdf.internal.getNumberOfPages();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const headerImage = '/img/logo.png';
      const footerText = 'C. CUERNAVACA NO. 47 COND CUAHUNAHUAC  CUERNAVACA MORELOS 7772167527';
  
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.addImage(headerImage, 'PNG', 0, 0, 50, 20); // Adjust the position and size as needed
        pdf.setFontSize(10);
        const textWidth = pdf.getTextDimensions(footerText).w;
        const xPosition = (pageWidth - textWidth) / 2;
        pdf.text(footerText, xPosition, pageHeight - 10);
      }
    }).save();
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
                onClick={() => handleDetallesClick(cliente)}
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

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Clientes = () => {
//   const [clientes, setClientes] = useState([]);

//   useEffect(() => {
//     const fetchClientes = async () => {
//       try {
//         //https://gestoriasantana-production.up.railway.app/
//         // const response = await axios.get("http://localhost:5000/clientes/clientes");
//         const response = await axios.get("https://gestoriasantana-production.up.railway.app/clientes/clientes");
//         setClientes(response.data);
//       } catch (error) {
//         console.error("Error al cargar los clientes:", error);
//       }
//     };

//     fetchClientes();
//   }, []);

//   const formatFecha = (fecha) => {
//     if (!fecha) return "No disponible";
//     const opciones = { year: "numeric", month: "2-digit", day: "2-digit" };
//     return new Date(fecha).toLocaleDateString("es-MX", opciones);
//   };

//   const formatMonto = (monto) => {
//     return `$${monto.toLocaleString("es-MX")}`;
//   };

//   const handleDetallesClick = (cliente) => {
//     navigate(`/contratoCliente/${cliente.id_cliente}`, { state: { cliente } });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4 text-center">Lista de Clientes</h1>
//       <div className="grid gap-4">
//         {clientes.map((cliente) => (
//           <div
//             key={cliente.id_cliente}
//             className="border rounded-lg p-4 shadow-md bg-white"
//           >
//             {/* Renglón 1 */}
//             <div className="flex justify-between mb-2">
//               <p className="font-bold">Cliente:</p>
//               <p>{cliente.nombre}</p>
//               <p className="font-bold">CURP:</p>
//               <p>{cliente.curp}</p>
//               <p className="font-bold">NSS:</p>
//               <p>{cliente.nss}</p>
//             </div>

//             {/* Renglón 2 */}
//             <div className="flex justify-between mb-2">
//               <p className="font-bold">Monto:</p>
//               <p>{formatMonto(cliente.monto)}</p>
//               <p className="font-bold">Fecha de trámite:</p>
//               <p>{formatFecha(cliente.fecha_registro)}</p>
//               <p className="font-bold">Fecha de último retiro:</p>
//               <p>{formatFecha(cliente.fecha_ultimo_retiro)}</p>
//             </div>

//             {/* Renglón 3 */}
//             <div className="flex justify-between mb-2">
//               <p className="font-bold">Semanas cotizadas:</p>
//               <p>{cliente.semanas_cotizadas}</p>
//               <p className="font-bold">Semanas descontadas:</p>
//               <p>{cliente.semanas_descontadas}</p>
//               <p className="font-bold">Afore:</p>
//               <p>{cliente.id_afore || "No asignado"}</p>
//             </div>

//             {/* Renglón 4 */}
//             <div className="flex justify-between items-center">
//               <p className="font-bold">Asesor:</p>
//               <p>{cliente.id_asesor || "No asignado"}</p>
//               <p className="font-bold">Status:</p>
//               <p>{cliente.status}</p>
//               <button
//                 className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700"
//                 onClick={() => handleDetallesClick(cliente)}
//               >
//                 Ver Detalles
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Clientes;
