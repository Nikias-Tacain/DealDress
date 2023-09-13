import React from 'react';
import FooterHub from './components/FooterHub';
import { CarritoProvider } from './tienda/components/CarritoContext';
import HeaderHub from './components/HeaderHub';
import './globals.css';
import { TallaProvider } from './tienda/components/tallaContext';
const mercadoPago = require ('mercadopago');

mercadoPago.configure({
  access_token: 'APP_USR-323570557996031-090122-3d94e4d263a268087d96b5fb6e787341-564639309'
})

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
    <body>
      <CarritoProvider>
        <TallaProvider>
          <HeaderHub />
          {children}
          <FooterHub />
        </TallaProvider>
      </CarritoProvider>
    </body>
  </html>
  )
}
