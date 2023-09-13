'use client'
import React, { createContext, useContext, useState } from 'react';

// Creamos el contexto
const TallaContext = createContext();

// Hook personalizado para acceder al contexto
export function useTalla() {
  return useContext(TallaContext);
}

// Componente que proporcionará el contexto
export function TallaProvider({ children }) {
  const [tallaSeleccionada, setTallaSeleccionada] = useState('');

  // Función para actualizar el valor de la talla
  const actualizarTalla = (nuevaTalla) => {
    setTallaSeleccionada(nuevaTalla);
  };

  return (
    <TallaContext.Provider value={{ tallaSeleccionada, actualizarTalla }}>
      {children}
    </TallaContext.Provider>
  );
}
