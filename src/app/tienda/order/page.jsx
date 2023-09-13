'use client'
import { useState } from "react";
import { useCarrito } from "../components/CarritoContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from './orderPage.module.css';
import Link from "next/link";
import Swal from 'sweetalert2';
import { useTalla } from "../components/tallaContext";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from "axios";
export default function OrderCart () {
    const [preferenceId, setPreferenceId] = useState();

    initMercadoPago('TEST-af0d2a74-5544-47e2-901b-2a4654d4b79a');

    

    const { carrito, borrarItem, increaseQuantity, decreaseQuantity } = useCarrito();
    const handleRemoveClick = (productId) => {
        borrarItem(productId);
      };
      const handleIncreaseClick = (productId) => {
        increaseQuantity(productId);
      };
    
      const handleDecreaseClick = (productId) => {
        decreaseQuantity(productId);
      };
    const totalPrecio = carrito.reduce((acumulador, producto) => {
        return acumulador + (producto.precio * producto.cantidad);
      }, 0);
      const { tallaSeleccionada } = useTalla();
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
        localStorage.clear();
        const id = await createPreference();
        if (id) {
          setPreferenceId(id);
        }
      }
      const redirigirAWhatsAppConMensaje = () => {
        // Mensaje que deseas enviar en WhatsApp
        localStorage.clear();
        const carritoTexto = `Mi carrito de compras:
        \n${carrito.map(item => {
          return `${item.nombre}, talla ${tallaSeleccionada}, Precio: $${item.precio}, Cantidad: ${item.cantidad}, Modelo: ${item.modelo}`;
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
                    <h2>{student.nombre}</h2>
                    <p>$ {student.precio}</p>
                    <p>{student.modelo}</p>
                    <div className={styles.sectionControlls}>
                      <span onClick={() => handleIncreaseClick(student.id)}>+</span>
                      <p>{student.cantidad}</p>
                      <span onClick={() => handleDecreaseClick(student.id)}>-</span>
                    </div>
                  </div>
                  <div className={styles.contentButtons}>
                    <span onClick={() => handleRemoveClick(student.id)}><FontAwesomeIcon icon={faTrashCan} /></span>
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
                  <button onClick={handleBuy} className={styles.buyButtonMercadoPago}>MercadoPago</button>
                </div>
              </div>
              {preferenceId && <Wallet initialization={{ preferenceId}} />}
          </div>
          
        }
        </section>
      </>
    )
}