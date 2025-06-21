'use client';
import Link from 'next/link';
import styles from './pending.module.css';

export default function PendingPage() {
  return (
    <div className={styles.wrapper}>
      <h1>⏳ Pago Pendiente</h1>
      <p>
        Tu pago fue procesado pero aún está pendiente de confirmación por parte de la entidad financiera.
      </p>
      <p>
        Te enviaremos un correo cuando se acredite. Mientras tanto, podés revisar el estado desde tu cuenta.
      </p>
      <Link href="/tienda">
        <button className={styles.boton}>Volver a la tienda</button>
      </Link>
    </div>
  );
}
