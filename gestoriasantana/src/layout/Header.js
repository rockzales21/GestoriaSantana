// Header.js
import React from 'react';
import NavItem from './Components/NavItem'; // Importa NavItem desde la misma carpeta
// import logo from '../assets/logo.png'; // Ruta al archivo de imagen del logo
// import logo from '../logo.png';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-gray-300 to-gray-800 text-white p-4 flex items-center">
      <img src="/img/logo.png" alt="Logo" className="h-64 mr-4" />
      <nav className="flex space-x-4 ml-auto">
        <NavItem to="/" text="Inicio" className="text-xl" />
        <NavItem to="/clientes" text="Clientes" className="text-xl" />
        <NavItem
          text="Asesores"
          dropdownItems={[
            { to: '/asesores', text: 'Lista de Asesores' },
            { to: '/registrarAsesor', text: 'Registrar Asesor' },
          ]}
          className="text-xl"
        />
        <NavItem
          text="Recursos"
          dropdownItems={[
            { to: '/sucursales', text: 'Directorio' },
            { to: '/afores', text: 'Afores' },
            { to: 'https://serviciosdigitales.imss.gob.mx/semanascotizadas-web/usuarios/IngresoAsegurado', text: 'Semanas cotizadas', target: '_blank' },
            { to: 'https://www.gob.mx/curp/', text: 'CURP', target: '_blank' },
            { to: '/VisorSemanas', text: 'Días hábiles' },
          ]}
          className="text-xl"
        />
        <NavItem to="/inventario" text="Inventario" className="text-xl" />
      </nav>
    </header>
  );
};

export default Header;
