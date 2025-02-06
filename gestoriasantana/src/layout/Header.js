// // Header.js
// import React from 'react';
// import NavItem from './Components/NavItem'; // Importa NavItem desde la misma carpeta
// // import logo from '../assets/logo.png'; // Ruta al archivo de imagen del logo
// // import logo from '../logo.png';

// const Header = () => {
//   return (
//     <header className="bg-gradient-to-r from-gray-300 to-gray-800 text-white p-4 flex items-center">
//       <img src="/img/logo.png" alt="Logo" className="h-64 mr-4" />
//       <nav className="flex space-x-4 ml-auto">
//         <NavItem to="/" text="Inicio" className="text-xl" />
//         <NavItem
//           text="Clientes"
//           dropdownItems={[
//             { to: '/FiltroClientes', text: 'Trámites' },
//             { to: '/ReporteProduccion', text: 'Ingresos' },
//             { to: '/FechasTramites', text: 'Fechas de tramite' },
//           ]}
//           className="text-xl"
//         />
//         <NavItem to="/FormularioTramite" text="Altas" className="text-xl" />
//         <NavItem to="/Clientes" text="Clientes" className="text-xl" />
//         <NavItem to="/LiquidacionesPendientes" text="Liquidaciones" className="text-xl" />
//         {/* <NavItem to="/clientes" text="Clientes" className="text-xl" /> */}
//         <NavItem
//           text="Asesores"
//           dropdownItems={[
//             { to: '/asesores', text: 'Lista de Asesores' },
//             { to: '/registrarAsesor', text: 'Registrar Asesor' },
//           ]}
//           className="text-xl"
//         />
//         <NavItem
//           text="Recursos"
//           dropdownItems={[
//             { to: '/sucursales', text: 'Directorio' },
//             { to: '/afores', text: 'Afores' },
//             { to: 'https://serviciosdigitales.imss.gob.mx/semanascotizadas-web/usuarios/IngresoAsegurado', text: 'Semanas cotizadas', target: '_blank' },
//             { to: 'https://www.gob.mx/curp/', text: 'CURP', target: '_blank' },
//             { to: '/VisorSemanas', text: 'Días hábiles' },
//           ]}
//           className="text-xl"
//         />
//         <NavItem to="/inventario" text="Inventario" className="text-xl" />
//       </nav>
//     </header>
//   );
// };

// export default Header;


// import React, { useContext } from 'react';
// import NavItem from './Components/NavItem';
// import { AuthContext } from '../Components/auth/AuthContext';
// import { FaSignOutAlt } from 'react-icons/fa';

// const Header = () => {
//   const { user, profile, logout } = useContext(AuthContext);

//   return (
//     <header className="bg-gradient-to-r from-gray-300 to-gray-800 text-white p-4 flex justify-between items-center">
//       <div className="flex items-center">
//         <img src="/img/logo.png" alt="Logo" className="h-64 mr-4" />
//         {user && (
//         <div className="user-info">
//           {profile && <span className="text-xl">Oficina: {profile.oficina}</span>}
//           <span className="text-xl">Bienvenido, {user.username}</span>
//           <button
//             onClick={logout}
//             className="logout-button"
//             title="Cerrar sesión"
//             aria-label="Cerrar sesión"
//           >
//             <FaSignOutAlt className="text-2xl" />
//           </button>
//         </div>
//       )}
//       <div>
//         <nav className="flex space-x-4">
//           <NavItem to="/" text="Inicio" className="text-xl" />
//           <NavItem
//             text="Clientes"
//             dropdownItems={[
//               { to: '/FiltroClientes', text: 'Trámites' },
//               { to: '/ReporteProduccion', text: 'Ingresos' },
//               { to: '/FechasTramites', text: 'Fechas de tramite' },
//             ]}
//             className="text-xl"
//           />
//           <NavItem to="/FormularioTramite" text="Altas" className="text-xl" />
//           <NavItem to="/Clientes" text="Clientes" className="text-xl" />
//           <NavItem to="/LiquidacionesPendientes" text="Liquidaciones" className="text-xl" />
//           <NavItem
//             text="Asesores"
//             dropdownItems={[
//               { to: '/asesores', text: 'Lista de Asesores' },
//               { to: '/registrarAsesor', text: 'Registrar Asesor' },
//             ]}
//             className="text-xl"
//           />
//           <NavItem
//             text="Recursos"
//             dropdownItems={[
//               { to: '/sucursales', text: 'Directorio' },
//               { to: '/afores', text: 'Afores' },
//               { to: 'https://serviciosdigitales.imss.gob.mx/semanascotizadas-web/usuarios/IngresoAsegurado', text: 'Semanas cotizadas', target: '_blank' },
//               { to: 'https://www.gob.mx/curp/', text: 'CURP', target: '_blank' },
//               { to: '/VisorSemanas', text: 'Días hábiles' },
//             ]}
//             className="text-xl"
//           />
//           <NavItem to="/inventario" text="Inventario" className="text-xl" />
//         </nav>
//         </div>
//       </div>

//     </header>
//   );
// };

// export default Header;

import React, { useContext } from 'react';
import NavItem from './Components/NavItem';
import { AuthContext } from '../Components/auth/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const { user, profile, logout } = useContext(AuthContext);

  return (
    <header className="bg-gradient-to-r from-gray-300 to-gray-800 text-white p-4">
      <div className="flex items-center">
        {/* Logo */}
        <img src="/img/logo.png" alt="Logo" className="h-64 mr-4" />
        
        {/* Contenedor de información del usuario y navegación */}
        <div className="flex flex-col w-full">
          {/* Fila superior: Información del usuario */}
          <div className="flex justify-between items-center w-full">
            {user && (
              <div className="user-info w-full flex items-center">
                {/* Sucursal a la izquierda */}
                {profile && (
                  <span className="branch text-xl">
                    Oficina: {profile.oficina}
                  </span>
                )}
                {/* Nombre de usuario y botón de logout a la derecha */}
                <div className="flex items-center ml-auto">
                  <span className="username text-xl mr-2">
                    Bienvenido, {user.username}
                  </span>
                  <button
                    onClick={logout}
                    className="logout-button"
                    title="Cerrar sesión"
                    aria-label="Cerrar sesión"
                  >
                    <FaSignOutAlt className="text-2xl" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Fila inferior: Navegación */}
          <nav className="flex space-x-4">
            <NavItem to="/profile" text="Inicio" className="text-xl" />
            <NavItem
              text="Clientes"
              dropdownItems={[
                { to: '/FiltroClientes', text: 'Trámites' },
                { to: '/ReporteProduccion', text: 'Ingresos' },
                { to: '/FechasTramites', text: 'Fechas de tramite' },
              ]}
              className="text-xl"
            />
            <NavItem to="/FormularioTramite" text="Altas" className="text-xl" />
            <NavItem to="/Clientes" text="Clientes" className="text-xl" />
            <NavItem to="/LiquidacionesPendientes" text="Liquidaciones" className="text-xl" />
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
        </div>
      </div>
    </header>
  );
};

export default Header;
