'use client';
import { useEffect } from 'react';
import { useCarrito } from "../../components/CarritoContext";
import Link from "next/link";
import styles from './success.module.css'; // Crea este archivo si querés estilos

export default function SuccessPage() {
  const { clearCarrito } = useCarrito();

  useEffect(() => {
    clearCarrito(); // ✅ Vaciamos carrito solo si el pago fue exitoso
  }, []);

  return (
    <div className={styles.successWrapper}>
      <h2 className={styles.title}>¡Gracias por tu compra!</h2>
      <p className={styles.message}>
        Tu pago fue procesado con éxito 🥳.
      </p>
      <p className={styles.details}>
        En breve recibirás la confirmación en tu correo electrónico.
      </p>
      <Link href="/tienda">
        <button className={styles.button}>Volver a la tienda</button>
      </Link>
    </div>
  );
}

