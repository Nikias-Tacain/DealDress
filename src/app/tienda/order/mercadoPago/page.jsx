'use client'
import React, { useState} from 'react';
import { useCarrito } from "../../components/CarritoContext";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import styles from '../orderPage.module.css';
import axios from "axios";
export default function MercadoPago () {
    const [preferenceId, setPreferenceId] = useState();
    const { carrito } = useCarrito();
    initMercadoPago('APP_USR-5e06b7fc-5e06-4627-b504-fa7f833a133b');
    const createPreference = async () => {
        try{
          const response = await axios.post("http://localhost:8080/create_preference",{
            description: "Carrito de compras",
            price: totalPrecio,
            quantity: 1,
          });
          const { id } = response.data;
          return id;
        }catch (error) {
          console.log(error);
        }
      };
      const handleBuy = async () =>{

        const id = await createPreference();
        if (id) {
          setPreferenceId(id);
        }
      }
      const totalPrecio = carrito.reduce((acumulador, producto) => {
        return acumulador + (producto.precio * producto.cantidad);
      }, 0);
    return(
        <section>
            <h3>COMPLETA LA ORDEN DE COMPRA</h3>
            <div>
            {carrito.length === 0 ? 'Carrito se encuentra vacio...' :
          <div className={styles.carritoInt}>
              {carrito.map((student) =>(
                <div key={student.id} className={styles.carritoIntProduct}>
                  <img src={student.image} alt={student.nombre} />
                  <div className={styles.carritoIntSection}>
                    <h2>{student.nombre}</h2>
                    <p>$ {student.precio}</p>
                    <p>{student.modelo}</p>
                    <div className={styles.sectionControlls}>
                      <p>{student.cantidad}</p>
                    </div>
                  </div>
                </div>
              ))}
                <div>
                    <p>Total: $ {totalPrecio}</p>
                </div>
            </div>
            }
            </div>
            <article>
                <button onClick={handleBuy}>Guardar y pagar</button>
            </article>
            {preferenceId && <Wallet initialization={{ preferenceId}} />}
        </section>
    )
}