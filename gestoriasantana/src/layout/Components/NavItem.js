// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const NavItem = ({ to, text, dropdownItems }) => {
//   return (
//     <div className="relative group">
//       {/* Elemento principal */}
//       <NavLink
//         to={to || '#'}
//         className="px-3 py-2 rounded hover:bg-gray-600 cursor-pointer flex items-center"
//       >
//         {text}
//       </NavLink>

//       {/* Submenú */}
//       {dropdownItems && (
//         <div className="absolute left-0 mt-2 w-48 bg-gray-700 rounded shadow-lg invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 opacity-0">
//           {dropdownItems.map((item, index) => (
//             item.to.startsWith('http') ? (  // Verificamos si es un enlace externo
//               <a
//                 key={index}
//                 href={item.to}
//                 target={item.target || '_self'}
//                 rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
//                 className="block px-4 py-2 hover:bg-gray-600 text-white"
//               >
//                 {item.text}
//               </a>
//             ) : (
//               <NavLink
//                 key={index}
//                 to={item.to}
//                 target={item.target || '_self'}
//                 rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
//                 className="block px-4 py-2 hover:bg-gray-600 text-white"
//               >
//                 {item.text}
//               </NavLink>
//             )
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NavItem;


// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const NavItem = ({ to, text, dropdownItems }) => {
//   return (
//     <div className="relative group">
//       {/* Elemento principal */}
//       <NavLink
//         to={to || '#'}
//         className="px-3 py-2 rounded hover:bg-gray-600 cursor-pointer flex items-center"
//       >
//         {text}
//       </NavLink>

//       {/* Submenú */}
//       {dropdownItems && (
//         <div className="absolute left-0 mt-2 w-48 bg-gray-700 rounded shadow-lg invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 opacity-0">
//           {dropdownItems.map((item, index) => (
//             item.to.startsWith('http') ? (  // Verificamos si es un enlace externo
//               <a
//                 key={index}
//                 href={item.to}
//                 target={item.target || '_self'}
//                 rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
//                 className="block px-4 py-2 hover:bg-gray-600 text-white"
//               >
//                 {item.text}
//               </a>
//             ) : (
//               <NavLink
//                 key={index}
//                 to={item.to}
//                 target={item.target || '_self'}
//                 rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
//                 className="block px-4 py-2 hover:bg-gray-600 text-white"
//               >
//                 {item.text}
//               </NavLink>
//             )
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NavItem;


import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ to, text, dropdownItems }) => {
  return (
    <div className="relative group">
      {/* Elemento principal */}
      <NavLink
        to={to || '#'}
        className="px-3 py-2 rounded hover:bg-gray-600 cursor-pointer flex items-center"
      >
        {text}
      </NavLink>

      {/* Submenú */}
      {dropdownItems && (
        <div className="absolute left-0 mt-2 w-48 bg-gray-700 rounded shadow-lg invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 opacity-0">
          {dropdownItems.map((item, index) => (
            item.to.startsWith('http') ? (  // Verificamos si es un enlace externo
              <a
                key={index}
                href={item.to}
                target={item.target || '_self'}
                rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                className="block px-4 py-2 hover:bg-gray-600 text-white"
              >
                {item.text}
              </a>
            ) : (
              <NavLink
                key={index}
                to={item.to}
                target={item.target || '_self'}
                rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                className="block px-4 py-2 hover:bg-gray-600 text-white"
              >
                {item.text}
              </NavLink>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default NavItem;