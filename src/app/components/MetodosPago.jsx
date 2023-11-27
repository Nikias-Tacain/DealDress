import React from 'react'
import styles from './ProductsHub.module.css'
export default function MetodosPago() {
  return (
    <section>
<div id='metodosPagoDisplay' className={styles.metodosPago}>
      <h2>Medios de pago</h2>
      <div>
        <p>⚫ Tarjetas de debito</p>
        <p>⚫ Tarjetas de credito</p>
        <p>⚫ Rapi Pago / Pago Facil</p>
        <p>⚫ Mercado Pago</p>
        <p>⚫ Transferencia</p>
        <p>⚫ Efectivo</p>
      </div>
    </div>
    <div id='politicaCambio' className={styles.metodosPago}>
      <h2>Politica de cambio</h2>
      <div>
        <p>⚫ Una vez recibido  tu pedido 72hs para realizar el cambio</p>
        <p>⚫ Se cambia articulo por artículo</p>
        <p>⚫ Solo debes abonar el correo</p>
      </div>
    </div>
    </section>
    
  )
}
