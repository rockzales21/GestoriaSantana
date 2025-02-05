import React, { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";

const Profile = () => {
  const { profile } = useContext(AuthContext);

  if (!profile) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Perfil de Usuario</h1>
      <p className="text-lg text-gray-700 mb-2"><strong className="text-gray-900">Nombre de usuario:</strong> {profile.username}</p>
      <p className="text-lg text-gray-700 mb-2"><strong className="text-gray-900">Email:</strong> {profile.email}</p>
      <p className="text-lg text-gray-700 mb-2"><strong className="text-gray-900">Teléfono:</strong> {profile.telefono}</p>
      <p className="text-lg text-gray-700 mb-2"><strong className="text-gray-900">Teléfono de oficina:</strong> {profile.tel_oficina}</p>
    </div>
  );
};

export default Profile;