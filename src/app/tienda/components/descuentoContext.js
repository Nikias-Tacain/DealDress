'use client'
import React, { createContext, useContext, useState } from 'react';

const DescuentoContext = createContext();

export const DescuentoProvider = ({ children }) => {
  const [descuentoAplicado, setDescuentoAplicado] = useState(false);

  const toggleDescuento = () => {
    setDescuentoAplicado(!descuentoAplicado);
  };

  const value = {
    descuentoAplicado,
    toggleDescuento,
  };

  return (
    <DescuentoContext.Provider value={value}>
      {children}
    </DescuentoContext.Provider>
  );
};

export const useDescuento = () => {
  return useContext(DescuentoContext);
};
