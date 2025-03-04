import React, { useContext, useState } from "react";
import { AuthContext } from "./auth/AuthContext";
import CambiarPassModal from "./CambiarPassModal";

const Profile = () => {
  const { profile } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!profile) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  const getTipoUsuario = (tipo) => {
    switch (tipo) {
      case 2:
        return "Encargado de oficina";
      case 3:
        return "Administrador";
      default:
        return "Usuario";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Perfil de Usuario</h1>
      <p className="text-lg text-gray-700 mb-2">{getTipoUsuario(profile.tipo)}</p>
      <p className="text-lg text-gray-700 mb-2"><strong className="text-gray-900">Nombre de usuario:</strong> {profile.username}</p>
      <p className="text-lg text-gray-700 mb-2"><strong className="text-gray-900">Email:</strong> {profile.email}</p>
      <p className="text-lg text-gray-700 mb-2"><strong className="text-gray-900">Teléfono:</strong> {profile.telefono}</p>
      <p className="text-lg text-gray-700 mb-2"><strong className="text-gray-900">Teléfono de oficina:</strong> {profile.tel_oficina}</p>
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Cambiar Contraseña
      </button>
      {isModalOpen && <CambiarPassModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Profile;