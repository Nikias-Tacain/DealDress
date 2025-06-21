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

  // Inicializar Mercado Pago
  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, {
      locale: 'es-AR',
    });
  }, []);

  useEffect(() => {
    if (carrito.length === 0) return;

    const crearPreferencia = async () => {
      try {
        const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

        const totalPrecio = carrito.reduce((acum, prod) => acum + prod.precio * prod.cantidad, 0);
        const totalConDescuento = descuentoAplicado ? totalPrecio * 0.9 : totalPrecio;

        const items = [{
          title: 'Compra en DealDress',
          quantity: 1,
          unit_price: Number(totalConDescuento.toFixed(2))
        }];

        const res = await axios.post(`${backendURL}/create_preference`, { items });

        setPreferenceId(res.data.id);
        console.log("✅ Preferencia creada:", res.data.id);
      } catch (err) {
        console.error("❌ Error creando preferencia:", err);
      }
    };

    crearPreferencia();
  }, [carrito, descuentoAplicado]);

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
