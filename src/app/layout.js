'use client'
import FooterHub from './components/FooterHub';
import HeaderHub from './components/HeaderHub';
import React from 'react';
import './globals.css';
import { CarritoProvider } from './tienda/components/CarritoContext';
export const metadata = {
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
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <CarritoProvider>
        <>
          <body>
            <HeaderHub />
            {children}
            <FooterHub />
          </body>
        </> 
      </CarritoProvider>
    </html>
  )
}
