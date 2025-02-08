import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Clientes from './Components/Clientes';
import Asesores from './Components/Asesores';
import Afores from './Components/Afores';
import AforeForm from './Components/AforeForm';
import AforeList from './Components/AforeList';
import VisorSemanas from './Components/VisorSemanas';
import RegistrarAsesor from './Components/RegistrarAsesor';
import ActualizarAsesor from './Components/ActualizarAsesor';
import Inventario from './Components/Inventario';
import Sucursales from './Components/Sucursales';
import FormularioTramite from './Components/FormularioTramite';
import ReporteProduccion from './Components/reporteProduccion';
import FechasTramites from './Components/FechasTramites';
import LiquidacionesPendientes from './Components/LiquidacionesPendientes';
import FiltroClientes from './Components/FiltroClientes';
import Login from './Components/auth/Login';
import { AuthProvider } from './Components/auth/AuthContext';
import PrivateRoute from './Components/auth/PrivateRoute';
import Contrato from './Components/Contrato';
import ContratoCliente from './Components/ContratoCliente';
import Home from './pages/Home';
import Header from './layout/Header';
import Profile from './Components/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaMoneyBillWave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [cantidad, setCantidad] = useState('');
  const [honorarios, setHonorarios] = useState(0);

  document.title = 'Gestoria Mago Santana';

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setShowDetails(false);
    setCantidad('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowDetails(true);
    }
  };

  const handleChange = (e) => {
    setCantidad(e.target.value);
  };

  useEffect(() => {
    const fetchHonorarios = async () => {
      try {
        const response = await fetch('https://gestoriasantana-production.up.railway.app/honorarios');
        const data = await response.json();
        if (response.ok) {
          setHonorarios(parseFloat(data.monto));
        } else {
          toast.error('Error al cargar el monto de honorarios');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error al cargar el monto de honorarios');
      }
    };

    if (isModalOpen) {
      fetchHonorarios();
    }
  }, [isModalOpen]);

  const FloatingButton = ({ onClick }) => (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition"
    >
      <FaMoneyBillWave size={24} />
    </button>
  );

  const formatoPesos = (cantidad) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(cantidad);
  };

  const CotizadorModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const total = parseFloat(cantidad);
    let aseguramientoCalculo = total < 15000 ? 1500 : total < 25000 ? 1700 : 2000;
    const honorario = total * honorarios;
    const aseguramiento = aseguramientoCalculo;
    const totalPagar = honorario + aseguramiento;
    const totalCliente = total - totalPagar;

    return (
      <div
        className={`fixed bottom-4 right-4 bg-white p-6 rounded-lg shadow-lg w-80 z-50 transition-transform ${
          isOpen ? 'modal-open' : 'modal-close'
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">Cotizador</h2>
        {!showDetails ? (
          <input
            type="number"
            value={cantidad}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="border border-gray-300 p-2 rounded w-full mb-4"
            placeholder="Cantidad a retirar"
            autoFocus
          />
        ) : (
          <div className="results text-justify">
            <p>Cantidad total: {formatoPesos(total)}</p>
            <p>Honorarios: {formatoPesos(honorario)}</p>
            <p>Aseguramiento: {formatoPesos(aseguramiento)}</p>
            <p>Total: {formatoPesos(totalPagar)}</p>
            <p>Cliente: {formatoPesos(totalCliente)}</p>
          </div>
        )}
        <button onClick={onClose} className="text-red-500 font-bold mt-4">
          Cerrar
        </button>
      </div>
    );
  };

  return (
    <Router>
      <AuthProvider>
        <ToastContainer position="top-center" autoClose={3000} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <FloatingButton onClick={toggleModal} />
                  <CotizadorModal isOpen={isModalOpen} onClose={toggleModal} />
                  <Outlet />
                </>
              }
            >
              <Route index element={<Home />} />
              <Route path="clientes" element={<Clientes />} />
              <Route path="inventario" element={<Inventario />} />
              <Route path="sucursales" element={<Sucursales />} />
              <Route path="asesores" element={<Asesores />} />
              <Route path="afores" element={<Afores />} />
              <Route path="afores/:id" element={<AforeForm />} />
              <Route path="crear-afore" element={<AforeForm />} />
              <Route path="registrarAsesor" element={<RegistrarAsesor />} />
              <Route path="asesores/editar/:id" element={<ActualizarAsesor />} />
              <Route path="VisorSemanas" element={<VisorSemanas />} />
              <Route path="FormularioTramite" element={<FormularioTramite />} />
              <Route path="ReporteProduccion" element={<ReporteProduccion />} />
              <Route path="FechasTramites" element={<FechasTramites />} />
              <Route path="LiquidacionesPendientes" element={<LiquidacionesPendientes />} />
              <Route path="FiltroClientes" element={<FiltroClientes />} />
              <Route path="asesores/contrato/:id" element={<Contrato />} />
              <Route path="clientes/contratoClientes/:id" element={<ContratoCliente />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;