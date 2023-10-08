'use client'
import React, { useState } from 'react';
import { useCarrito } from "../components/CarritoContext";
import { useDescuento } from "../components/descuentoContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from './orderPage.module.css';
import Link from "next/link";
export default function OrderCart () {

    const { carrito, eliminarProductoDelCarrito, aumentarCantidad, disminuirCantidad } = useCarrito();
    const { descuentoAplicado} = useDescuento(); // Utiliza el contexto de descuento
    
      let totalPrecio = carrito.reduce((acumulador, producto) => {
        return acumulador + (producto.precio * producto.cantidad);
      }, 0);
    
      // Aplicar el descuento si está activado
      if (descuentoAplicado) {
        totalPrecio *= 0.9; // Aplicar un 10% de descuento
      }
      const redirigirAWhatsAppConMensaje = () => {
        // Mensaje que deseas enviar en WhatsApp
        localStorage.clear();
        const carritoTexto = `Mi carrito de compras:
        \n${carrito.map(item => {
          return `${item.nombre}, Precio: $${item.precio}, Cantidad: ${item.cantidad}, Modelo: ${item.modelo}, Talle: ${item.talleSeleccionado}`;
        }).join('\n')}
          
        TOTAL: $ ${totalPrecio}
        
        Mis datos:
        
        Nombre:
        Correo electronico:
        Direccion de entrega:
        
        
        Deseo mas informacion  sobre los pagos.`;

    
        // Número de teléfono (asegúrate de incluir el código de país)
        const numeroTelefono = "3415075439";
    
        // Crear la URL de WhatsApp con el mensaje
        const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(carritoTexto)}`;
    
        // Redirigir a la URL de WhatsApp
        window.open(urlWhatsApp, '_blank');
      };
    return (
      <>
        <section className={styles.modalContent}>
        {carrito.length === 0 ? 'Carrito se encuentra vacio...' :
          <div className={styles.carritoInt}>
              {carrito.map((student) =>(
                <div key={student.id} className={styles.carritoIntProduct}>
                  <img src={student.image} alt={student.nombre} />
                  <div className={styles.carritoIntSection}>
                    <h2>{student.nombre}({student?.talleSeleccionado})</h2>
                    <p>$ {student.precio}</p>
                    <p>{student.modelo}</p>
                    <div className={styles.sectionControlls}>
                      <span onClick={() => disminuirCantidad(student)}>-</span>
                      <p>{student.cantidad}</p>
                      <span onClick={() => aumentarCantidad(student)}>+</span>
                    </div>
                  </div>
                  <div className={styles.contentButtons}>
                    <span onClick={() => eliminarProductoDelCarrito(student)}><FontAwesomeIcon icon={faTrashCan} /></span>
                  </div>
                </div>
              ))}
              <div>
                <p>Total: $ {totalPrecio}</p>
                <h6>Una vez que le das a PAGAR el carrito se borra y pasamos a la fase final.</h6>
                <div className={styles.buttonsCarrito}>
                  <Link href='/tienda'>
                    <button className={styles.closeButton}>Seguir comprando</button>
                  </Link>
                  
                </div>
                <div className={styles.buttonsPago}>
                  <button onClick={redirigirAWhatsAppConMensaje} className={styles.buyButton}>Transferencia</button>
                  <Link href='/tienda/order/mercadoPago'>
                    <button className={styles.buyButtonMercadoPago}>MercadoPago</button>
                  </Link>
                </div>
              </div>
          </div>
        }
        </section>
      </>
    )
}