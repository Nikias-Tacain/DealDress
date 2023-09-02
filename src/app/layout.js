'use client'
import FooterHub from './components/FooterHub';
import HeaderHub from './components/HeaderHub';
import React from 'react';
import './globals.css';
import { CarritoProvider } from './tienda/components/CarritoContext';
export default function RootLayout({ children }) {
  const metadata = {
    title: 'Deal Dress',
    description: 'Tienda web donde se venden productos deportivos. Ropa, herramientas, pesas, etc.',
    icons:{
      icon:[
        '/favicon.ico'
      ],
      apple:[
        '/apple-touch-icon.png'
      ],
      shortcut:[
        '/apple-touch-icon.png'
      ],
      manifest:'/site.webmanifest'
    }
  }
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
