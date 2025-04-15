import React, { useState, useEffect, useContext } from 'react';
import { Route, Routes, Outlet, useLocation } from 'react-router-dom';
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
import { AuthProvider, AuthContext } from './Components/auth/AuthContext';
import PrivateRoute from './Components/auth/PrivateRoute';
import Home from './pages/Home';
import Header from './layout/Header';
import Profile from './Components/Profile';
import Cotizador from './Components/Cotizador';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaMoneyBillWave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './Components/PageTransition';

import './App.css';
import { use } from 'react';

function App() {
  const { profile } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [cantidad, setCantidad] = useState('');
  const [honorarios, setHonorarios] = useState(0);
  const location = useLocation(); // Obtener la ubicación actual
  //const { profile } = useContext(AuthContext); // Obtener el perfil del usuario desde el contexto

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
          console.error('Valor:', parseFloat(data.monto));
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
      aria-label="Abrir cotizador"
      className="fixed bottom-6 right-6 bg-gradient-to-tr from-green-500 to-emerald-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:from-green-600 hover:to-emerald-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 z-[100]"
    >
      <FaMoneyBillWave size={28} />
    </button>
  );

  const formatoPesos = (cantidad) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(cantidad);
  };


  const CotizadorModal = ({ isOpen, onClose }) => {
    const [inputValue, setInputValue] = useState('');
    const [showDetails, setShowDetails] = useState(false);
  
    if (!isOpen) return null;
  
    const total = parseFloat(inputValue) || 0;
    let aseguramientoCalculo = total < 15000 ? 1500 : total < 25000 ? 1700 : 2000;
    const honorario = isNaN(honorarios) ? 0 : total * honorarios;
    const aseguramiento = aseguramientoCalculo;
    const totalPagar = honorario + aseguramiento;
    const totalCliente = total - totalPagar;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 relative animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cotizador-title"
        >
          <button
            onClick={() => {
              setShowDetails(false);
              setInputValue('');
              onClose();
            }}
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
            aria-label="Cerrar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 id="cotizador-title" className="text-2xl font-bold mb-6 text-emerald-700 text-center">Cotizador</h2>
          {!showDetails ? (
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setShowDetails(true);
              }}
              className="border border-emerald-300 focus:border-emerald-500 focus:ring-emerald-200 focus:ring-2 p-3 rounded-lg w-full mb-6 text-lg transition"
              placeholder="Cantidad a retirar"
              autoFocus
              min={0}
            />
          ) : (
            <div className="grid grid-cols-2 border border-emerald-200 rounded-lg overflow-hidden text-gray-700 text-base">
              <div className="col-span-2 grid grid-cols-2 divide-x divide-emerald-200">
                <div className="py-2 px-3 border-b border-emerald-200 font-semibold bg-emerald-50">Cantidad total:</div>
                <div className="py-2 px-3 border-b border-emerald-200 bg-emerald-50 text-right">{formatoPesos(total)}</div>
              </div>
              <div className="col-span-2 grid grid-cols-2 divide-x divide-emerald-200">
                <div className="py-2 px-3 border-b border-emerald-200 font-semibold">Honorarios:</div>
                <div className="py-2 px-3 border-b border-emerald-200 text-right">{formatoPesos(honorario)}</div>
              </div>
              <div className="col-span-2 grid grid-cols-2 divide-x divide-emerald-200">
                <div className="py-2 px-3 border-b border-emerald-200 font-semibold">Aseguramiento:</div>
                <div className="py-2 px-3 border-b border-emerald-200 text-right">{formatoPesos(aseguramiento)}</div>
              </div>
              <div className="col-span-2 grid grid-cols-2 divide-x divide-emerald-200">
                <div className="py-2 px-3 border-b border-emerald-200 font-semibold">Total a pagar:</div>
                <div className="py-2 px-3 border-b border-emerald-200 text-right">{formatoPesos(totalPagar)}</div>
              </div>
              <div className="col-span-2 grid grid-cols-2 divide-x divide-emerald-200">
                <div className="py-2 px-3 font-semibold text-emerald-700 bg-emerald-50">Cliente recibe:</div>
                <div className="py-2 px-3 font-bold text-emerald-700 bg-emerald-50 text-right">{formatoPesos(totalCliente)}</div>
              </div>
            </div>
          )}
          <div className="flex justify-end mt-8">
            {!showDetails ? (
              <button
                onClick={() => setShowDetails(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
                disabled={!inputValue}
              >
                Calcular
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowDetails(false);
                  setInputValue('');
                  onClose();
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
              >
                Cerrar
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

return (
  <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        {profile?.tipo === 1 ? (
          <Route path="cotizador" element={
            <PageTransition>
              <Cotizador />
            </PageTransition>
          } />
        ) : (
          <Route
  path="/"
  element={
    <>
      <Header />
      <FloatingButton onClick={toggleModal} />
      <CotizadorModal isOpen={isModalOpen} onClose={toggleModal} />
      {/* Solo Outlet animado */}
      <div style={{ position: "relative", minHeight: "80vh" }}>
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </div>
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
            <Route path="editarCliente/:id" element={<FormularioTramite />} />
            <Route path="ReporteProduccion" element={<ReporteProduccion />} />
            <Route path="FechasTramites" element={<FechasTramites />} />
            <Route path="LiquidacionesPendientes" element={<LiquidacionesPendientes />} />
            <Route path="FiltroClientes" element={<FiltroClientes />} />
            <Route path="profile" element={<Profile />} />
            <Route path="cotizador" element={<Cotizador />} />
          </Route>
        )}
      </Route>
    </Routes>
);
}

export default App;

