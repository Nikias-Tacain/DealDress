'use client'
import FooterHub from './components/FooterHub';
import HeaderHub from './components/HeaderHub';
import React from 'react';
import './globals.css';
import { CarritoProvider } from './tienda/components/CarritoContext';
export default function RootLayout({ children }) {
  return (
    <CarritoProvider>
      <html lang="es">
        <body>
          <HeaderHub />
          {children}
          <FooterHub />
        </body>
      </html>
    </CarritoProvider>
    
  )
}
