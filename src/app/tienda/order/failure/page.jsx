'use client';
import styles from './failure.module.css';
import Link from 'next/link';

export default function FailurePage() {
  return (
    <div className={styles.failureWrapper}>
      <h1>❌ Pago Rechazado</h1>
      <p>Hubo un problema al procesar tu pago.</p>
      <p>No se te ha cobrado nada.</p>
      <Link href="/tienda/order">
        <button className={styles.retryButton}>Volver al Carrito</button>
      </Link>
    </div>
  );
}
