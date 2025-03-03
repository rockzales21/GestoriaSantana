// import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   // Verificar si hay un token al cargar la app
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setUser({ token }); // Aquí podrías decodificar el token si fuera necesario
//     }
//   }, []);

//   // Función para iniciar sesión
//   const login = async (username, password) => {
//     try {
//       const response = await fetch("https://gestoriasantana-production.up.railway.app/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || "Error al iniciar sesión");
//       }

//       localStorage.setItem("token", data.token);
//       setUser({ token: data.token });
//       navigate("/"); // Redirigir a la página principal
//     } catch (error) {
//       throw error;
//     }
//   };

//   // Función para cerrar sesión
//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/login"); // Redirigir a la página de inicio de sesión
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



// import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   // Verificar si hay un token al cargar la app
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setUser({ token }); // Aquí podrías decodificar el token si fuera necesario
//     }
//   }, []);

//   // Función para iniciar sesión
//   const login = async (username, password) => {
//     try {
//       const response = await fetch("https://gestoriasantana-production.up.railway.app/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || "Error al iniciar sesión");
//       }

//       localStorage.setItem("token", data.token);
//       setUser({ token: data.token });
//       navigate("/"); // Redirigir a la página principal
//     } catch (error) {
//       throw error;
//     }
//   };

//   // Función para cerrar sesión
//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/login"); // Redirigir a la página de inicio de sesión
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



// import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const username = localStorage.getItem("username");
//     if (token && username) {
//       setUser({ token, username });
//     }
//   }, []);

//   const login = async (username, password) => {
//     try {
//       const response = await fetch("https://gestoriasantana-production.up.railway.app/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || "Error al iniciar sesión");
//       }

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("username", username);
//       setUser({ token: data.token, username });
//       navigate("/");
//     } catch (error) {
//       throw error;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



// import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const username = localStorage.getItem("username");
//     if (token && username) {
//       setUser({ token, username });
//     }
//   }, []);

//   const login = async (username, password) => {
//     try {
//       const response = await fetch("https://gestoriasantana-production.up.railway.app/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || "Error al iniciar sesión");
//       }

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("username", username);
//       setUser({ token: data.token, username });
//       navigate("/");
//     } catch (error) {
//       throw error;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null); // Nuevo estado para el perfil del usuario
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) {
      setUser({ token, username });
      fetchProfile(token); // Obtener el perfil del usuario
    }
  }, []);

  const fetchProfile = async (token) => {
    try {
      const response = await fetch("https://gestoriasantana-production.up.railway.app/users/profile", {
        // const response = await fetch("http://localhost:3000/users/profile", {
        // const response = await axios.get('http://localhost:5000/afores');
        headers: { Authorization: token },
      });
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch("https://gestoriasantana-production.up.railway.app/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      setUser({ token: data.token, username });
      fetchProfile(data.token); // Obtener el perfil del usuario
      navigate("/profile"); // Redirigir a la vista de perfil
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    setProfile(null); // Limpiar el perfil del usuario
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, profile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};