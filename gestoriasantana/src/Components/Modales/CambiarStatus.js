import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const CambiarStatus = ({ isOpen, onClose, onConfirm, cliente }) => {
  const [nuevoStatus, setNuevoStatus] = useState('');

  useEffect(() => {
    setNuevoStatus(cliente?.status || '');
  }, [cliente]);

  const handleConfirm = () => {
    if (nuevoStatus) {
      onConfirm(cliente, nuevoStatus);
      setNuevoStatus('');
      onClose();
    } else {
      alert("Por favor, selecciona un nuevo estado.");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <strong>CAMBIAR STATUS DE {cliente?.nombre?.toUpperCase()}</strong>
      </DialogTitle>
      <DialogContent dividers>
        <FormControl fullWidth>
          <InputLabel id="nuevo-status-label">Nuevo Status</InputLabel>
          <Select
            labelId="nuevo-status-label"
            value={nuevoStatus}
            label="Nuevo Status"
            onChange={(e) => setNuevoStatus(e.target.value)}
          >
            <MenuItem value="">Selecciona un nuevo estado</MenuItem>
            <MenuItem value="fallido">Fallido</MenuItem>
            <MenuItem value="liquidado">Liquidado</MenuItem>
            <MenuItem value="inactivo">Inactivo</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} color="primary" variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CambiarStatus;