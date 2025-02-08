import React, { useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "./auth/AuthContext";


const RegistrarAsesor = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    nombres: '',
    apellido_p: '',
    apellido_m: '',
    curp: '',
    nss: '',
    rfc: '',
    telefono: '',
    email: '',
    calle: '',
    numero_interior: '',
    numero_exterior: '',
    colonia: '',
    codigo_postal: '',
    ciudad: '',
    estado: '',
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
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('https://gestoriasantana-production.up.railway.app/registrarAsesor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Asesor registrado correctamente.");
        setFormData({
          nombres: '',
          apellido_p: '',
          apellido_m: '',
          curp: '',
          nss: '',
          rfc: '',
          telefono: '',
          email: '',
          calle: '',
          numero_interior: '',
          numero_exterior: '',
          colonia: '',
          codigo_postal: '',
          ciudad: '',
          estado: '',
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
        });
      } else {
        // alert('Error al registrar el asesor: ' + data.msg);
        toast.error('Error al registrar el asesor: ' + data.msg);
      }
    } catch (error) {
      console.error('Error:', error);
      // alert('Error al registrar el asesor');
      toast.error("Error al registrar el asesor.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6">
      {/* Nombres */}
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
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Teléfono:
          </label>
        </div>
      </div>

      {/* Email */}
      <div className="relative z-0 mb-6 w-full group">
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

{/* Calle */}
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="text"
          name="calle"
          value={formData.calle}
          onChange={handleChange}
          required
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
          placeholder=" "
        />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Calle:</label>
      </div>


      {/* Número Interior y Exterior */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="numero_interior"
            value={formData.numero_interior}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Número Interior:
            </label>
        </div>
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="numero_exterior"
            value={formData.numero_exterior}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Número Exterior:
            </label>
        </div>
      </div>

      {/* Colonia y Código Postal */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="colonia"
            value={formData.colonia}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Colonia:</label>
        </div>
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="codigo_postal"
            value={formData.codigo_postal}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Código Postal:</label>
        </div>
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


      <h3 className="text-lg font-semibold mt-4">Referencias</h3>

<div className="grid grid-cols-2 gap-8 mb-6">
  {/* Testigo 1 */}
  <div class>
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
          value={formData.parentescoTestigo1} // Cambiado a formData
          onChange={handleChange} // Cambiado a handleChange
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
      {/* Repite este mismo bloque para apellido_pTestigo1, apellido_mTestigo1, parentescoTestigo1, telefonoTestigo1 */}

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
          value={formData.parentescoTestigo2} // Cambiado a formData
          onChange={handleChange} // Cambiado a handleChange
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
      {/* Repite este bloque para apellido_pTestigo2, apellido_mTestigo2, parentescoTestigo2, telefonoTestigo2 */}
      </div>
    </div>

      <button
        type="submit"
        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Registrar Asesor
      </button>
    </form>
  );
};

export default RegistrarAsesor;
