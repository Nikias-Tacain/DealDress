import React from 'react'
import styles from './ProductsHub.module.css'
export default function MetodosPago() {
  return (
    <div className={styles.metodosPago}>
        <h2>Medios de pago</h2>
        <div>
            <p>⚫ Tarjetas de debito</p>
            <p>⚫ Tarjetas de credito</p>
            <p>⚫ Rapi Pago / Pago Facil</p>
            <p>⚫ Mercado Pago</p>
            <p>⚫ Transferencia</p>
        </div>
    </div>
  )
}
