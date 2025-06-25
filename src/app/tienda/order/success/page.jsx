'use client';
import { useEffect } from 'react';
import { useCarrito } from "../../components/CarritoContext";
import Link from "next/link";
import styles from './success.module.css';
import { db } from '@/app/firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function SuccessPage() {
  const { carrito, clearCarrito } = useCarrito();

  useEffect(() => {
    const guardarPedido = async () => {
      try {
        const formData = JSON.parse(localStorage.getItem('formData'));
        const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));

        if (!formData || !carritoGuardado || carritoGuardado.length === 0) {
          console.warn("❌ Faltan datos del cliente o carrito en localStorage");
          return;
        }

        // Calcular total
        const total = carritoGuardado.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);

        // Generar número de orden con ceros (ej: "#000123")
        const generarNumeroDeOrden = () => {
          const numero = Math.floor(1 + Math.random() * 999999); // entre 1 y 999999
          return `#${numero.toString().padStart(6, '0')}`;
        };

        const numeroDeOrden = generarNumeroDeOrden();

        // Crear pedido
        const pedido = {
          numeroDeOrden,
          cliente: {
            nombre: formData.nombre,
            correo: formData.correo,
            direccion: formData.direccion,
            telefonoCompleto: `+${formData.codigoPais} (${formData.codigoArea}) ${formData.telefono}`,
          },
          productos: carritoGuardado,
          total,
          fecha: Timestamp.now(),
        };

        await addDoc(collection(db, 'ordenes'), pedido);
        console.log("✅ Pedido guardado en Firebase");

        localStorage.removeItem('formData');
        localStorage.removeItem('carrito');
        clearCarrito();
      } catch (err) {
        console.error("❌ Error al guardar el pedido:", err);
      }
    };

    guardarPedido();
  }, []);

  return (
    <div className={styles.successWrapper}>
      <h2 className={styles.title}>¡Gracias por tu compra!</h2>
      <p className={styles.message}>Tu pago fue procesado con éxito 🥳.</p>
      <p className={styles.details}>En breve recibirás la confirmación en tu correo electrónico.</p>
      <Link href="/tienda">
        <button className={styles.button}>Volver a la tienda</button>
      </Link>
    </div>
  );
}
