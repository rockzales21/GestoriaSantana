// import React, { useState } from 'react';
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const FormularioTramite = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tipo_tramite, setTipoTramite] = useState("");
  const [asesores, setAsesores] = useState([]);
  const [afores, setAfores] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido_p: '',
    apellido_m: '',
    curp: '',
    nss: '',
    rfc: '',
    email: '',
    semanas_cotizadas: '',
    semanas_descontadas: '',
    direccion: '',
    ciudad: '',
    estado: '',
    telefono: '',
    infonavit: '',
    codigo_postal: '',
    monto: '',
    id_asesor: "",
    id_afore: "",
    fechaFinalizacion: '',
    fecha_ultimo_retiro: '',
    fecha_ultima_baja: '',
    fecha_solucion: '',
    salario: '',
    empleo: '',
    forma_pago: '',
    observaciones: '',
    nombresTestigo1: '',
    apellido_pTestigo1: '',
    apellido_mTestigo1: '',
    parentescoTestigo1: '',
    telefonoTestigo1: '',
    nombresTestigo2: '',
    apellido_pTestigo2: '',
    apellido_mTestigo2: '',
    parentescoTestigo2: '',
    telefonoTestigo2: '',
    status: '',
    fecha_alta: '',
    fecha_fin_tramite: '',
  });


  useEffect(() => {
    const fetchAsesores = async () => {
      try {
        //https://gestoriasantana-production.up.railway.app/
        // const response = await fetch("http://localhost:5000/usuarios/asesores");
        const response = await fetch("https://gestoriasantana-production.up.railway.app/usuarios/asesores");
        const data = await response.json();
        setAsesores(data);
      } catch (error) {
        console.error("Error al cargar asesores:", error);
      }
    };

    const fetchAfores = async () => {
      try {
        // const response = await fetch("http://localhost:5000/afores/afores");
        const response = await fetch("https://gestoriasantana-production.up.railway.app/afores/afores");
        const data = await response.json();
        setAfores(data);
      } catch (error) {
        console.error("Error al cargar afores:", error);
      }
    };

    const fetchCliente = async () => {
      try {
        // const response = await axios.get(`https://gestoriasantana-production.up.railway.app/clientes/clienteInfoActualizacion/${id}`);
        const response = await axios.get(`https://gestoriasantana-production.up.railway.app/clientes/clienteInfoActualizacion/${id}`);
        // const response = await axios.get(`http://localhost:3000/clientes/clienteInfoActualizacion/${id}`);
        const clienteData = response.data;
        clienteData.infonavit = clienteData.infonavit ? "true" : "false"; // Convertir a cadena de texto
        setFormData(clienteData);
        setTipoTramite(clienteData.tipo_tramite);
        console.log(clienteData);
        console.log(clienteData.tipo_tramite);
      } catch (error) {
        console.error("Error al cargar los datos del cliente:", error);
      }
    };

    fetchAsesores();
    fetchAfores();
    if (id) {
      fetchCliente();
    }
  }, [id]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleTipoTramiteChange = (e) => {
    const value = e.target.value;
    setTipoTramite(value);

    let fecha_alta = null;
    let fecha_fin_tramite = null;
    let monto = formData.monto; // Mantener el valor actual por defecto

    if (value === "Activate") {
      const today = new Date();
      const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      fecha_alta = nextMonth.toISOString(); // Convertimos a formato datetime
      monto = 0; // Establecer el monto a 0 solo para "Activate"
    } else {
      const today = new Date();
      const sevenDaysLater = new Date(today);
      sevenDaysLater.setDate(today.getDate() + 7); // Sumar 7 días a la fecha actual
      fecha_alta = sevenDaysLater.toISOString(); // Convertimos a formato datetime
  
      const fechaFinTramite = new Date(sevenDaysLater);
      fechaFinTramite.setDate(fechaFinTramite.getDate() + 47); // Sumar 47 días a partir de fecha_alta
      fecha_fin_tramite = fechaFinTramite.toISOString(); // Convertimos a formato datetime
    }
    
    setFormData({
      ...formData,
      tipo_tramite: value,
      status: 
        value === "Pensión" || value === "Negativa" || value === "Desempleo" || value === "Mejoravit" || value === "Creditos" || value === "PPR"
          ? "Alta"
          : value === "Activate"
          ? "Activo"
          : "",
      fecha_alta, // Incluimos la fecha_alta si aplica
      fecha_fin_tramite, // Incluimos la fecha_fin_tramite si aplica
      monto,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = id
        // ? `https://gestoriasantana-production.up.railway.app/clientes/cliente/${id}`
        ? `https://gestoriasantana-production.up.railway.app/clientes/cliente/${id}`
        // ? `http://localhost:3000/clientes/cliente/${id}`
        : 'https://gestoriasantana-production.up.railway.app/registrarCliente';
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Formulario enviado con éxito.");
        setFormData({
          nombre: '',
          apellido_p: '',
          apellido_m: '',
          curp: '',
          nss: '',
          rfc: '',
          email: '',
          semanas_cotizadas: '',
          semanas_descontadas: '',
          direccion: '',
          ciudad: '',
          estado: '',
          telefono: '',
          infonavit: '',
          codigo_postal: '',
          monto: '',
          id_asesor: "",
          id_afore: "",
          fechaFinalizacion: '',
          fecha_ultimo_retiro: '',
          fecha_ultima_baja: '',
          fecha_solucion: '',
          salario: '',
          empleo: '',
          forma_pago: '',
          observaciones: '',
          nombresTestigo1: '',
          apellido_pTestigo1: '',
          apellido_mTestigo1: '',
          parentescoTestigo1: '',
          telefonoTestigo1: '',
          nombresTestigo2: '',
          apellido_pTestigo2: '',
          apellido_mTestigo2: '',
          parentescoTestigo2: '',
          telefonoTestigo2: '',
          status: "",
          fecha_alta: '',
          fecha_fin_tramite: '',
        });
        navigate('/clientes');
      } else {
        toast.error("Error al registrar al cliente.");
      }
    } catch (error) {
      toast.error("Error al registrar al cliente.");
    }
  };
  
  return (
    // <form className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6">
      <div className="mb-4">
        <label htmlFor="tipo_tramite" className="block text-gray-700">
          Tipo de Trámite
        </label>
        <select
          id="tipo_tramite"
          name="tipo_tramite"
          className="mt-2 w-full p-2 border border-gray-300 rounded-md"
          value={tipo_tramite}
          required
          onChange={handleTipoTramiteChange}
        >
          <option value="">Seleccione un tipo de trámite</option>
          <option value="Pensión">Pensión</option>
          <option value="Negativa">Negativa/ Recuperación de saldos</option>
          <option value="Desempleo">Desempleo</option>
          <option value="Mejoravit">Mejoravit</option>
          <option value="Creditos">Créditos</option>
          <option value="PPR">PPR</option>
          <option value="Activate">Activate</option>
        </select>
      </div>

      <div className="relative z-0 mb-6 w-full group">
        <input
          type="text"
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
          required
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
          placeholder=" "
        />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Nombres:
        </label>
      </div>

      {/* Apellido Paterno y Apellido Materno */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="apellido_p"
            value={formData.apellido_p}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Apellido paterno:
          </label>
        </div>
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="apellido_m"
            value={formData.apellido_m}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Apellido materno:
          </label>
        </div>
      </div>

      {/* CURP y NSS */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="curp"
            value={formData.curp}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            CURP:
          </label>
        </div>
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="nss"
            value={formData.nss}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            NSS:
          </label>
        </div>
      </div>


      {/* RFC y Teléfono */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="rfc"
            value={formData.rfc}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            RFC:
          </label>
        </div>
        <div className="relative z-0 w-full group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Email:
        </label>
        </div>
      </div>

{/* RFC y Teléfono */}
<div className="grid grid-cols-2 gap-4 mb-6">
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="semanas_cotizadas"
            value={formData.semanas_cotizadas}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Semanas cotizadas:
          </label>
        </div>
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="semanas_descontadas"
            value={formData.semanas_descontadas}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Semanas descontadas:
        </label>
        </div>
      </div>

      {/* Email */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="relative z-0 w-full group">
          <select
          id="id_asesor"
          name="id_asesor"
          className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.id_asesor} // Cambiado a formData
          required
          onChange={handleChange} // Cambiado a handleChange
          >
            <option value="">Seleccione un asesor</option>
          {asesores.map((asesor) => (
            <option key={asesor.id_usuario} value={asesor.id_usuario}>
              {asesor.nombre}
            </option>
          ))}
          </select>

        </div>
        <div className="relative z-0 w-full group">
        <select
          id="id_afore"
          name="id_afore"
          className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.id_afore} // Cambiado a formData
          required
          onChange={handleChange} // Cambiado a handleChange
          >
            <option value="">Seleccione un afore</option>
          {afores.map((afore) => (
            <option key={afore.id_afore} value={afore.id_afore}>
              {afore.nombre}
            </option>
          ))}
          </select>
        </div>
      </div>

      {/* Direccion */}
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="direccion"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
          placeholder=" "
        />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        Direccion:
        </label>
      </div>

      {/* Ciudad y Estado */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Ciudad:</label>
        </div>
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Estado:</label>
        </div>
      </div>

 {/* Teléfono, Infonavit y Código Postal */} 
 <div className="grid grid-cols-3 gap-4 mb-6"> {/* Teléfono */} 
  <div className="relative z-0 w-full group"> 
    <input type="tel" 
    name="telefono" 
    value={formData.telefono} 
    onChange={handleChange} 
    required 
    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200" placeholder=" " /> 
    <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> 
      Teléfono: 
      </label> 
      </div> 
      {/* Infonavit */} 
      <div className="relative z-0 w-full group">
  <label className="block text-sm text-gray-500">
    Infonavit:
  </label>
  <div className="flex items-center space-x-4 mt-2">
    <label className="flex items-center">
      <input
        type="radio"
        name="infonavit"
        value="true"
        checked={formData.infonavit === "true"}
        onChange={handleChange}
        className="form-radio text-blue-600"
        required
      />
      <span className="ml-2 text-gray-700">Sí</span>
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        name="infonavit"
        value="false"
        checked={formData.infonavit === "false"}
        onChange={handleChange}
        className="form-radio text-blue-600"
        required
      />
      <span className="ml-2 text-gray-700">No</span>
    </label>
  </div>
</div>
                {/* Código Postal */} 
                <div className="relative z-0 w-full group"> 
                  <input type="text" name="codigo_postal" value={formData.codigo_postal} onChange={handleChange} 
                  required className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200" placeholder=" " /> 
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> 
                    Código Postal: 
                    </label> 
                    </div> 
                    </div>



      {/* Campos específicos para Pensión, Negativa o Desempleo */}
      {(tipo_tramite === 'Pensión' || tipo_tramite === 'Negativa' || tipo_tramite === 'Desempleo' || tipo_tramite === 'Mejoravit' || tipo_tramite === 'Creditos' || tipo_tramite === 'PPR') && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="fecha_ultimo_retiro" className="block text-gray-700">Fecha de Último Retiro</label>
              <input
                type="date"
                id="fecha_ultimo_retiro"
                name="fecha_ultimo_retiro"
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                value={formData.fecha_ultimo_retiro ? formData.fecha_ultimo_retiro.split('T')[0] : ''}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="fecha_ultima_baja" className="block text-gray-700">Fecha de Última Baja</label>
              <input
                type="date"
                id="fecha_ultima_baja"
                name="fecha_ultima_baja"
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                value={formData.fecha_ultima_baja ? formData.fecha_ultima_baja.split('T')[0] : ''}
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="monto" className="block text-gray-700">Monto</label>
              <input
                type="number"
                id="monto"
                name="monto"
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                value={formData.monto}
                required
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="fecha_solucion" className="block text-gray-700">Fecha de Solución</label>
              <input
                type="date"
                id="fecha_solucion"
                name="fecha_solucion"
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                value={formData.fecha_solucion ? formData.fecha_solucion.split('T')[0] : ''}
                required
                onChange={handleChange}
              />
            </div>
          </div>
        </>
      )}

      {/* Campos específicos para Activate */}
      {tipo_tramite === 'Activate' && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="salario" className="block text-gray-700">Salario</label>
              <input
                type="number"
                id="salario"
                name="salario"
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                value={formData.salario}
                required
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="empleo" className="block text-gray-700">Empleo</label>
              <input
                type="text"
                id="empleo"
                name="empleo"
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                value={formData.empleo}
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="forma_pago" className="block text-gray-700">Forma de Pago</label>
            <select
              id="forma_pago"
              name="forma_pago"
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
              value={formData.forma_pago}
              required
              onChange={handleChange}
            >
              <option value="">Seleccione una forma de pago</option>
              <option value="Mensual">Mensual</option>
              <option value="Bimestral">Bimestral</option>
              <option value="Semestral">Semestral</option>
              <option value="Anual">Anual</option>
            </select>
          </div>
        </>
      )}
      <h3 className="text-lg font-semibold mt-4">Referencias</h3>
{!id && (
  <div className="grid grid-cols-2 gap-8 mb-6">
    {/* Testigo 1 */}
    <div>
      <h4 className="text-md font-semibold">1.-</h4>
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="text"
          name="nombresTestigo1"
          value={formData.nombresTestigo1}
          onChange={handleChange}
          required
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
          placeholder=" "
        />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Nombre(s):
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="apellido_pTestigo1"
            value={formData.apellido_pTestigo1}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Apellido paterno:</label>
        </div>
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="apellido_mTestigo1"
            value={formData.apellido_mTestigo1}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Apellido materno:</label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="relative z-0 w-full group">
          <select
          id="parentescoTestigo1"
          name="parentescoTestigo1"
          className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          value={formData.parentescoTestigo1}
          onChange={handleChange}
          >
            <option value="">Seleccione el parentesco</option>
            <option value="esposo">Esposo(a)</option>
            <option value="familiar">Familiar</option>
            <option value="amigo">Amigo</option>
            <option value="trabajo">Trabajo</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="telefonoTestigo1"
            value={formData.telefonoTestigo1}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Telefono:</label>
        </div>
      </div>
    </div>

    {/* Testigo 2 */}
    <div>
      <h4 className="text-md font-semibold">2.-</h4>
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="text"
          name="nombresTestigo2"
          value={formData.nombresTestigo2}
          onChange={handleChange}
          required
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
          placeholder=" "
        />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Nombre(s):
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="apellido_pTestigo2"
            value={formData.apellido_pTestigo2}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Apellido paterno:</label>
        </div>
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="apellido_mTestigo2"
            value={formData.apellido_mTestigo2}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Apellido materno:</label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="relative z-0 w-full group">
          <select
          id="parentescoTestigo2"
          name="parentescoTestigo2"
          className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.parentescoTestigo2}
          required
          onChange={handleChange}
          >
            <option value="">Seleccione el parentesco</option>
            <option value="esposo">Esposo(a)</option>
            <option value="familiar">Familiar</option>
            <option value="amigo">Amigo</option>
            <option value="trabajo">Trabajo</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="telefonoTestigo2"
            value={formData.telefonoTestigo2}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Telefono:</label>
        </div>
      </div>
    </div>
  </div>
)}
    <div className="relative z-0 mb-6 w-full group">
        <input
          type="text"
          name="observaciones"
          value={formData.observaciones}
          onChange={handleChange}
          required
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
          placeholder=" "
        />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Observaciones:
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        {id ? 'Actualizar' : 'Enviar'}
      </button>
      {/* <button
        type="submit"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Enviar 
       </button> */}
      <ToastContainer />
    </form>
  );
};

export default FormularioTramite;
