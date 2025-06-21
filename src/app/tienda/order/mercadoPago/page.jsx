'use client';
import { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';
import { useCarrito } from "../../components/CarritoContext";
import { useDescuento } from "../../components/descuentoContext";
import styles from './pago.module.css';

export default function MercadoPagoPage() {
  const { carrito } = useCarrito();
  const { descuentoAplicado } = useDescuento();
  const [preferenceId, setPreferenceId] = useState(null);

  // Inicializar MercadoPago con la clave pública
  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, {
      locale: 'es-AR',
    });
  }, []);

  // Calcular total con descuento
  let totalPrecio = carrito.reduce((acum, prod) => acum + prod.precio * prod.cantidad, 0);
  if (descuentoAplicado) totalPrecio *= 0.9;

  // Crear preferencia una vez que carrito cambie
useEffect(() => {
  if (carrito.length === 0) return;

  const crearPreferencia = async () => {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

      // Armar array de items para MercadoPago
      const itemsMP = carrito.map(prod => ({
        title: prod.nombre,
        quantity: prod.cantidad,
        unit_price: Number(prod.precio.toFixed(2))
      }));

    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/create_preference`, {
      items: [{
        title: 'Compra en DealDress',
        quantity: 1,
        unit_price: Number(totalPrecio.toFixed(2))
      }]
    });


      console.log("Preferencia creada:", res.data);
      setPreferenceId(res.data.id);
    } catch (err) {
      console.error("Error creando preferencia:", err);
    }
  };

  crearPreferencia();
}, [carrito, totalPrecio]);


  return (
    <div className={styles.wrapper}>
      <h2>Pasarela de Pago</h2>
      {preferenceId ? (
        <Wallet initialization={{ preferenceId }} />
      ) : (
        <p>Generando preferencia de pago...</p>
      )}
    </div>
  );
}










