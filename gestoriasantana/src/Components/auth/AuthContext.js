import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Verificar si hay un token al cargar la app
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token }); // Aquí podrías decodificar el token si fuera necesario
    }
  }, []);

  // Función para iniciar sesión
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
      setUser({ token: data.token });
      navigate("/"); // Redirigir a la página principal
    } catch (error) {
      throw error;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login"); // Redirigir a la página de inicio de sesión
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
