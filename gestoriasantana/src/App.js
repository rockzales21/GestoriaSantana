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
      className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition"
    >
      <FaMoneyBillWave size={24} />
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
          <h2 className="text-lg font-semibold mb-4">Cotizador</h2>
          {!showDetails ? (
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setShowDetails(true);
                }
              }}
              className="border border-gray-300 p-2 rounded w-full mb-4"
              placeholder="Cantidad a retirar"
              autoFocus
            />
          ) : (
            <div className="results text-justify">
              <p><strong>Cantidad total:</strong> {formatoPesos(total)}</p>
              <p><strong>Honorarios:</strong> {formatoPesos(honorario)}</p>
              <p><strong>Aseguramiento:</strong> {formatoPesos(aseguramiento)}</p>
              <p><strong>Total a pagar:</strong> {formatoPesos(totalPagar)}</p>
              <p><strong>Cliente recibe:</strong> {formatoPesos(totalCliente)}</p>
            </div>
          )}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => {
                setShowDetails(false);
                setInputValue('');
                onClose();
              }}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Cerrar
            </button>
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

