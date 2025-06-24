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

        if (!formData) {
          console.warn("❌ No hay datos del cliente en localStorage");
          return;
        }

        const pedido = {
          cliente: {
            nombre: formData.nombre,
            correo: formData.correo,
            direccion: formData.direccion,
          },
          productos: carrito,
          fecha: Timestamp.now(),
        };

        await addDoc(collection(db, 'ordenes'), pedido);
        console.log("✅ Pedido guardado en Firebase");

        localStorage.removeItem('formData'); // Limpiar después de guardar
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
