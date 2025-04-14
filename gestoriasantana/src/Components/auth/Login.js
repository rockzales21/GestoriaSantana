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



import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(username, password);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
      <div className="bg-white/90 shadow-2xl rounded-2xl p-10 w-full max-w-md animate-fade-in">
        <div className="flex flex-col items-center mb-6">
        <div className="bg-blue-500 rounded-full p-1 mb-2 shadow-lg">
    <img
      src={require('../../assets/logo.png')}
      alt="Logo Gestoría Santana"
      className="w-24 h-24 object-contain rounded-full bg-white"
      style={{ background: 'white' }}
    />
  </div>
          
          <p className="text-gray-500 text-sm">Acceso para administración de trámites</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-center text-sm animate-shake">
              {error}
            </div>
          )}
          <div>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="username">
              Usuario
            </label>
            <div className="relative">
              <input
                id="username"
                type="text"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
                autoFocus
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="password">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect width="12" height="8" x="6" y="11" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 17v-2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 018 0v4" />
      </svg>
    </span>
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-400 hover:text-blue-500 transition"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.042-3.354M6.223 6.223A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-1.357 2.572M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.832-.642 1.624-1.09 2.354M15.54 17.657A9.956 9.956 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.042-3.354" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className={`w-full flex justify-center items-center bg-blue-600 text-white font-bold py-2 rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-60`}
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : null}
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
      {/* Animación fade-in */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-shake {
          animation: shake 0.3s;
        }
        @keyframes shake {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(4px); }
          30%, 50%, 70% { transform: translateX(-8px); }
          40%, 60% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
};

export default Login;