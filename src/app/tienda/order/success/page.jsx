'use client';
import { useEffect } from 'react';
import { useCarrito } from '../../components/CarritoContext';
import { useRouter } from 'next/navigation';
import styles from './success.module.css';

export default function SuccessPage() {
  const { clearCarrito } = useCarrito();
  const router = useRouter();

  useEffect(() => {
    clearCarrito();

    const timeout = setTimeout(() => {
      router.push('/tienda');
    }, 6000); // Redirige después de 6 seg

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={styles.successWrapper}>
      <h1>✅ ¡Pago Aprobado!</h1>
      <p>Gracias por tu compra.</p>
      <p>En breve recibirás la confirmación por email.</p>
      <p>Redirigiendo a la tienda...</p>
    </div>
  );
}
