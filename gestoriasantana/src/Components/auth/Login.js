// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // const Login = () => {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState(null);
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError(null);

// //     try {
// //       const response = await fetch("https://gestoriasantana-production.up.railway.app/users/login", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ username, password }),
// //       });

// //       const data = await response.json();
      
// //       if (!response.ok) {
// //         throw new Error(data.message || "Error al iniciar sesión");
// //       }

// //       localStorage.setItem("token", data.token);
// //       navigate("/dashboard"); // Redirigir a la página principal
// //     } catch (error) {
// //       setError(error.message);
// //     }
// //   };

// //   return (
// //     <div className="flex justify-center items-center h-screen">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="bg-white p-8 shadow-lg rounded-lg w-96"
// //       >
// //         <h2 className="text-xl font-bold mb-4 text-center">Iniciar Sesión</h2>
// //         {error && <p className="text-red-500 text-center mb-2">{error}</p>}
// //         <input
// //           type="text"
// //           placeholder="Usuario"
// //           value={username}
// //           onChange={(e) => setUsername(e.target.value)}
// //           className="w-full p-2 border rounded mb-3"
// //           required
// //         />
// //         <input
// //           type="password"
// //           placeholder="Contraseña"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           className="w-full p-2 border rounded mb-3"
// //           required
// //         />
// //         <button
// //           type="submit"
// //           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
// //         >
// //           Iniciar Sesión
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Login;
// import { useState, useContext } from "react";
// import { AuthContext } from "./AuthContext";

// const Login = () => {
//   const { login } = useContext(AuthContext);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       await login(username, password);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg w-96">
//         <h2 className="text-xl font-bold mb-4 text-center">Iniciar Sesión</h2>
//         {error && <p className="text-red-500 text-center mb-2">{error}</p>}
//         <input
//           type="text"
//           placeholder="Usuario"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full p-2 border rounded mb-3"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Contraseña"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 border rounded mb-3"
//           required
//         />
//         <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
//           Iniciar Sesión
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

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
//       navigate("/dashboard"); // Redirigir a la página principal
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 shadow-lg rounded-lg w-96"
//       >
//         <h2 className="text-xl font-bold mb-4 text-center">Iniciar Sesión</h2>
//         {error && <p className="text-red-500 text-center mb-2">{error}</p>}
//         <input
//           type="text"
//           placeholder="Usuario"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full p-2 border rounded mb-3"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Contraseña"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 border rounded mb-3"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//         >
//           Iniciar Sesión
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(username, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;