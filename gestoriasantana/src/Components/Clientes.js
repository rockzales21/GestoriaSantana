import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import html2pdf from 'html2pdf.js';
import CambiarStatus from "./Modales/CambiarStatus";
import { toast } from 'react-toastify';
import { AuthContext } from "./auth/AuthContext"; // Importar el contexto de autenticación
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material'; // Importar componentes de Material-UI
import { getISOWeek, parseISO } from 'date-fns'; // Asegúrate de instalar date-fns: npm install date-fns
import { FaFilter, FaTimes } from 'react-icons/fa'; // Importar los íconos necesarios


import { NumerosALetras } from 'numero-a-letras';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [detalleCliente, setDetalleCliente] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const { profile } = useContext(AuthContext); // Obtener el perfil del usuario desde el contexto
  const [modalFechaBajaOpen, setModalFechaBajaOpen] = useState(false); // Definir el estado para el modal de fecha de baja
  const apiUrl = process.env.REACT_APP_API_URL_PROD; // O REACT_APP_API_URL_TEST según el entorno


  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const token = localStorage.getItem('token'); // Asumiendo que guardaste el token en localStorage

          const response = await axios.get(`${apiUrl}/clientes/clientes`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setClientes(response.data);
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
      }
    };
  
    fetchClientes();
  }, []);


  const formatFecha = (fecha) => {
    if (!fecha) return "No disponible";
    const opciones = { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" };
    const fechaUTC = new Date(fecha);
    console.log('Fecha:', fecha);
    console.log('Fecha UTC:', fechaUTC);
    console.log('Fecha mostrada:', fechaUTC.toLocaleDateString("es-MX", opciones));
    return fechaUTC.toLocaleDateString("es-MX", opciones);
};

  const formatMonto = (monto) => {
    if (monto === null || monto === undefined) {
      return "$0.00"; // Or any default value you prefer
    }
    return `$${monto.toLocaleString("es-MX")}`;
  };

  const handleContratoClick = async (cliente) => {
    try {
      const response = await axios.get(`${apiUrl}/clientes/cliente/${cliente.id_cliente}`);
      const clienteData = response.data;
      generatePDF(clienteData);
    } catch (error) {
      console.error("Error al cargar los detalles del cliente:", error);
    }
  };

  const handleDetallesClick = async (cliente) => {
    try {
      const response = await axios.get(`${apiUrl}/clientes/detalle/${cliente.id_cliente}`);
      setDetalleCliente(response.data);
    } catch (error) {
      console.error("Error al cargar los detalles del cliente:", error);
    }
  };

  const handleEditClick = (cliente) => {
    console.log("Cliente seleccionado para editar:", cliente);
    // navigate(`/editarCliente/${cliente.id_cliente}`, { state: { cliente } });
    navigate(`/editarCliente/${cliente.id_cliente}`);
  };

  
  const [fechaBaja, setFechaBaja] = useState("");
  const [clienteSeleccionadoParaBaja, setClienteSeleccionadoParaBaja] = useState(null);

  const handleOpenFechaBajaModal = (cliente) => {
    setClienteSeleccionadoParaBaja(cliente);
    setFechaBaja("");
    setModalFechaBajaOpen(true);
  };

  const handleCloseFechaBajaModal = () => {
    setClienteSeleccionadoParaBaja(null);
    setModalFechaBajaOpen(false);
  };

  const handleConfirmFechaBaja = async () => {
    if (!clienteSeleccionadoParaBaja || !fechaBaja) return;

    try {
      await axios.put(`https://gestoriasantana-production.up.railway.app/clientes/cliente/${clienteSeleccionadoParaBaja.id_cliente}/fecha_baja`, {
      // const response = await axios.get(`http://localhost:3000/clientes/detalle/${cliente.id_cliente}`);

        fecha_baja: fechaBaja
      });

      // Actualizar el estado local
      setClientes((prevClientes) =>
        prevClientes.map((c) =>
          c.id_cliente === clienteSeleccionadoParaBaja.id_cliente ? { ...c, fecha_baja: fechaBaja } : c
        )
      );

      toast.success('Fecha de baja actualizada correctamente', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'bg-green-500 text-white',
      });

      handleCloseFechaBajaModal();
    } catch (error) {
      console.error('Error al actualizar la fecha de baja del cliente:', error);
      toast.error('Error al actualizar la fecha de baja del cliente', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'bg-red-500 text-white',
      });
    }
  };

  const [honorarios, setHonorarios] = useState(0);

  const generatePDF = (cliente) => {
    const fetchHonorarios = async () => {
      try {
        const response = await fetch('https://gestoriasantana-production.up.railway.app/honorarios');
        const data = await response.json();
        if (response.ok) {
          setHonorarios(parseFloat(data.monto));
          console.log('Valor:', parseFloat(data.monto));
          console.error('Valor:', parseFloat(data.monto));
        } else {
          toast.error('Error al cargar el monto de honorarios');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error al cargar el monto de honorarios');
      }
    };



    const ahora = new Date();
    const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
    const fechaActual = ahora.toLocaleDateString('es-MX', opciones);
    const nombreCompleto = `${cliente.nombre}`;

    console.log('Monto:', cliente.monto);

    fetchHonorarios();
    let aseguramientoCalculo = cliente.monto < 15000 ? 1500 : cliente.monto < 25000 ? 1700 : 2000;
    var honorario = isNaN(honorarios) ? 0 : cliente.monto * honorarios;
    var aseguramiento = aseguramientoCalculo;
    var totalPagar = honorario + aseguramiento;
    var totalCliente = honorario + aseguramiento;

    honorario = honorario.toFixed(2);
    aseguramiento = aseguramiento.toFixed(2);
    totalCliente = totalCliente.toFixed(2);

const totalEnLetras = NumerosALetras(parseFloat(totalCliente), {
  
      plural: 'pesos',
      singular: 'peso',
      centPlural: 'centavos',
      centSingular: 'centavo'
  });


    const input = document.createElement('div');

    input.innerHTML = `
      <div style="width: 700px; margin: 0 auto; font-size: 14px;">
        <h6 style="text-align: justify; margin-bottom: 16px;">
          <strong>CONTRATO DE PRESTACIÓN DE SERVICIOS PROFESIONALES</strong>
        </h6>
        <p style="text-align: justify; margin-bottom: 16px;">
          Que celebran, por una parte, el consultor financiero y de seguridad social <strong>Martha Margarita Santana Ceja</strong> quien en lo sucesivo se le denominara “El Profesionista”, y por otra parte <strong>${nombreCompleto}</strong> la quien en lo sucesivo se le denominara como “El Cliente” y de manera conjunta como “Las Partes”, de conformidad con las declaraciones y clausulas.
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
          ASESORIA Y CONSULTORIA:        $ ${honorario}
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          +SERVICIOS ADMINISTRATIVOS: $ ${aseguramiento}
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
          Total, a recibir por servicios de Honorarios la cantidad de $ ${totalCliente}
        </p>
        <p style="text-align: justify; margin-bottom: 16px;">
(${totalEnLetras}} 
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
          En señal de expresa conformidad y aceptación de los términos del presente contrato, y enteradas LAS PARTES de su contenido y alcances, lo firman por duplicado en Cuernavaca, Morelos el día ${fechaActual}.
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
      const footerText = cliente.direccion_sucursal;
  
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.addImage(headerImage, 'PNG', 0, -5, 40, 30); // Adjust the position and size as needed
        pdf.setFontSize(10);
        const textWidth = pdf.getTextDimensions(footerText).w;
        const xPosition = (pageWidth - textWidth) / 2;
        pdf.text(footerText, xPosition, pageHeight - 10);
      }
    }).save();
  };

  const handleChangeStatus = (cliente) => {
    setClienteSeleccionado(cliente);
    setModalOpen(true);
  };

  const handleConfirmStatusChange = async (cliente, nuevoStatus) => {
    try {
      await axios.put(`https://gestoriasantana-production.up.railway.app/clientes/cliente/${cliente.id_cliente}/status`, {
    //await axios.put(`https://gestoriasantana-production.up.railway.app/cliente/${clienteSeleccionadoParaBaja.id_cliente}/fecha_baja`, {
          nuevoStatus
      });

      // Actualizar el estado local
      setClientes((prevClientes) =>
          prevClientes.map((c) =>
              c.id_cliente === cliente.id_cliente ? { ...c, status: nuevoStatus } : c
          )
      );
    } catch (error) {
      console.error("Error al cambiar el status del cliente:", error);
    }
  };

  const [statusFilter, setStatusFilter] = useState(""); // Nuevo estado para el filtro de estatus
  const [weekFilter, setWeekFilter] = useState(""); // Estado para la semana seleccionada
  const [yearFilter, setYearFilter] = useState(""); // Estado para el año seleccionado
  const [monthFilter, setMonthFilter] = useState(""); // Nuevo estado para el filtro de mes
  const [asesorFilter, setAsesorFilter] = useState(""); // Nuevo estado para el filtro de asesor

  const filteredClientes = clientes.filter((cliente) => {
    const matchesSearch = cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "" || cliente.status.toLowerCase() === statusFilter.toLowerCase();
  
    // Filtrar por semana, año, mes y asesor
    const fechaTramite = cliente.fecha_registro ? parseISO(cliente.fecha_registro) : null;
    const weekOfYear = fechaTramite ? getISOWeek(fechaTramite) : null;
    const yearOfTramite = fechaTramite ? fechaTramite.getFullYear() : null;
    const monthOfTramite = fechaTramite ? fechaTramite.getMonth() + 1 : null; // Los meses en JavaScript son 0-indexados
  
    const matchesWeek = weekFilter === "" || weekOfYear === parseInt(weekFilter);
    const matchesYear = yearFilter === "" || yearOfTramite === parseInt(yearFilter);
    const matchesMonth = monthFilter === "" || monthOfTramite === parseInt(monthFilter);
    const matchesAsesor = asesorFilter === "" || (cliente.nombreasesor || "").toLowerCase() === asesorFilter.toLowerCase();
  
    return matchesSearch && matchesStatus && matchesWeek && matchesYear && matchesMonth && matchesAsesor;
  });

  const [showFilters, setShowFilters] = useState(true); // Estado para controlar la visibilidad de los filtros


  // const filteredClientes = clientes.filter((cliente) => {
  //   const matchesSearch = cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesStatus = statusFilter === "" || cliente.status.toLowerCase() === statusFilter.toLowerCase();

  //   // Filtrar por semana, año y mes
  //   const fechaTramite = cliente.fecha_registro ? parseISO(cliente.fecha_registro) : null;
  //   const weekOfYear = fechaTramite ? getISOWeek(fechaTramite) : null;
  //   const yearOfTramite = fechaTramite ? fechaTramite.getFullYear() : null;
  //   const monthOfTramite = fechaTramite ? fechaTramite.getMonth() + 1 : null; // Los meses en JavaScript son 0-indexados

  //   const matchesWeek = weekFilter === "" || weekOfYear === parseInt(weekFilter);
  //   const matchesYear = yearFilter === "" || yearOfTramite === parseInt(yearFilter);
  //   const matchesMonth = monthFilter === "" || monthOfTramite === parseInt(monthFilter);

  //   return matchesSearch && matchesStatus && matchesWeek && matchesYear && matchesMonth;
  // });
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">LISTA DE CLIENTES</h1>

      {/* Botón para mostrar/ocultar filtros */}
      <div className="flex justify-end mb-4">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded flex items-center gap-2 hover:bg-blue-700 transition-all"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? <FaTimes /> : <FaFilter />} {/* Cambiar ícono dinámicamente */}
        {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
      </button>
      </div>
      {/* Filtros */}
      {/* Contenedor de filtros */}
      {showFilters && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6 transition-all">
          <h2 className="text-lg font-bold mb-4 text-gray-700">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Filtro de búsqueda */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Buscar Cliente</label>
              <input
              type="text"
              placeholder="Escribe el nombre del cliente..."
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
              />
          </div>

          {/* Filtro de estatus */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estatus</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos los estatus</option>
              <option value="alta">Alta</option>
              <option value="en espera">En espera</option>
              <option value="en tramite">En trámite</option>
              <option value="liquidado">Liquidado</option>
              <option value="fallido">Fallido</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          {/* Filtro de semana */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Semana</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={weekFilter}
              onChange={(e) => setWeekFilter(e.target.value)}
            >
              <option value="">Todas las semanas</option>
              {Array.from({ length: 52 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Semana {i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro de mes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mes</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
            >
              <option value="">Todos los meses</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("es-MX", { month: "long" }).toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro de año */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Año</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option value="">Todos los años</option>
              {Array.from({ length: 5 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Filtro de asesor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Asesor</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={asesorFilter}
              onChange={(e) => setAsesorFilter(e.target.value)}
            >
              <option value="">Todos los asesores</option>
              {[...new Set(clientes.map((cliente) => cliente.nombreasesor || "No asignado"))].map((asesor, index) => (
                <option key={index} value={asesor}>
                  {asesor.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    )}

      <div className="grid gap-4">
        {filteredClientes.map((cliente) => (
          <div
            key={cliente.id_cliente}
            className="border rounded-lg p-4 shadow-md bg-white"
          >
            {/* Renglón 1 */}
            <div className="flex flex-wrap mb-2 gap-4 justify-center">
              <div className="flex items-center flex-grow">
                <p className="font-bold">CLIENTE:</p>
                <p className="ml-1">{cliente.nombre.toUpperCase()}</p>
              </div>
              <div className="flex items-center flex-grow">
                <p className="font-bold">CURP:</p>
                <p className="ml-1">{cliente.curp.toUpperCase()}</p>
              </div>
              <div className="flex items-center flex-grow">
                <p className="font-bold">NSS:</p>
                <p className="ml-1">{cliente.nss.toUpperCase()}</p>
              </div>
            </div>

            {/* Renglón 2 */}

            <div className="flex flex-wrap mb-2 gap-4 justify-center">
            {cliente.tipo_tramite && cliente.tipo_tramite != "Activate" && (
              <div className="flex items-center flex-grow">
                <p className="font-bold">MONTO:</p>
                <p className="ml-1">{formatMonto(cliente.monto).toUpperCase()}</p>
              </div>
            )}
              <div className="flex items-center flex-grow">
                <p className="font-bold">FECHA DE TRÁMITE:</p>
                <p className="ml-2">{formatFecha(cliente.fecha_registro).toUpperCase()}</p>
              </div>
              <div className="flex items-center flex-grow">
                <p className="font-bold">FECHA DE ÚLTIMO RETIRO:</p>
                <p className="ml-2">{formatFecha(cliente.fecha_ultimo_retiro).toUpperCase()}</p>
              </div>
            </div>

            {/* Renglón 3 */}
            <div className="flex flex-wrap mb-2 gap-4 justify-center">
              <div className="flex items-center flex-grow">
                <p className="font-bold">SEMANAS COTIZADAS:</p>
                <p className="ml-2">{cliente.semanas_cotizadas.toString().toUpperCase()}</p>
              </div>
              <div className="flex items-center flex-grow">
                <p className="font-bold">SEMANAS DESCONTADAS:</p>
                <p className="ml-2">{cliente.semanas_descontadas.toString().toUpperCase()}</p>
              </div>
              <div className="flex items-center flex-grow">
                <p className="font-bold">AFORE:</p>
                <p className="ml-2">{(cliente.nombreafore || "NO ASIGNADO").toUpperCase()}</p>
              </div>
              <div className="flex items-center flex-grow">
                <p className="font-bold">TIPO DE TRÁMITE:</p>
                <p className="ml-2">{(cliente.tipo_tramite || "NO ASIGNADO").toUpperCase()}</p>
              </div>
            </div>

            {/* Renglón 4 */}
            <div className="flex flex-wrap mb-2 gap-4 justify-center">
              <div className="flex items-center flex-grow">
              <p className="font-bold">ASESOR:</p>
              <p className="ml-2">{(cliente.nombreasesor || "NO ASIGNADO").toUpperCase()}</p>
              </div>
              <div className="flex items-center flex-grow">
              <p className="font-bold">STATUS:</p>
              <p className="ml-2">{cliente.status.toUpperCase()}</p>
              </div>
              <div className="flex items-center flex-grow">
              <button
                className="bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-700 ml-2"
                onClick={() => handleEditClick(cliente)}
              >
                EDITAR
              </button>
              </div>
              <div className="flex items-center flex-grow">
              <button
                className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700"
                onClick={() => handleContratoClick(cliente)}
              >
                CONTRATO
              </button>
              </div>
              <div className="flex items-center flex-grow">
              <button
                className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-700 ml-2"
                onClick={() => handleDetallesClick(cliente)}
              >
                VER DETALLES
              </button>
              </div>
            </div>

            
            {profile && profile.tipo === 3 && (
            <div className="flex flex-wrap mb-2 gap-4 justify-center">
              <div className="flex items-center flex-grow">

                <button 
                  className="bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-700 ml-2"
                  onClick={() => handleChangeStatus(cliente)}
                >
                  CAMBIAR STATUS
                </button>
              


              
                <button
                  className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-700 ml-2"
                  onClick={() => handleOpenFechaBajaModal(cliente)}
                >
                  FECHA DE BAJA
                </button>
              
              </div>
            </div>
            )}
          </div>
        ))}
      </div>
      <CambiarStatus 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onConfirm={handleConfirmStatusChange} 
        cliente={clienteSeleccionado}
      />
      {detalleCliente && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content custom-modal p-4 rounded shadow-lg overflow-auto">
            <h2 className="text-xl font-bold mb-4">DETALLES DEL CLIENTE</h2>
            <p className="whitespace-normal"><strong>NOMBRE:</strong> {detalleCliente.nombre.toUpperCase()}</p>
            <p className="whitespace-normal"><strong>CURP:</strong> {detalleCliente.curp.toUpperCase()}</p>
            <p className="whitespace-normal"><strong>NSS:</strong> {detalleCliente.nss.toUpperCase()}</p>
            <p className="whitespace-normal"><strong>EMAIL:</strong> {detalleCliente.email.toUpperCase()}</p>
            <p className="whitespace-normal"><strong>RFC:</strong> {detalleCliente.rfc.toUpperCase()}</p>
            <p className="whitespace-normal"><strong>TELÉFONO:</strong> {detalleCliente.telefono.toUpperCase()}</p>
            <p className="whitespace-normal"><strong>DIRECCIÓN:</strong> {detalleCliente.direccioncompleta.toUpperCase()}</p>
            <p className="whitespace-normal"><strong>STATUS:</strong> {detalleCliente.status.toUpperCase()}</p>
            <p className="whitespace-normal"><strong>ZONA:</strong> {detalleCliente.zona.toUpperCase()}</p>
            <p className="whitespace-normal"><strong>ACTUALIZÓ:</strong> {detalleCliente.actualizo.toUpperCase()}</p>
            <p className="whitespace-normal"><strong>FECHA DE SOLUCIÓN:</strong> {formatFecha(detalleCliente.fecha_solucion).toUpperCase()}</p>
            <p className="whitespace-normal"><strong>OBSERVACIONES:</strong> {detalleCliente.observaciones.toUpperCase()}</p>
            <p className="whitespace-normal"><strong>FECHA DE BAJA:</strong> {detalleCliente.fecha_baja ? formatFecha(detalleCliente.fecha_baja).toUpperCase() : "NO HAY FECHA DE BAJA"}</p>
            <button
              className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-700 mt-4"
              onClick={() => setDetalleCliente(null)}
            >
              CERRAR
            </button>
          </div>
        </div>
      )}
      <Dialog
        open={modalFechaBajaOpen}
        onClose={handleCloseFechaBajaModal}
        aria-labelledby="fecha-baja-dialog-title"
        aria-describedby="fecha-baja-dialog-description"
      >
        <DialogTitle id="fecha-baja-dialog-title">{"AGREGAR FECHA DE BAJA"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="fecha-baja-dialog-description">
            POR FAVOR, SELECCIONA LA FECHA DE BAJA PARA EL CLIENTE.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="fecha_baja"
            type="date"
            fullWidth
            variant="standard"
            value={fechaBaja}
            onChange={(e) => setFechaBaja(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFechaBajaModal} color="primary">
            CANCELAR
          </Button>
          <Button onClick={handleConfirmFechaBaja} color="primary">
            CONFIRMAR
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Clientes;