

import React, { useContext, useState, useEffect, useRef } from 'react';
import NavItem from './Components/NavItem';
import { AuthContext } from '../Components/auth/AuthContext';
import { FaSignOutAlt, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

const Header = () => {
  const { user, profile, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);
  const isDesktop = window.innerWidth >= 1024; // 1024px es el breakpoint de lg en Tailwind

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null);
  };

  const handleMouseEnter = (index) => {
    if (isDesktop) {
      setOpenDropdown(index);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop) {
      setOpenDropdown(null);
    }
  };

  const toggleDropdown = (index) => {
    if (!isDesktop) {
      setOpenDropdown(openDropdown === index ? null : index);
    }
  };


  return (
    <>
      <header className="fixed top-0 w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-xl h-24 z-50 border-b border-gray-800">
        <div className="w-full h-full mx-auto px-0">
          <div className="flex items-center justify-between h-full">
            {/* Logo container con fondo oscuro y blur */}
            <div className="flex-shrink-0 h-full flex items-center pl-0 relative">
              <div className="bg-white/85 p-2 shadow-lg backdrop-blur-md flex items-center justify-center absolute -top-4 left-0 h-28 w-28 overflow-hidden">
              <img
              src="/img/logo.png"
              alt="Logo"
              className="h-[150%] w-[150%] object-cover drop-shadow-2xl mt-4"
              style={{ objectPosition: 'center' }}
              />
              </div>
              <div className="w-20" /> {/* Espacio para que no se traslapen los menús */}
            </div>

            <button
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-gray-700/50 transition-all duration-300 ease-in-out shadow"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ?
                <FaTimes className="h-6 w-6" /> :
                <FaBars className="h-6 w-6" />
              }
            </button>

            <nav
              ref={navRef}
              className={`
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                fixed lg:relative top-24 lg:top-0 left-0 w-full lg:w-auto 
                bg-gray-900/95 lg:bg-transparent backdrop-blur-md
                transform transition-transform duration-300 ease-in-out
                lg:flex lg:items-center lg:space-x-8 lg:ml-8
                h-[calc(100vh-6rem)] lg:h-auto overflow-y-auto lg:overflow-visible
                px-4 py-6 lg:p-0 z-40 border-t border-gray-800 lg:border-none 
              `}
            >
              <NavItem
                to="/profile"
                text="Inicio"
                className="block lg:inline-block text-base font-semibold text-gray-100 hover:text-orange-400 transition-colors px-4 py-2 lg:p-0 tracking-wide"
              />
              <div
                className="relative lg:static"
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => toggleDropdown(0)}
                  className="block lg:inline-block text-base font-semibold text-gray-100 hover:text-orange-400 transition-colors px-4 py-2 lg:p-0 w-full text-left tracking-wide"
                >
                  Clientes
                </button>
                {openDropdown === 0 && (
                  <div className="lg:absolute bg-gray-800/95 text-gray-100 rounded-xl shadow-2xl mt-2 lg:mt-0 border border-gray-700 min-w-[180px]">
                    <NavItem
                      to="/Clientes"
                      text="Trámites"
                      className="block px-4 py-2 hover:bg-orange-700/30 hover:text-orange-300 rounded-t-xl transition"
                    />
                    <NavItem
                      to="/ReporteProduccion"
                      text="Ingresos"
                      className="block px-4 py-2 hover:bg-orange-700/30 hover:text-orange-300 transition"
                    />
                    <NavItem
                      to="/FechasTramites"
                      text="Fechas de trámite"
                      className="block px-4 py-2 hover:bg-orange-700/30 hover:text-orange-300 rounded-b-xl transition"
                    />
                  </div>
                )}
              </div>
              <NavItem
                to="/FormularioTramite"
                text="Altas"
                className="block lg:inline-block text-base font-semibold text-gray-100 hover:text-orange-400 transition-colors px-4 py-2 lg:p-0 tracking-wide"
              />
              <NavItem
                to="/LiquidacionesPendientes"
                text="Liquidaciones"
                className="block lg:inline-block text-base font-semibold text-gray-100 hover:text-orange-400 transition-colors px-4 py-2 lg:p-0 tracking-wide"
              />
              <div
                className="relative lg:static"
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => toggleDropdown(1)}
                  className="block lg:inline-block text-base font-semibold text-gray-100 hover:text-orange-400 transition-colors px-4 py-2 lg:p-0 w-full text-left tracking-wide"
                >
                  Asesores
                </button>
                {openDropdown === 1 && (
                  <div className="lg:absolute bg-gray-800/95 text-gray-100 rounded-xl shadow-2xl mt-2 lg:mt-0 border border-gray-700 min-w-[180px]">
                    <NavItem
                      to="/asesores"
                      text="Lista de Asesores"
                      className="block px-4 py-2 hover:bg-orange-700/30 hover:text-orange-300 rounded-t-xl transition"
                    />
                    <NavItem
                      to="/registrarAsesor"
                      text="Registrar Asesor"
                      className="block px-4 py-2 hover:bg-orange-700/30 hover:text-orange-300 rounded-b-xl transition"
                    />
                  </div>
                )}
              </div>
              <div
                className="relative lg:static"
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => toggleDropdown(2)}
                  className="block lg:inline-block text-base font-semibold text-gray-100 hover:text-orange-400 transition-colors px-4 py-2 lg:p-0 w-full text-left tracking-wide"
                >
                  Recursos
                </button>
                {openDropdown === 2 && (
                  <div className="lg:absolute bg-gray-800/95 text-gray-100 rounded-xl shadow-2xl mt-2 lg:mt-0 border border-gray-700 min-w-[180px]">
                    <NavItem
                      to="/sucursales"
                      text="Directorio"
                      className="block px-4 py-2 hover:bg-orange-700/30 hover:text-orange-300 transition"
                    />
                    <NavItem
                      to="/afores"
                      text="Afores"
                      className="block px-4 py-2 hover:bg-orange-700/30 hover:text-orange-300 transition"
                    />
                    <NavItem
                      to="https://serviciosdigitales.imss.gob.mx/semanascotizadas-web/usuarios/IngresoAsegurado"
                      text="Semanas cotizadas"
                      target="_blank"
                      className="block px-4 py-2 hover:bg-orange-700/30 hover:text-orange-300 transition"
                    />
                    <NavItem
                      to="https://www.gob.mx/curp/"
                      text="CURP"
                      target="_blank"
                      className="block px-4 py-2 hover:bg-orange-700/30 hover:text-orange-300 transition"
                    />
                    <NavItem
                      to="/VisorSemanas"
                      text="Días hábiles"
                      className="block px-4 py-2 hover:bg-orange-700/30 hover:text-orange-300 transition"
                    />
                  </div>
                )}
              </div>
              <NavItem
                to="/inventario"
                text="Inventario"
                className="block lg:inline-block text-base font-semibold text-gray-100 hover:text-orange-400 transition-colors px-4 py-2 lg:p-0 tracking-wide"
              />
            </nav>

            <div className="w-1" />
            <div className="hidden lg:block h-20 border-l border-gray-400/40 mx-2" /> {/* Línea divisoria */}

            {user && (
              <div className="hidden lg:flex items-center space-x-6">
                {profile && (
                  <span className="text-sm font-semibold text-orange-300 drop-shadow">
                    Oficina: {profile.oficina}
                  </span>
                )}
                <div className="flex items-center space-x-4 bg-gray-800/80 px-4 py-2 rounded-full shadow-lg border border-orange-700">
                  <span className="text-sm font-semibold text-orange-200 tracking-wide">
                    {user.username}
                  </span>
                  <button
                    onClick={logout}
                    className="inline-flex items-center justify-center bg-gradient-to-tr from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 shadow"
                    title="Cerrar sesión"
                  >
                    <FaSignOutAlt className="text-lg" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* Spacer for fixed header */}
      <div className="h-24" />
    </>
  );
};
export default Header;