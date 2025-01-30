// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "./AuthContext";

// const PrivateRoute = ({ children }) => {
//   const { user } = useContext(AuthContext);
//   return user ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;

import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Asegúrate de importar el contexto de autenticación

const PrivateRoute = () => {
  const { user } = AuthContext(); // user debería ser null o un objeto con datos del usuario

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
