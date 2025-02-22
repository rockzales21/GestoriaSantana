// ModalCambiarStatus.js
import React, { useState } from 'react';

const CambiarStatus = ({ isOpen, onClose, onConfirm, cliente }) => {
  const [nuevoStatus, setNuevoStatus] = useState('');

  const handleConfirm = () => {
    if (nuevoStatus) {
      onConfirm(cliente, nuevoStatus);
      setNuevoStatus('');
      onClose();
    } else {
      alert("Por favor, selecciona un nuevo estado.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-content bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Cambiar Estado de {cliente.nombre}</h2>
        
        <select 
          value={nuevoStatus} 
          onChange={(e) => setNuevoStatus(e.target.value)} 
          className="border p-2 mb-4 w-full"
        >
          <option value="">Selecciona un nuevo estado</option>
          {["Fallido", "Liquidado", "Inactivo"].map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <button 
          className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700"
          onClick={handleConfirm}
        >
          Confirmar
        </button>
        <button 
          className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-700 ml-2"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default CambiarStatus;
